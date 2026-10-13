/**
 * @file 逾期未办结排行面板
 * @description 对齐 UI：TOP 切图徽章 + 斑马纹四列表格。
 * 数据来自 getTheOverdueList.subList（region / overdueQuantity / completionRate）。
 */
import Panel from '../../../../../components/common/Panel'
import { GET_THE_OVERDUE_LIST } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const TOP_LIMIT = 5
const PLACEHOLDER = '—'

const formatOverdueRegionLabel = (region) =>
  String(region ?? '')
    .replace(/纪委监委$/, '')
    .replace(/监委$/, '')

const createPlaceholderList = () =>
  Array.from({ length: TOP_LIMIT }, (_, index) => ({
    name: PLACEHOLDER,
    overdue: PLACEHOLDER,
    rate: PLACEHOLDER,
    placeholder: true,
    key: `ph-${index}`,
  }))

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const formatRate = (rate) => {
  if (rate == null || rate === '') return PLACEHOLDER
  const text = String(rate).trim()
  if (!text || text === '-') return PLACEHOLDER
  if (text.includes('%')) return text
  const num = Number(text)
  if (!Number.isFinite(num)) return text
  return num.toFixed(1)
}

const parseOverdueSubList = (data) => {
  if (!data) return []
  if (Array.isArray(data)) return data
  return Array.isArray(data.subList) ? data.subList : []
}

const mapOverdueRankList = (data) => {
  const mapped = parseOverdueSubList(data)
    .map((item) => {
      const name = formatOverdueRegionLabel(item?.region)
      return {
        name,
        overdue: toNumber(item?.overdueQuantity),
        rate: item?.completionRate ?? PLACEHOLDER,
        placeholder: false,
      }
    })
    .filter((item) => item.name && item.name !== '总')
    .sort((a, b) => b.overdue - a.overdue)
    .slice(0, TOP_LIMIT)
  return mapped.length ? mapped : createPlaceholderList()
}

function TopBadge({ rank }) {
  const icon = cockpitAssets.topBadges[rank - 1]
  if (!icon) return null
  return (
    <img
      className="overdue-rank__top-img"
      src={icon}
      alt={`TOP ${rank}`}
      aria-hidden="true"
    />
  )
}

function OverdueRanking() {
  const params = useCockpitQueryParams()
  const list = useCockpitSWR('theOverdueList', params, GET_THE_OVERDUE_LIST, {
    select: mapOverdueRankList,
    fallback: createPlaceholderList,
  })

  return (
    <Panel title="逾期未办结排行" className="panel--plain overdue-rank-panel">
      <div className="overdue-rank">
        <div className="overdue-rank__head">
          <span className="overdue-rank__th overdue-rank__th--rank">排名</span>
          <span className="overdue-rank__th overdue-rank__th--name">地区</span>
          <span className="overdue-rank__th overdue-rank__th--count">逾期未办结</span>
          <span className="overdue-rank__th overdue-rank__th--rate">办结率</span>
        </div>
        <ul className="overdue-rank__list">
          {list.map((item, index) => {
            const rank = index + 1
            return (
              <li
                key={item.key || `${item.name}-${rank}`}
                className={`overdue-rank__row${item.placeholder ? ' overdue-rank__row--placeholder' : ''}`}
              >
                <TopBadge rank={rank} />
                <span className="overdue-rank__name" title={item.name}>
                  {item.name}
                </span>
                <span className="overdue-rank__num">{item.overdue}</span>
                <span className="overdue-rank__rate">
                  {item.placeholder ? item.rate : formatRate(item.rate)}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </Panel>
  )
}

export default OverdueRanking
