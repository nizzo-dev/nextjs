/**
 * @file 场所全域展示 · 可切换面板
 * @description 对齐 MasterGo「驾驶舱-场所全域展示」(2:390)。
 * 仅包含顶部 KPI 与左右栏；中间地图由 CockpitPage 固定渲染，不随 Tab 切换。
 */
import KpiRow from './panels/KpiRow'
import ConversationType from './panels/ConversationType'
import ViolationRanking from './panels/ViolationRanking'
import CaseViolationTrend from './panels/CaseViolationTrend'
import ViolationTypeRanking from './panels/ViolationTypeRanking'
import OverdueRanking from './panels/OverdueRanking'
import QueryStatus from './panels/QueryStatus'

/** 顶部六项 KPI：内设机构 / 在用场所 / 已办案件 / 在办案件 / 违规谈话 / 逾期未办结 */
export function VenuesKpi() {
  return <KpiRow />
}

/** 左侧：谈话类型分布 + 违规谈话排行 + 案件违规趋势（宽 360px） */
export function VenuesLeft() {
  return (
    <div className="venues-left">
      <ConversationType />
      <ViolationRanking />
      <CaseViolationTrend />
    </div>
  )
}

/** 右侧：违规类型数量排行 + 逾期未办结排行 + 一站式查询情况（宽 360px） */
export function VenuesRight() {
  return (
    <div className="venues-right">
      <ViolationTypeRanking />
      <OverdueRanking />
      <QueryStatus />
    </div>
  )
}
