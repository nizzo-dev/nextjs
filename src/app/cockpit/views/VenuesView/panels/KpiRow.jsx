/**
 * @file 顶部 KPI 指标行
 * @description 对齐 UI：切图圆形图标 + 标签 + 渐变数值。
 * 内设机构 / 在用场所来自 getPilotUp；案件相关四项来自 getTheOverdueList。
 */
import { useMemo } from 'react'
import { GET_PILOT_UP, GET_THE_OVERDUE_LIST } from '../../../mockData'
import { kpiIconMap } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const KPI_META = [
  {
    key: 'institutions',
    source: 'pilot',
    field: 'InstitutionCount',
    icon: kpiIconMap.sessions,
    label: '内设机构总数',
  },
  {
    key: 'venues',
    source: 'pilot',
    field: 'venueCount',
    icon: kpiIconMap.participants,
    label: '在用谈话场所',
  },
  {
    key: 'finished',
    source: 'overdue',
    field: 'completion',
    icon: kpiIconMap.highRisk,
    label: '已办案件',
  },
  {
    key: 'ongoing',
    source: 'overdue',
    field: 'additionalQuantity',
    icon: kpiIconMap.abnormal,
    label: '在办案件',
  },
  {
    key: 'violation',
    source: 'overdue',
    field: 'all',
    icon: kpiIconMap.institutions,
    label: '违规谈话',
  },
  {
    key: 'overdueCount',
    source: 'overdue',
    field: 'overdueQuantity',
    icon: kpiIconMap.venues,
    label: '逾期未办结',
  },
]

const PLACEHOLDER = '--'

const createPlaceholderItems = () =>
  KPI_META.map((item) => ({
    ...item,
    value: PLACEHOLDER,
  }))

const formatKpiValue = (value) => {
  if (value == null || value === '') return PLACEHOLDER
  const num = Number(String(value).replace(/%/g, '').trim())
  if (Number.isFinite(num)) {
    const formatted = num.toLocaleString('en-US')
    return String(value).includes('%') ? `${formatted}%` : formatted
  }
  return String(value)
}

/** 兼容 InstitutionCount / institutionCount */
const pickField = (data, field) => {
  if (!data || typeof data !== 'object') return undefined
  if (data[field] != null && data[field] !== '') return data[field]
  if (field === 'InstitutionCount' && data.institutionCount != null) {
    return data.institutionCount
  }
  return data[field]
}

const mapPilotUp = (data) => (data && typeof data === 'object' && !Array.isArray(data) ? data : null)

const mapOverdueOverview = (data) => {
  if (!data || Array.isArray(data) || typeof data !== 'object') return null
  const overview = { ...data }
  delete overview.subList
  return overview
}

function KpiRow() {
  const params = useCockpitQueryParams()
  const pilot = useCockpitSWR('pilotUp', params, GET_PILOT_UP, {
    select: mapPilotUp,
    fallback: null,
  })
  const overdue = useCockpitSWR('theOverdueList', params, GET_THE_OVERDUE_LIST, {
    select: mapOverdueOverview,
    fallback: null,
  })

  const items = useMemo(() => {
    if (!pilot && !overdue) return createPlaceholderItems()
    const sources = { pilot, overdue }
    return KPI_META.map((meta) => ({
      ...meta,
      value: formatKpiValue(pickField(sources[meta.source], meta.field)),
    }))
  }, [pilot, overdue])

  return (
    <section className="kpi-row">
      {items.map((item) => (
        <article key={item.key} className="kpi-card">
          <img
            className="kpi-card__icon-deco"
            src={item.icon}
            alt=""
            aria-hidden="true"
          />
          <div className="kpi-card__content">
            <span className="kpi-card__label">{item.label}</span>
            <span className="kpi-card__value">{item.value}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

export default KpiRow
