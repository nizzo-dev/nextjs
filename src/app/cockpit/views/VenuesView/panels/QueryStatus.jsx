/**
 * @file 一站式查询情况面板
 * @description 对齐 UI：城市/委机关 Tab；TOP 徽章 + 三角标记 + 进度条列表。
 * 数据来自 getOneStopVideoList（name / count），展示 TOP5。
 */
import { useMemo, useState } from 'react'
import Panel from '../../../../../components/common/Panel'
import { GET_ONE_STOP_VIDEO_LIST, getMockQueryList } from '../../../mockData'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const TABS = [
  { key: 'city', label: '城市' },
  { key: 'office', label: '委机关' },
]

const TOP_LIMIT = 5
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

const mapQueryList = (data) => {
  const list = Array.isArray(data) ? data : []
  const mapped = list
    .map((item) => ({
      name: String(item?.name ?? '').trim(),
      value: toNumber(item?.count),
      placeholder: false,
    }))
    .filter((item) => item.name)
    .sort((a, b) => b.value - a.value)
    .slice(0, TOP_LIMIT)
  return mapped.length ? mapped : createPlaceholderList()
}

function QueryStatus() {
  const params = useCockpitQueryParams()
  const [tab, setTab] = useState('city')
  const list = useCockpitSWR('oneStopVideoList', params, GET_ONE_STOP_VIDEO_LIST, {
    select: mapQueryList,
    fallback: createPlaceholderList,
  })
  const visibleList = useMemo(
    () => (tab === 'city' ? list : mapQueryList(getMockQueryList(tab))),
    [list, tab],
  )

  const max = useMemo(() => {
    const nums = visibleList.filter((d) => !d.placeholder).map((d) => d.value)
    return Math.max(...nums, 1)
  }, [visibleList])

  const extra = (
    <div className="query-tabs">
      {TABS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`query-tabs__btn${tab === item.key ? ' query-tabs__btn--active' : ''}`}
          onClick={() => setTab(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )

  return (
    <Panel title="一站式查询情况" extra={extra} className="panel--plain query-status-panel">
      <ul className="query-rank">
        {visibleList.map((item, index) => {
          const numeric = item.placeholder ? 0 : item.value
          const pct = item.placeholder
            ? 28
            : Math.max(8, Math.round((numeric / max) * 100))
          return (
            <li
              key={item.key || `${item.name}-${index}`}
              className={`query-rank__item${item.placeholder ? ' query-rank__item--placeholder' : ''}`}
            >
              <span className="query-rank__top">{`TOP ${index + 1}`}</span>
              <div className="query-rank__body">
                <div className="query-rank__head">
                  <span className="query-rank__name" title={item.name}>
                    <i className="query-rank__tri" aria-hidden="true" />
                    <span className="query-rank__name-text">{item.name}</span>
                  </span>
                  <span className="query-rank__value">{item.value}</span>
                </div>
                <div className="query-rank__bar-wrap">
                  <div
                    className="query-rank__bar"
                    style={{
                      width: `${pct}%`,
                      opacity: item.placeholder ? 0.35 : 1,
                    }}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

export default QueryStatus
