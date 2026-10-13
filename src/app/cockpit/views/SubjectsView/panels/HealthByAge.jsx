/**
 * @file 对象各年龄段健康状况分布统计
 * @description 对齐 UI：三色堆叠柱状图（危重 / 一般疾病 / 身体健康）。
 * 数据来自 HealthInterlocutorDTO：countOne/Two/Three。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_HEALTH_INTERLOCUTOR } from '../../../mockData'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const PLACEHOLDER_CATEGORIES = ['—', '—', '—']

const SERIES_META = [
  {
    key: 'healthy',
    countField: 'countOne',
    labelField: 'violatePhysocalStatusOne',
    defaultName: '身体健康',
    color: '#3EC6FF',
  },
  {
    key: 'general',
    countField: 'countTwo',
    labelField: 'evaluationQualifiedTwo',
    defaultName: '一般疾病',
    color: '#FF9F2E',
  },
  {
    key: 'critical',
    countField: 'countThree',
    labelField: 'evaluationQualifiedThree',
    defaultName: '危重情况',
    color: '#FF5A5A',
  },
]

const EMPTY_HEALTH = {
  ages: PLACEHOLDER_CATEGORIES,
  series: SERIES_META.map((item) => ({
    name: item.defaultName,
    color: item.color,
    data: [0, 0, 0],
  })),
}

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const pickSeriesName = (list, labelField, fallback) => {
  for (const row of list) {
    const label = String(row?.[labelField] ?? '').trim()
    if (label) return label
  }
  return fallback
}

const formatAgeLabel = (age) => {
  const text = String(age ?? '').trim()
  if (!text) return '--'
  if (/岁/.test(text)) return text
  if (/以下|以上/.test(text)) return `${text.replace(/(以下|以上)/, '岁$1')}`
  if (/^\d/.test(text)) return `${text}岁`
  return text
}

const niceAxisMax = (values) => {
  const max = Math.max(...values, 0)
  if (max <= 0) return 10
  if (max <= 20) return 20
  if (max <= 50) return Math.ceil(max / 10) * 10
  const step = max <= 100 ? 20 : 50
  return Math.ceil(max / step) * step
}

const mapHealthByAge = (data) => {
  const list = Array.isArray(data) ? data : []
  if (!list.length) return EMPTY_HEALTH
  const ages = list.map((item) => formatAgeLabel(item?.age))
  const series = SERIES_META.map((meta) => ({
    name: pickSeriesName(list, meta.labelField, meta.defaultName),
    color: meta.color,
    data: list.map((item) => toNumber(item?.[meta.countField])),
  }))
  return { ages, series }
}

function HealthByAge() {
  const params = useCockpitQueryParams()
  const health = useCockpitSWR('healthInterlocutor', params, GET_HEALTH_INTERLOCUTOR, {
    select: mapHealthByAge,
    fallback: () => EMPTY_HEALTH,
  })

  const option = useMemo(() => {
    const stackTotals = health.ages.map((_, index) =>
      health.series.reduce((sum, item) => sum + (item.data[index] || 0), 0),
    )
    const yMax = niceAxisMax(stackTotals)
    const yInterval = yMax <= 20 ? 5 : yMax <= 100 ? 20 : Math.ceil(yMax / 5)

    return {
      grid: { left: 36, right: 10, top: 36, bottom: 28 },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 12,
        textStyle: {
          color: 'rgba(190, 205, 220, 0.88)',
          fontSize: 11,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        data: [...health.series].reverse().map((s) => ({
          name: s.name,
          itemStyle: { color: s.color },
        })),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(6, 24, 48, 0.92)',
        borderColor: 'rgba(0, 132, 255, 0.45)',
        textStyle: { color: '#e8f4ff', fontSize: 12 },
      },
      xAxis: {
        type: 'category',
        data: health.ages,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.75)',
          fontSize: 11,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
          interval: 0,
        },
        axisLine: { lineStyle: { color: 'rgba(100, 150, 200, 0.35)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        name: '人',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.72)',
          fontSize: 12,
          padding: [0, 28, 0, 0],
        },
        min: 0,
        max: yMax,
        interval: yInterval,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.65)',
          fontSize: 11,
          fontFamily: 'DIN Alternate, Microsoft YaHei, sans-serif',
        },
        splitLine: {
          lineStyle: { type: 'dashed', color: 'rgba(80, 140, 200, 0.22)' },
        },
        axisLine: { show: false },
      },
      series: health.series.map((item) => ({
        name: item.name,
        type: 'bar',
        stack: 'health',
        barWidth: 18,
        data: item.data,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${item.color}` },
              { offset: 1, color: `${item.color}99` },
            ],
          },
          shadowBlur: 6,
          shadowColor: `${item.color}55`,
        },
        emphasis: { focus: 'series' },
      })),
    }
  }, [health])

  return (
    <Panel title="对象各年龄段健康状况分布统计" className="panel--plain health-by-age-panel">
      <div className="health-by-age">
        <EChart option={option} className="echart--fill" />
      </div>
    </Panel>
  )
}

export default HealthByAge
