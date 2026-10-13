/**
 * @file 谈话对象全景 · 可切换面板
 * @description 对齐「驾驶舱-谈话对象全景」；仅切换 KPI/左右栏，中间地图保持不变。
 */
import RiskDistribution from './panels/RiskDistribution'
import DisciplineRadar from './panels/DisciplineRadar'
import HealthByAge from './panels/HealthByAge'
import WarningTrend from './panels/WarningTrend'
import UnitRanking from './panels/UnitRanking'
import KpiRow from './panels/KpiRow'

/** 顶部六项 KPI */
export function SubjectsKpi() {
  return <KpiRow />
}

/** 左侧：风险等级分布 / 谈话对象类型分布 / 年龄段健康状况 */
export function SubjectsLeft() {
  return (
    <div className="subjects-left">
      <RiskDistribution />
      <DisciplineRadar />
      <HealthByAge />
    </div>
  )
}

/** 右侧：预警趋势 / 各单位排行 */
export function SubjectsRight() {
  return (
    <div className="subjects-right">
      <WarningTrend />
      <UnitRanking />
    </div>
  )
}
