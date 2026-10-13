/**
 * @file 谈话对象全景 · 顶部 KPI
 * @description 对齐 UI：切图圆形图标 + 标签 + 渐变数值；数据来自 getInterlocutorTop。
 */
import { GET_INTERLOCUTOR_TOP } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const KPI_META = [
  {
    key: 'monthlyNew',
    field: 'addCount',
    icon: cockpitAssets.subjectsKpi.monthlyNew,
    label: '本月新增对象',
  },
  {
    key: 'highFreq',
    field: 'frequencyCount',
    icon: cockpitAssets.subjectsKpi.highFreq,
    label: '短时高频谈话对象',
  },
  {
    key: 'offsite',
    field: 'awayFromCount',
    icon: cockpitAssets.subjectsKpi.offsite,
    label: '异地谈话对象',
  },
  {
    key: 'highRisk',
    field: 'highRiskCount',
    icon: cockpitAssets.subjectsKpi.highRisk,
    label: '高风险对象',
  },
  {
    key: 'leads',
    field: 'clueCount',
    icon: cockpitAssets.subjectsKpi.leads,
    label: '关联线索总数',
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
  const num = Number(value)
  if (Number.isFinite(num)) return num.toLocaleString('en-US')
  return String(value)
}

const mapKpiItems = (data) =>
  KPI_META.map((meta) => ({
    ...meta,
    value: formatKpiValue(data?.[meta.field]),
  }))

function KpiRow() {
  const params = useCockpitQueryParams()
  const items = useCockpitSWR('interlocutorTop', params, GET_INTERLOCUTOR_TOP, {
    select: mapKpiItems,
    fallback: createPlaceholderItems,
  })

  return (
    <section className="kpi-row kpi-row--subjects" aria-label="谈话对象核心指标">
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
