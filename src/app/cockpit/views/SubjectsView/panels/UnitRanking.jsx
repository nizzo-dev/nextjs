/**
 * @file 各单位谈话对象排行
 * @description 对齐 UI：金银铜/蓝色排名徽章 + 斜切发光进度条。
 * 数据来自 InterlocutorCount（name / count）。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import { GET_INTERLOCUTOR_COUNT } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const RANK_COLORS = [
  '#e8c547',
  '#c5ced8',
  '#c8845c',
  '#5eb8ff',
  '#5eb8ff',
  '#5eb8ff',
  '#5eb8ff',
  '#5eb8ff',
  '#5eb8ff',
  '#5eb8ff',
]

const DISPLAY_LIMIT = 10
const PLACEHOLDER = '—'

const createPlaceholderList = () =>
  Array.from({ length: Math.min(5, DISPLAY_LIMIT) }, (_, index) => ({
    name: PLACEHOLDER,
    value: PLACEHOLDER,
    placeholder: true,
    key: `ph-${index}`,
  }))

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const mapUnitList = (data) => {
  const list = Array.isArray(data) ? data : []
  const mapped = list
    .map((item) => ({
      name: String(item?.name ?? '').trim(),
      value: toNumber(item?.count),
      placeholder: false,
    }))
    .filter((item) => item.name)
    .sort((a, b) => b.value - a.value)
    .slice(0, DISPLAY_LIMIT)
  return mapped.length ? mapped : createPlaceholderList()
}

function RankBadge({ rank }) {
  const icon = cockpitAssets.rankBadges[rank - 1]
  if (icon) {
    return (
      <img
        className="unit-ranking__badge-img"
        src={icon}
        alt={`第${rank}名`}
        aria-hidden="true"
      />
    )
  }
  return (
    <span className="unit-ranking__badge-fallback" aria-hidden="true">
      {rank}
    </span>
  )
}

function UnitRanking() {
  const params = useCockpitQueryParams()
  const list = useCockpitSWR('interlocutorCount', params, GET_INTERLOCUTOR_COUNT, {
    select: mapUnitList,
    fallback: createPlaceholderList,
  })

  const maxValue = useMemo(() => {
    const nums = list.filter((d) => !d.placeholder).map((d) => d.value)
    return Math.max(...nums, 1)
  }, [list])

  return (
    <Panel title="各单位谈话对象排行" className="panel--plain unit-ranking-panel">
      <ul
        className={`unit-ranking${list.length >= 6 ? ' unit-ranking--dense' : ''}`}
      >
        {list.map((item, index) => {
          const rank = index + 1
          const color = RANK_COLORS[index] ?? RANK_COLORS[3]
          const numeric = item.placeholder ? 0 : item.value
          const pct = item.placeholder
            ? 28
            : Math.max(8, Math.round((numeric / maxValue) * 100))
          return (
            <li key={item.key || `${item.name}-${rank}`} className="unit-ranking__item">
              <div className="unit-ranking__head">
                <RankBadge rank={rank} />
                <span className="unit-ranking__name" title={item.name}>
                  {item.name}
                </span>
                <span className="unit-ranking__value">{item.value}</span>
              </div>
              <div className="unit-ranking__bar-wrap">
                <div
                  className="unit-ranking__bar"
                  style={{
                    width: `${pct}%`,
                    background: item.placeholder
                      ? 'rgba(94, 184, 255, 0.18)'
                      : `linear-gradient(90deg, ${color}55 0%, ${color} 88%, #ffffff 100%)`,
                    boxShadow: item.placeholder ? 'none' : `0 0 8px ${color}66`,
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

export default UnitRanking
