/**
 * @file 谈话对象风险等级分布
 * @description 对齐 UI：盾牌摘要计数 + 多层发光环图 + 右侧图例。
 * 数据来自 getInterlocutorRiskLevel（注意 low*=中风险、medium*=低风险）。
 */
import { useMemo } from 'react'
import Panel from '../../../../../components/common/Panel'
import EChart from '../../../../../components/common/EChart'
import { GET_INTERLOCUTOR_RISK_LEVEL } from '../../../mockData'
import { cockpitAssets } from '../../../assets'
import riskShieldIcon from '../../../images/icon.png'
import { useCockpitQueryParams } from '../../../hooks/useCockpitQueryParams'
import { useCockpitSWR } from '../../../hooks/useCockpitSWR'

const CHART_CENTER = ['46%', '52%']
const PLACEHOLDER = '--'

/** 接口字段 → 展示；low*=中风险，medium*=低风险（按后端约定） */
const RISK_META = [
  {
    key: 'high',
    name: '高风险',
    percentField: 'highRisk',
    countField: 'highRiskCount',
    color: '#FF5A5A',
  },
  {
    key: 'mid',
    name: '中风险',
    percentField: 'lowRisk',
    countField: 'lowRiskCount',
    color: '#FF9F2E',
  },
  {
    key: 'low',
    name: '低风险',
    percentField: 'mediumRisk',
    countField: 'mediumRiskCount',
    color: '#3EC6FF',
  },
]

const createPlaceholderLevels = () =>
  RISK_META.map((item) => ({
    ...item,
    count: PLACEHOLDER,
    value: 0,
    percentLabel: PLACEHOLDER,
  }))

const toNumber = (value) => {
  if (value == null || value === '') return null
  const num = Number(String(value).replace(/%/g, '').trim())
  return Number.isFinite(num) ? num : null
}

const formatCount = (value) => {
  const num = toNumber(value)
  if (num == null) return PLACEHOLDER
  return num.toLocaleString('en-US')
}

const formatPercent = (value) => {
  const num = toNumber(value)
  if (num == null) return PLACEHOLDER
  // 0~1 视为比例
  const pct = num > 0 && num <= 1 ? num * 100 : num
  return String(Number(pct.toFixed(1)))
}

const mapRiskLevels = (data) => {
  const row = data && typeof data === 'object' ? data : {}
  return RISK_META.map((meta) => {
    const percentLabel = formatPercent(row[meta.percentField])
    const percentNum = toNumber(percentLabel)
    const countNum = toNumber(row[meta.countField])
    return {
      ...meta,
      count: formatCount(row[meta.countField]),
      value: percentNum != null ? percentNum : countNum != null ? countNum : 0,
      percentLabel,
    }
  })
}

function RiskDistribution() {
  const params = useCockpitQueryParams()
  const levels = useCockpitSWR('interlocutorRiskLevel', params, GET_INTERLOCUTOR_RISK_LEVEL, {
    select: mapRiskLevels,
    fallback: createPlaceholderLevels,
  })
  const center = levels[0]

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
          padAngle: 2,
          z: 4,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: {
            borderColor: 'rgba(4, 12, 28, 0.95)',
            borderWidth: 2,
          },
          data: levels.map((d) => ({
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
        // 内侧高亮蓝弧（对应高风险占比）
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
              value: Math.max(0, 100 - center.value),
              itemStyle: {
                color: 'rgba(20, 60, 110, 0.45)',
                borderWidth: 0,
              },
            },
          ],
        },
        // 中心径向底（仅装饰，文字改由 DOM 叠层，避免被饼图/阴影压住）
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
    [levels, center],
  )

  const centerPct =
    center.percentLabel === PLACEHOLDER ? PLACEHOLDER : `${center.percentLabel}%`

  return (
    <Panel title="谈话对象风险等级分布" className="panel--plain risk-distribution-panel">
      <div className="risk-distribution">
        <div className="risk-distribution__summary">
          <img
            className="risk-distribution__shield"
            src={riskShieldIcon.src ?? riskShieldIcon}
            alt=""
            aria-hidden="true"
          />
          <ul className="risk-distribution__stats">
            {levels.map((item) => (
              <li key={item.key} className="risk-distribution__stat">
                <span className="risk-distribution__stat-label">{item.name}</span>
                <span
                  className="risk-distribution__stat-value"
                  style={{
                    color: item.color,
                    textShadow: `0 0 12px ${item.color}99`,
                  }}
                >
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="risk-distribution__body">
          <div className="risk-distribution__chart">
            <img
              className="risk-distribution__chart-bg"
              src={cockpitAssets.conversationChartBg}
              alt=""
              aria-hidden="true"
            />
            <div className="risk-distribution__chart-ring" aria-hidden="true" />
            <EChart option={option} className="echart--fill" />
            <div className="risk-distribution__chart-center" aria-hidden="true">
              <span className="risk-distribution__chart-pct">{centerPct}</span>
              <span className="risk-distribution__chart-name">{center.name}</span>
            </div>
          </div>
          <ul className="risk-distribution__legend">
            {levels.map((item) => (
              <li key={item.key} className="risk-distribution__legend-item">
                <span
                  className="risk-distribution__swatch"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                  }}
                />
                <span className="risk-distribution__legend-name">{item.name}</span>
                <span
                  className="risk-distribution__legend-value"
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
      </div>
    </Panel>
  )
}

export default RiskDistribution
