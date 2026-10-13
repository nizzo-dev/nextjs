/**
 * @file 谈话人员全景 · 可切换面板
 * @description 对齐 MasterGo「驾驶舱-谈话人员全景」(19:881)。
 * 仅包含顶部 KPI 与左右栏；中间地图由 CockpitPage 固定渲染。
 */
import KpiRow from './panels/KpiRow'
import OrgStructure from './panels/OrgStructure'
import WorkloadTrend from './panels/WorkloadTrend'
import BehaviorSupervise from './panels/BehaviorSupervise'
import DomainCoverage from './panels/DomainCoverage'
import BehaviorRanking from './panels/BehaviorRanking'

/** 顶部五项 KPI */
export function ParticipantsKpi() {
  return <KpiRow />
}

/** 左侧：组织结构 / 工作负荷趋势 / 文明办案监督 */
export function ParticipantsLeft() {
  return (
    <div className="participants-left">
      <OrgStructure />
      <WorkloadTrend />
      <BehaviorSupervise />
    </div>
  )
}

/** 右侧：领域覆盖 / 行为规范排名 */
export function ParticipantsRight() {
  return (
    <div className="participants-right">
      <DomainCoverage />
      <BehaviorRanking />
    </div>
  )
}
