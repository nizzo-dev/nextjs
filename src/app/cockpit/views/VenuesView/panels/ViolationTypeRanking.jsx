/**
 * @file 违规类型数量排行面板
 * @description 对齐 UI：金银铜/蓝色排名徽章 + 斜切发光进度条。
 * 数据来自 getQuantityList（type / count）。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import { GET_QUANTITY_LIST } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const RANK_COLORS = ['#e8c547', '#c5ced8', '#c8845c', '#5eb8ff', '#5eb8ff', '#5eb8ff']
const TOP_LIMIT = 6
const PLACEHOLDER = '—'

const createPlaceholderList = () =>
  Array.from({ length: TOP_LIMIT }, (_, index) => ({
    name: PLACEHOLDER,
    value: PLACEHOLDER,
    placeholder: true,
    key: `ph-${index}`,
  }))

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const mapQuantityRankList = (data) => {
  const list = Array.isArray(data) ? data : []
  const mapped = list
    .map((item) => ({
      name: String(item?.type ?? '').trim(),
      value: toNumber(item?.count),
      placeholder: false,
    }))
    .filter((item) => item.name)
    .sort((a, b) => b.value - a.value)
    .slice(0, TOP_LIMIT)
  return mapped.length ? mapped : createPlaceholderList()
}

function RankBadge({ rank }) {
  const icon = cockpitAssets.rankBadges[rank - 1]
  if (!icon) return null
  return (
    <img
      className="abnormal-rank__badge-img"
      src={icon}
      alt={`第${rank}名`}
      aria-hidden="true"
    />
  )
}

function ViolationTypeRanking() {
  const params = useCockpitQueryParams()
  const list = useCockpitSWR('quantityList', params, GET_QUANTITY_LIST, {
    select: mapQuantityRankList,
    fallback: createPlaceholderList,
  })
  const maxValue = useMemo(() => {
    const nums = list.filter((d) => !d.placeholder).map((d) => d.value)
    return Math.max(...nums, 1)
  }, [list])

  return (
    <Panel title="违规类型数量排行" className="panel--plain violation-type-rank-panel">
      <ul className={`abnormal-rank${list.length >= 6 ? ' abnormal-rank--dense' : ''}`}>
        {list.map((item, index) => {
          const rank = index + 1
          const color = RANK_COLORS[index] ?? RANK_COLORS[3]
          const numeric = item.placeholder ? 0 : item.value
          const pct = item.placeholder
            ? 28
            : Math.max(8, Math.round((numeric / maxValue) * 100))
          return (
            <li
              key={item.key || `${item.name}-${rank}`}
              className={`abnormal-rank__item${item.placeholder ? ' abnormal-rank__item--placeholder' : ''}`}
            >
              <div className="abnormal-rank__head">
                <RankBadge rank={rank} />
                <span className="abnormal-rank__name">{item.name}</span>
                <span className="abnormal-rank__value">{item.value}</span>
              </div>
              <div className="abnormal-rank__bar-wrap">
                <div
                  className="abnormal-rank__bar"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}55 0%, ${color} 88%, #ffffff 100%)`,
                    boxShadow: `0 0 8px ${color}66`,
                    opacity: item.placeholder ? 0.35 : 1,
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

export default ViolationTypeRanking
