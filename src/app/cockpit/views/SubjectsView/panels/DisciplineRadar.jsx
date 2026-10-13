/**
 * @file 谈话对象类型分布
 * @description 对齐 UI：胶囊分段环图 + 内圈进度弧 + 中心占比 + 外部引线标签。
 * 数据来自 getIntrelocutorType；悬停分段时中心文案同步切换。
 */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_INTERLOCUTOR_TYPE } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const CHART_CENTER = ['50%', '50%']
const PLACEHOLDER = '--'

/** 接口字段 → 展示（顺时针自顶部起，对齐设计稿配色） */
const TYPE_META = [
  { key: 'zero', name: '被核查人', field: 'zeroType', color: '#B57BFF' },
  { key: 'one', name: '被审查调查人', field: 'oneType', color: '#8BA4FF', highlight: true },
  { key: 'two', name: '重要涉案人员', field: 'twoType', color: '#F06BBA' },
  { key: 'three', name: '重要证人', field: 'threeType', color: '#3B8CFF' },
  { key: 'four', name: '一般涉案人员', field: 'fourType', color: '#FF5A4A' },
  { key: 'five', name: '经研判风险较低对象', field: 'fiveType', color: '#FF9F3A' },
  { key: 'eight', name: '有合理事由无法到场的谈话对象', field: 'eightType', color: '#C8E830' },
  { key: 'seven', name: '一般证人', field: 'sevenType', color: '#4CD964' },
  { key: 'six', name: '举报人', field: 'sixType', color: '#3ED9C8' },
  { key: 'nine', name: '偏远且交通不便的谈话对象', field: 'nineType', color: '#3B5BDB' },
  { key: 'ten', name: '往返途中存较大隐患的谈话对象', field: 'tenType', color: '#9B6BFF' },
]

/** 与设计稿一致的截断（中文省略号） */
const truncateLabel = (name, maxLen = 7) => {
  if (!name) return ''
  if (name.length <= maxLen) return name
  return `${name.slice(0, maxLen)}...`
}

const toNumber = (value) => {
  if (value == null || value === '') return null
  const num = Number(String(value).replace(/%/g, '').trim())
  return Number.isFinite(num) ? num : null
}

const formatPercent = (value) => {
  const num = toNumber(value)
  if (num == null) return PLACEHOLDER
  const pct = num > 0 && num <= 1 ? num * 100 : num
  return String(Number(pct.toFixed(0)))
}

const createPlaceholderItems = () =>
  TYPE_META.map((meta) => ({
    ...meta,
    value: 0,
    percentLabel: PLACEHOLDER,
  }))

const mapTypeDistribution = (data) => {
  const row = data && typeof data === 'object' ? data : {}
  return TYPE_META.map((meta) => {
    const percentLabel = formatPercent(row[meta.field])
    const percentNum = toNumber(percentLabel)
    return {
      ...meta,
      value: percentNum != null ? percentNum : 0,
      percentLabel,
    }
  })
}

function DisciplineRadar() {
  const params = useCockpitQueryParams()
  const items = useCockpitSWR('interlocutorType', params, GET_INTERLOCUTOR_TYPE, {
    select: mapTypeDistribution,
    fallback: createPlaceholderItems,
  })

  const defaultCenter = items.find((item) => item.highlight) ?? items[0]
  const [activeName, setActiveName] = useState(defaultCenter?.name)

  useEffect(() => {
    setActiveName(defaultCenter?.name)
  }, [defaultCenter?.name])

  const activeItem =
    items.find((item) => item.name === activeName) ?? defaultCenter
  const centerPercent =
    activeItem?.percentLabel ?? formatPercent(activeItem?.value)
  // 内圈进度弧固定跟默认高亮项，避免悬停时整表 setOption 闪烁
  const progressValue = defaultCenter?.value ?? 0

  const option = useMemo(
    () => ({
      animationDuration: 600,
      animationEasing: 'cubicOut',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(6, 24, 48, 0.92)',
        borderColor: 'rgba(62, 198, 255, 0.45)',
        textStyle: { color: '#e8f4ff', fontSize: 12 },
        formatter: (params) => {
          const item = items.find((d) => d.name === params?.name)
          const pct = item?.percentLabel ?? formatPercent(params?.value)
          return `${params?.name ?? ''}<br/>${pct === PLACEHOLDER ? PLACEHOLDER : `${pct}%`}`
        },
      },
      series: [
        // 最外虚线装饰环
        {
          type: 'pie',
          radius: ['90%', '90.8%'],
          center: CHART_CENTER,
          silent: true,
          z: 0,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: 'transparent',
                borderColor: 'rgba(80, 160, 255, 0.32)',
                borderWidth: 1,
                borderType: [2, 5],
              },
            },
          ],
        },
        // 外层淡蓝细环
        {
          type: 'pie',
          radius: ['84%', '85%'],
          center: CHART_CENTER,
          silent: true,
          z: 1,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: 'rgba(0, 140, 255, 0.2)',
                borderWidth: 0,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 140, 255, 0.35)',
              },
            },
          ],
        },
        // 主数据环内侧细轨
        {
          type: 'pie',
          radius: ['50%', '51%'],
          center: CHART_CENTER,
          silent: true,
          z: 1,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: 'rgba(40, 110, 180, 0.35)',
                borderWidth: 0,
              },
            },
          ],
        },
        // 主数据环：胶囊分段（大间距 + 圆角）
        {
          type: 'pie',
          radius: ['52%', '68%'],
          center: CHART_CENTER,
          startAngle: 95,
          clockwise: true,
          padAngle: 5.5,
          z: 4,
          minAngle: 6,
          itemStyle: {
            borderColor: 'rgba(3, 10, 24, 0.95)',
            borderWidth: 1,
            borderRadius: 12,
          },
          label: {
            show: true,
            position: 'outside',
            alignTo: 'edge',
            edgeDistance: '4%',
            bleedMargin: 4,
            distanceToLabelLine: 3,
            formatter: (params) => truncateLabel(params?.name, 7),
            color: 'rgba(230, 240, 255, 0.92)',
            fontSize: 11,
            lineHeight: 14,
            fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
          },
          labelLayout: {
            hideOverlap: false,
            moveOverlap: 'shiftY',
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 14,
            maxSurfaceAngle: 80,
            smooth: 0.1,
            lineStyle: { width: 1.2, opacity: 0.9 },
          },
          emphasis: {
            scale: true,
            scaleSize: 4,
            itemStyle: {
              shadowBlur: 22,
              shadowColor: 'rgba(120, 200, 255, 0.55)',
            },
            label: {
              color: '#ffffff',
              fontWeight: 600,
            },
          },
          data: items.map((item) => ({
            name: item.name,
            // 无数据时用极小值占位，保持环图结构；透明度过低提示空态
            value: item.value > 0 ? item.value : 0.01,
            itemStyle: {
              opacity: item.value > 0 ? 1 : 0.28,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: item.color },
                  { offset: 0.55, color: item.color },
                  { offset: 1, color: `${item.color}b8` },
                ],
              },
              shadowBlur: 14,
              shadowColor: `${item.color}99`,
            },
            labelLine: {
              lineStyle: { color: item.color },
            },
          })),
        },
        // 内侧高亮进度弧（默认高亮类型）
        {
          type: 'pie',
          radius: ['40%', '45%'],
          center: CHART_CENTER,
          startAngle: 90,
          silent: true,
          z: 3,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: Math.max(progressValue, 0.01),
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: '#5CC8FF' },
                    { offset: 1, color: '#2B8CFF' },
                  ],
                },
                shadowBlur: 14,
                shadowColor: 'rgba(59, 168, 255, 0.9)',
                borderRadius: 4,
                opacity: progressValue > 0 ? 1 : 0.35,
              },
            },
            {
              value: Math.max(0.01, 100 - progressValue),
              itemStyle: {
                color: 'rgba(18, 55, 100, 0.55)',
                borderWidth: 0,
              },
            },
          ],
        },
        // 中心径向底（文字由 DOM 叠层）
        {
          type: 'pie',
          radius: ['0%', '35%'],
          center: CHART_CENTER,
          silent: true,
          z: 2,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.9,
                  colorStops: [
                    { offset: 0, color: 'rgba(0, 100, 200, 0.32)' },
                    { offset: 0.65, color: 'rgba(4, 22, 52, 0.4)' },
                    { offset: 1, color: 'rgba(2, 10, 28, 0.05)' },
                  ],
                },
                borderWidth: 0,
              },
            },
          ],
        },
      ],
    }),
    [items, progressValue],
  )

  const chartEvents = useMemo(
    () => ({
      mouseover: (params) => {
        if (params?.componentType === 'series' && params?.seriesType === 'pie' && params?.name) {
          setActiveName(params.name)
        }
      },
      click: (params) => {
        if (params?.componentType === 'series' && params?.seriesType === 'pie' && params?.name) {
          setActiveName(params.name)
        }
      },
    }),
    [],
  )

  const centerPct =
    centerPercent === PLACEHOLDER ? PLACEHOLDER : `${centerPercent}%`

  return (
    <Panel title="谈话对象类型分布" className="panel--plain discipline-radar-panel">
      <div
        className="discipline-radar"
        onMouseLeave={() => setActiveName(defaultCenter?.name)}
      >
        <img
          className="discipline-radar__bg"
          src={cockpitAssets.conversationChartBg}
          alt=""
          aria-hidden="true"
        />
        <div className="discipline-radar__ring discipline-radar__ring--outer" aria-hidden="true" />
        <div className="discipline-radar__ring discipline-radar__ring--inner" aria-hidden="true" />
        <EChart option={option} className="echart--fill" onEvents={chartEvents} />
        <div className="discipline-radar__center" aria-hidden="true">
          <span className="discipline-radar__center-pct" key={`pct-${activeItem?.name}-${centerPct}`}>
            {centerPct}
          </span>
          <span className="discipline-radar__center-name" key={`name-${activeItem?.name}`}>
            {activeItem?.name ?? ''}
          </span>
        </div>
      </div>
    </Panel>
  )
}

export default DisciplineRadar
