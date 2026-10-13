/**
 * @file 短时高频/异地谈话对象预警趋势
 * @description 对齐 UI：双面积折线（红 / 黄）近 7 日趋势。
 * 数据来自 ObjectWarningTrendDTO：frequencyCount 短时高频 / awayFromCount 异地 / timeCount 日期。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_OBJECT_WARNING_TREND } from '../../../mockData'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const PLACEHOLDER_CATEGORIES = ['—', '—', '—']

const EMPTY_TREND = {
  dates: PLACEHOLDER_CATEGORIES,
  highFreq: [0, 0, 0],
  offsite: [0, 0, 0],
}

const toNumber = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

/** 2026-07-14 → 07-14 */
const formatDateLabel = (time) => {
  const text = String(time ?? '').trim()
  const match = text.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (match) return `${match[2]}-${match[3]}`
  return text || '--'
}

const niceAxisMax = (values) => {
  const max = Math.max(...values, 0)
  if (max <= 0) return 10
  if (max <= 20) return 20
  if (max <= 50) return Math.ceil(max / 10) * 10
  const step = max <= 100 ? 20 : 50
  return Math.ceil(max / step) * step
}

const mapWarningTrend = (data) => {
  const list = Array.isArray(data) ? data : []
  const sorted = [...list].sort((a, b) =>
    String(a?.timeCount ?? '').localeCompare(String(b?.timeCount ?? '')),
  )

  const dates = sorted.map((item) => formatDateLabel(item?.timeCount))
  if (!dates.length) return EMPTY_TREND

  return {
    dates,
    highFreq: sorted.map((item) => toNumber(item?.frequencyCount)),
    offsite: sorted.map((item) => toNumber(item?.awayFromCount)),
  }
}

function WarningTrend() {
  const params = useCockpitQueryParams()
  const trend = useCockpitSWR('objectWarningTrend', params, GET_OBJECT_WARNING_TREND, {
    select: mapWarningTrend,
    fallback: () => EMPTY_TREND,
  })

  const option = useMemo(() => {
    const yMax = niceAxisMax([...trend.highFreq, ...trend.offsite])
    const yInterval = yMax <= 20 ? 5 : yMax <= 100 ? 20 : Math.ceil(yMax / 5)

    return {
      grid: { left: 36, right: 12, top: 36, bottom: 26 },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 14,
        textStyle: {
          color: 'rgba(190, 205, 220, 0.88)',
          fontSize: 12,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        data: [
          {
            name: '短时高频谈话对象',
            icon: 'rect',
            itemStyle: { color: '#E64545' },
          },
          {
            name: '异地谈话对象',
            icon: 'rect',
            itemStyle: { color: '#FFD200' },
          },
        ],
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(6, 24, 48, 0.92)',
        borderColor: 'rgba(0, 132, 255, 0.45)',
        textStyle: { color: '#e8f4ff', fontSize: 12 },
      },
      xAxis: {
        type: 'category',
        data: trend.dates,
        boundaryGap: false,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.75)',
          fontSize: 11,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
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
      series: [
        {
          name: '短时高频谈话对象',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          data: trend.highFreq,
          lineStyle: {
            width: 2.5,
            color: '#E64545',
            shadowBlur: 8,
            shadowColor: 'rgba(230, 69, 69, 0.65)',
          },
          itemStyle: { color: '#E64545' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(230, 69, 69, 0.38)' },
                { offset: 1, color: 'rgba(230, 69, 69, 0.02)' },
              ],
            },
          },
        },
        {
          name: '异地谈话对象',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          data: trend.offsite,
          lineStyle: {
            width: 2.5,
            color: '#FFD200',
            shadowBlur: 8,
            shadowColor: 'rgba(255, 210, 0, 0.55)',
          },
          itemStyle: { color: '#FFD200' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 210, 0, 0.32)' },
                { offset: 1, color: 'rgba(255, 210, 0, 0.02)' },
              ],
            },
          },
        },
      ],
    }
  }, [trend])

  return (
    <Panel title="短时高频/异地谈话对象预警趋势" className="panel--plain warning-trend-panel">
      <div className="warning-trend">
        <EChart option={option} className="echart--fill" />
      </div>
    </Panel>
  )
}

export default WarningTrend
