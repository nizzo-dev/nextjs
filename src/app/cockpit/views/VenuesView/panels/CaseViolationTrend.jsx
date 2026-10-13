/**
 * @file 案件违规趋势面板
 * @description 对齐 UI：红色发光平滑折线 + 1–12 月坐标。
 * 数据来自 getRhythmList（time / count）。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_RHYTHM_LIST } from '../../../mockData'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const LINE_COLOR = '#E84B6D'
const MONTH_COUNT = 12

const createPlaceholderTrend = () =>
  Array.from({ length: MONTH_COUNT }, (_, index) => ({
    month: `${index + 1}月`,
    value: 0,
  }))

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const formatTrendMonthLabel = (time) => {
  const month = Number(String(time ?? '').split('-')[1])
  return Number.isFinite(month) && month > 0 ? `${month}月` : String(time ?? '')
}

const mapRhythmTrendList = (data) => {
  const list = Array.isArray(data) ? data : []
  const mapped = [...list]
    .sort((a, b) => String(a?.time ?? '').localeCompare(String(b?.time ?? '')))
    .map((item) => ({
      month: formatTrendMonthLabel(item?.time),
      value: toNumber(item?.count),
    }))
    .filter((item) => item.month)
  return mapped.length ? mapped : createPlaceholderTrend()
}

const niceAxisMax = (values) => {
  const max = Math.max(...values, 0)
  if (max <= 0) return 50
  if (max <= 50) return 50
  if (max <= 200) return Math.ceil(max / 50) * 50
  return Math.ceil(max / 50) * 50
}

function CaseViolationTrend() {
  const params = useCockpitQueryParams()
  const trend = useCockpitSWR('rhythmList', params, GET_RHYTHM_LIST, {
    select: mapRhythmTrendList,
    fallback: createPlaceholderTrend,
  })

  const option = useMemo(() => {
    const months = trend.map((item) => item.month)
    const values = trend.map((item) => item.value)
    const yMax = niceAxisMax(values)
    const interval = yMax <= 50 ? 10 : 50

    return {
      title: {
        text: '单位：次',
        left: 0,
        top: 0,
        textStyle: {
          color: 'rgba(190, 205, 220, 0.72)',
          fontSize: 11,
          fontWeight: 400,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
      },
      grid: { left: 32, right: 8, top: 28, bottom: 22 },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 16,
        itemHeight: 3,
        itemGap: 8,
        icon: 'rect',
        textStyle: {
          color: 'rgba(190, 205, 220, 0.88)',
          fontSize: 11,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        data: [
          {
            name: '违规趋势',
            itemStyle: { color: LINE_COLOR },
          },
        ],
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(6, 24, 48, 0.92)',
        borderColor: 'rgba(232, 75, 109, 0.45)',
        textStyle: { color: '#e8f4ff', fontSize: 12 },
        formatter: (chartParams) => {
          const point = chartParams?.[0]
          if (!point) return ''
          return `${point.axisValue}<br/>${point.seriesName}：${point.value} 次`
        },
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.75)',
          fontSize: 10,
          interval: 0,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        axisLine: { lineStyle: { color: 'rgba(100, 150, 200, 0.35)' } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: yMax,
        interval,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.65)',
          fontSize: 10,
          fontFamily: 'DIN Alternate, Microsoft YaHei, sans-serif',
        },
        splitLine: {
          lineStyle: { type: 'dashed', color: 'rgba(80, 140, 200, 0.28)' },
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          name: '违规趋势',
          type: 'line',
          smooth: 0.45,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          data: values,
          lineStyle: {
            width: 2.4,
            color: LINE_COLOR,
            shadowBlur: 12,
            shadowColor: 'rgba(232, 75, 109, 0.75)',
          },
          itemStyle: { color: LINE_COLOR },
        },
      ],
    }
  }, [trend])

  return (
    <Panel title="案件违规趋势" className="panel--plain case-violation-trend-panel">
      <div className="case-violation-trend">
        <EChart option={option} className="echart--fill" />
      </div>
    </Panel>
  )
}

export default CaseViolationTrend
