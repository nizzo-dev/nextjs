/**
 * @file 谈话人员行为规范排名
 * @description 对齐 UI：TOP 切图徽章 + 斑马纹表格行。
 * 数据来自 getGroup：groupName / groupVideoInfoCount / groupPf。
 */
import Panel from '../../../../../components/common/Panel'
import { GET_GROUP } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const MAX_RANK = cockpitAssets.topBadges.length
const PLACEHOLDER = '—'

const createPlaceholderList = () =>
  Array.from({ length: Math.min(5, MAX_RANK) }, (_, index) => ({
    name: PLACEHOLDER,
    irregular: PLACEHOLDER,
    score: PLACEHOLDER,
    placeholder: true,
    key: `ph-${index}`,
  }))

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const formatScore = (score) => {
  const num = toNumber(score)
  return Number.isInteger(num) ? String(num) : num.toFixed(1)
}

const mapGroupList = (data) => {
  const list = Array.isArray(data) ? data : []
  const mapped = list
    .map((item) => ({
      name: String(item?.groupName ?? '').trim(),
      irregular: toNumber(item?.groupVideoInfoCount),
      score: toNumber(item?.groupPf),
      placeholder: false,
    }))
    .filter((item) => item.name)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.irregular - b.irregular
    })
    .slice(0, MAX_RANK)
  return mapped.length ? mapped : createPlaceholderList()
}

function TopBadge({ rank }) {
  const icon = cockpitAssets.topBadges[rank - 1]
  if (!icon) return null
  return (
    <img
      className="behavior-ranking__top-img"
      src={icon}
      alt={`TOP ${rank}`}
      aria-hidden="true"
    />
  )
}

function BehaviorRanking() {
  const params = useCockpitQueryParams()
  const list = useCockpitSWR('group', params, GET_GROUP, {
    select: mapGroupList,
    fallback: createPlaceholderList,
  })

  return (
    <Panel title="谈话人员行为规范排名" className="panel--plain behavior-ranking-panel">
      <div className="behavior-ranking">
        <div className="behavior-ranking__head">
          <span className="behavior-ranking__th behavior-ranking__th--rank">排名</span>
          <span className="behavior-ranking__th behavior-ranking__th--name">谈话人员</span>
          <span className="behavior-ranking__th behavior-ranking__th--irregular">不规范行为</span>
          <span className="behavior-ranking__th behavior-ranking__th--score">谈话质量评分</span>
        </div>
        <ul
          className={`behavior-ranking__list${list.length >= 6 ? ' behavior-ranking__list--dense' : ''}`}
        >
          {list.map((item, index) => {
            const rank = index + 1
            return (
              <li key={item.key || `${item.name}-${rank}`} className="behavior-ranking__row">
                <TopBadge rank={rank} />
                <span className="behavior-ranking__name" title={item.name}>
                  {item.name}
                </span>
                <span className="behavior-ranking__num">{item.irregular}</span>
                <span className="behavior-ranking__score">
                  {item.placeholder ? item.score : formatScore(item.score)}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </Panel>
  )
}

export default BehaviorRanking
