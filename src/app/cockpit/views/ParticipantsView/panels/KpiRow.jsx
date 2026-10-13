/**
 * @file 谈话人员全景 · 顶部 KPI
 * @description 对齐 UI：切图圆形图标 + 标签 + 渐变数值；数据来自 getSpeakerUp。
 */
import { GET_SPEAKER_UP } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const KPI_META = [
  {
    key: 'totalStaff',
    field: 'speakerCount',
    format: 'count',
    icon: cockpitAssets.participantsKpi.totalStaff,
    label: '谈话人员总数',
  },
  {
    key: 'civilRate',
    field: 'evaluationQualified',
    format: 'percent',
    icon: cockpitAssets.participantsKpi.civilRate,
    label: '文明办案合格率',
  },
  {
    key: 'monthlyAvg',
    field: 'speakerAge',
    format: 'decimal',
    icon: cockpitAssets.participantsKpi.monthlyAvg,
    label: '人均月度谈话量',
  },
  {
    key: 'avgDuration',
    field: 'recordTimeCount',
    format: 'duration',
    icon: cockpitAssets.participantsKpi.avgDuration,
    label: '平均谈话时长',
  },
  {
    key: 'revisitRate',
    field: 'follow',
    format: 'percent',
    icon: cockpitAssets.participantsKpi.revisitRate,
    label: '回访完成率',
  },
]

const PLACEHOLDER = '--'

const createPlaceholderItems = () =>
  KPI_META.map((item) => ({
    ...item,
    value: PLACEHOLDER,
  }))

const toNumber = (value) => {
  if (value == null || value === '') return null
  const num = Number(String(value).replace(/%/g, '').replace(/h$/i, '').trim())
  return Number.isFinite(num) ? num : null
}

const formatCount = (value) => {
  const num = toNumber(value)
  if (num == null) return PLACEHOLDER
  return num.toLocaleString('en-US')
}

const formatPercent = (value) => {
  if (value == null || value === '') return PLACEHOLDER
  const text = String(value).trim()
  if (text.includes('%')) return text
  const num = toNumber(text)
  if (num == null) return text
  // 0~1 视为比例
  const pct = num > 0 && num <= 1 ? num * 100 : num
  return `${Number(pct.toFixed(1))}%`
}

const formatDecimal = (value) => {
  const num = toNumber(value)
  if (num == null) return PLACEHOLDER
  return Number.isInteger(num) ? String(num) : String(Number(num.toFixed(1)))
}

/** 时长：已带 h 则原样；≤24 按小时；更大值按分钟转小时 */
const formatDuration = (value) => {
  if (value == null || value === '') return PLACEHOLDER
  const text = String(value).trim()
  if (/h$/i.test(text)) return text
  const num = toNumber(text)
  if (num == null) return text
  if (num <= 0) return '0h'
  const hours = num <= 24 ? num : num / 60
  const shown = Number.isInteger(hours) ? String(hours) : String(Number(hours.toFixed(1)))
  return `${shown}h`
}

const formatByType = (format, value) => {
  switch (format) {
    case 'percent':
      return formatPercent(value)
    case 'decimal':
      return formatDecimal(value)
    case 'duration':
      return formatDuration(value)
    case 'count':
    default:
      return formatCount(value)
  }
}

const mapKpiItems = (data) =>
  KPI_META.map((meta) => ({
    ...meta,
    value: formatByType(meta.format, data?.[meta.field]),
  }))

function KpiRow() {
  const params = useCockpitQueryParams()
  const items = useCockpitSWR('speakerUp', params, GET_SPEAKER_UP, {
    select: mapKpiItems,
    fallback: createPlaceholderItems,
  })

  return (
    <section className="kpi-row kpi-row--participants" aria-label="谈话人员核心指标">
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
