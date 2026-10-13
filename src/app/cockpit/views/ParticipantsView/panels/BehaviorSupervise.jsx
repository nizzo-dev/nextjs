/**
 * @file 文明办案行为监督分析
 * @description 对齐 UI：多层发光环形图 + 中心占比 + 右侧图例。
 * 数据来自 ScoringBfb：scoringOne/Two/Three → 0.5-2 / 2.5-4 / 4.5-5 分占比。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_SCORING_BFB } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const CHART_CENTER = ['42%', '52%']
const PLACEHOLDER = '--'

const SCORE_META = [
  { key: 'one', field: 'scoringOne', name: '0.5分-2分', color: '#E65C2E' },
  { key: 'two', field: 'scoringTwo', name: '2.5分-4分', color: '#F0D000' },
  { key: 'three', field: 'scoringThree', name: '4.5分-5分', color: '#8B3FBF' },
]

const createPlaceholderScores = () =>
  SCORE_META.map((item) => ({
    ...item,
    value: 0,
    percentLabel: PLACEHOLDER,
  }))

const toPercentNumber = (value) => {
  if (value == null || value === '') return null
  const num = Number(String(value).replace(/%/g, '').trim())
  return Number.isFinite(num) ? num : null
}

const formatPercentLabel = (value) => {
  const num = toPercentNumber(value)
  if (num == null) return PLACEHOLDER
  return String(Number(num.toFixed(1)))
}

const mapScoringData = (data) => {
  const row = Array.isArray(data) ? data[0] : data
  const source = row && typeof row === 'object' ? row : {}
  return SCORE_META.map((meta) => {
    const percentLabel = formatPercentLabel(source[meta.field])
    const value = toPercentNumber(percentLabel) ?? 0
    return {
      ...meta,
      value,
      percentLabel,
    }
  })
}

function BehaviorSupervise() {
  const params = useCockpitQueryParams()
  const scores = useCockpitSWR('scoringBfb', params, GET_SCORING_BFB, {
    select: mapScoringData,
    fallback: createPlaceholderScores,
  })
  const center = scores[0]
  const restTotal = Math.max(
    0,
    scores.reduce((sum, d) => sum + d.value, 0) - center.value,
  )

  const option = useMemo(
    () => ({
      animation: false,
      series: [
        // 最外虚线装饰环
        {
          type: 'pie',
          radius: ['86%', '87%'],
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
                borderColor: 'rgba(80, 160, 255, 0.35)',
                borderWidth: 1,
                borderType: [3, 4],
              },
            },
          ],
        },
        // 外层淡蓝细环
        {
          type: 'pie',
          radius: ['80%', '81%'],
          center: CHART_CENTER,
          silent: true,
          z: 1,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: 1,
              itemStyle: {
                color: 'rgba(0, 132, 255, 0.28)',
                borderWidth: 0,
                shadowBlur: 8,
                shadowColor: 'rgba(0, 132, 255, 0.35)',
              },
            },
          ],
        },
        // 主数据环：橙 / 黄 / 紫
        {
          type: 'pie',
          radius: ['56%', '72%'],
          center: CHART_CENTER,
          startAngle: 90,
          padAngle: 2.5,
          z: 4,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderColor: 'rgba(4, 12, 28, 0.95)',
            borderWidth: 2,
          },
          data: scores.map((d) => ({
            name: d.name,
            value: d.value,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: d.color },
                  { offset: 1, color: `${d.color}cc` },
                ],
              },
              shadowBlur: 18,
              shadowColor: `${d.color}aa`,
            },
          })),
        },
        // 内侧高亮蓝弧（对应首项占比）
        {
          type: 'pie',
          radius: ['46%', '50%'],
          center: CHART_CENTER,
          startAngle: 90,
          silent: true,
          z: 3,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: center.value,
              itemStyle: {
                color: '#3BA8FF',
                shadowBlur: 12,
                shadowColor: 'rgba(59, 168, 255, 0.85)',
              },
            },
            {
              value: restTotal,
              itemStyle: {
                color: 'rgba(20, 60, 110, 0.45)',
                borderWidth: 0,
              },
            },
          ],
        },
        // 中心径向底
        {
          type: 'pie',
          radius: ['0%', '40%'],
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
                  r: 0.85,
                  colorStops: [
                    { offset: 0, color: 'rgba(0, 90, 180, 0.28)' },
                    { offset: 0.7, color: 'rgba(4, 20, 48, 0.35)' },
                    { offset: 1, color: 'rgba(2, 10, 28, 0.08)' },
                  ],
                },
                borderWidth: 0,
              },
            },
          ],
        },
      ],
    }),
    [scores, center, restTotal],
  )

  const centerPct =
    center.percentLabel === PLACEHOLDER ? PLACEHOLDER : `${center.percentLabel}%`

  return (
    <Panel title="文明办案行为监督分析" className="panel--plain behavior-supervise-panel">
      <div className="behavior-supervise">
        <div className="behavior-supervise__chart">
          <img
            className="behavior-supervise__chart-bg"
            src={cockpitAssets.conversationChartBg}
            alt=""
            aria-hidden="true"
          />
          <div className="behavior-supervise__chart-ring" aria-hidden="true" />
          <EChart option={option} className="echart--fill" />
          <div className="behavior-supervise__chart-center" aria-hidden="true">
            <span className="behavior-supervise__chart-pct">{centerPct}</span>
            <span className="behavior-supervise__chart-name">{center.name}</span>
          </div>
        </div>
        <ul className="behavior-supervise__legend">
          {scores.map((item) => (
            <li key={item.key} className="behavior-supervise__legend-item">
              <span
                className="behavior-supervise__swatch"
                style={{
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              />
              <span className="behavior-supervise__name">{item.name}</span>
              <span
                className="behavior-supervise__value"
                style={{
                  color: item.color,
                  textShadow: `0 0 10px ${item.color}88`,
                }}
              >
                {item.percentLabel === PLACEHOLDER ? PLACEHOLDER : `${item.percentLabel}%`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

export default BehaviorSupervise
