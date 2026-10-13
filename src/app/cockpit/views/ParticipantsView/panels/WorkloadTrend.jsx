/**
 * @file 近7天人员工作负荷趋势分析
 * @description 对齐 UI：左轴时长折线 + 右轴人数柱状（柱顶高亮）。
 * 数据来自 getLoad：recordCount 高负荷人数 / recordTimeCount 时长(分钟) / recordTime 日期。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_LOAD } from '../../../mockData'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const PLACEHOLDER_CATEGORIES = ['—', '—', '—']

const EMPTY_TREND = {
  dates: PLACEHOLDER_CATEGORIES,
  highLoadCount: [0, 0, 0],
  avgDuration: [0, 0, 0],
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

/**
 * recordTimeCount 按分钟转小时；若已是合理小时值（≤24）则直接使用
 */
const toDurationHours = (value) => {
  const num = toNumber(value)
  if (num <= 0) return 0
  if (num <= 24) return Number(num.toFixed(2))
  return Number((num / 60).toFixed(2))
}

const niceAxisMax = (values, minCeil = 1) => {
  const max = Math.max(...values, 0)
  if (max <= 0) return minCeil
  if (max <= 5) return 5
  if (max <= 10) return 10
  const step = max <= 25 ? 5 : 10
  return Math.ceil(max / step) * step
}

const mapLoadTrend = (data) => {
  const list = Array.isArray(data) ? data : []
  const sorted = [...list].sort((a, b) =>
    String(a?.recordTime ?? '').localeCompare(String(b?.recordTime ?? '')),
  )

  const dates = sorted.map((item) => formatDateLabel(item?.recordTime))
  if (!dates.length) return EMPTY_TREND

  return {
    dates,
    highLoadCount: sorted.map((item) => toNumber(item?.recordCount)),
    avgDuration: sorted.map((item) => toDurationHours(item?.recordTimeCount)),
  }
}

function WorkloadTrend() {
  const params = useCockpitQueryParams()
  const trend = useCockpitSWR('load', params, GET_LOAD, {
    select: mapLoadTrend,
    fallback: () => EMPTY_TREND,
  })

  const option = useMemo(() => {
    const durationMax = niceAxisMax(trend.avgDuration, 10)
    const peopleMax = niceAxisMax(trend.highLoadCount, 25)
    const durationInterval = durationMax <= 10 ? 2 : Math.ceil(durationMax / 5)
    const peopleInterval = peopleMax <= 25 ? 5 : Math.ceil(peopleMax / 5)

    return {
      // 顶部预留图例 + 左右轴名称，避免「高负荷人员数」被轴名盖住
      grid: { left: 42, right: 38, top: 52, bottom: 26 },
      legend: {
        top: 4,
        left: 'center',
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 18,
        textStyle: {
          color: 'rgba(190, 205, 220, 0.88)',
          fontSize: 12,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        data: [
          {
            name: '平均单日时长',
            icon: 'rect',
            itemStyle: { color: '#FF7A2F', borderRadius: 1 },
          },
          {
            name: '高负荷人员数',
            icon: 'rect',
            itemStyle: { color: '#0084FF', borderRadius: 1 },
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
        boundaryGap: true,
        axisLabel: {
          color: 'rgba(190, 205, 220, 0.75)',
          fontSize: 11,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
        },
        axisLine: { lineStyle: { color: 'rgba(100, 150, 200, 0.35)' } },
        axisTick: { show: false },
      },
      yAxis: [
        {
          type: 'value',
          name: '时长(h)',
          nameGap: 10,
          nameTextStyle: {
            color: 'rgba(255, 255, 255, 0.72)',
            fontSize: 12,
            align: 'left',
            padding: [0, 0, 0, 0],
          },
          min: 0,
          max: durationMax,
          interval: durationInterval,
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
        {
          type: 'value',
          name: '人数',
          nameGap: 10,
          nameTextStyle: {
            color: 'rgba(255, 255, 255, 0.72)',
            fontSize: 12,
            align: 'right',
            padding: [0, 0, 0, 0],
          },
          min: 0,
          max: peopleMax,
          interval: peopleInterval,
          position: 'right',
          axisLabel: {
            color: 'rgba(190, 205, 220, 0.65)',
            fontSize: 11,
            fontFamily: 'DIN Alternate, Microsoft YaHei, sans-serif',
          },
          splitLine: { show: false },
          axisLine: { show: false },
        },
      ],
      series: [
        {
          name: '高负荷人员数',
          type: 'bar',
          yAxisIndex: 1,
          barWidth: 16,
          data: trend.highLoadCount,
          itemStyle: {
            borderRadius: [1, 1, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#E8F4FF' },
                { offset: 0.12, color: '#4DA8FF' },
                { offset: 1, color: '#003D8A' },
              ],
            },
            shadowBlur: 6,
            shadowColor: 'rgba(0, 132, 255, 0.35)',
          },
        },
        {
          name: '平均单日时长',
          type: 'line',
          yAxisIndex: 0,
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          data: trend.avgDuration,
          lineStyle: { width: 2.5, color: '#FF7A2F' },
          itemStyle: { color: '#FF7A2F', borderColor: '#FF7A2F', borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 122, 47, 0.28)' },
                { offset: 1, color: 'rgba(255, 122, 47, 0.02)' },
              ],
            },
          },
        },
      ],
    }
  }, [trend])

  return (
    <Panel title="近7天人员工作负荷趋势分析" className="panel--plain workload-trend-panel">
      <div className="workload-trend">
        <EChart option={option} className="echart--fill" />
      </div>
    </Panel>
  )
}

export default WorkloadTrend
