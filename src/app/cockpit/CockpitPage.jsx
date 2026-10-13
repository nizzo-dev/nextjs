/**
 * @file 驾驶舱页面壳
 * @description 路由 /cockpit。
 * - 中间中国地图三 Tab 共用，始终挂载，不随底栏切换卸载；支持省→市→县下钻
 * - 底栏 Tab 仅切换顶部 KPI 与左右面板数据区
 * - Tab 切换：面板 leave 淡出 → 换组件 → enter 淡入（仅 opacity，避免 transform 抢点击）
 * - 首次进入播放入场动画；结束后移除 enter class，避免残留 transform 抢点击
 * - 以 1920×1080 为基准：宽高独立缩放铺满视口；分辨率不足时压缩（可变形），保证全部内容可见
 */
"use client"
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react'
import { requestFullscreen } from '@/lib/fullscreen'
import Header from './components/Header/Header'
import BottomNav from './components/BottomNav/BottomNav'
import ChinaMap from './components/ChinaMap/ChinaMap'
import { MapScopeProvider } from './MapScopeContext'
import {
  VenuesKpi,
  VenuesLeft,
  VenuesRight,
} from './views/VenuesView/VenuesView'
import {
  ParticipantsKpi,
  ParticipantsLeft,
  ParticipantsRight,
} from './views/ParticipantsView/ParticipantsView'
import {
  SubjectsKpi,
  SubjectsLeft,
  SubjectsRight,
} from './views/SubjectsView/SubjectsView'
import { useScreenScale } from './hooks/useScreenScale'
import './cockpit.css'

/** 入场淡入最长耗时（含 delay），结束后卸掉 enter class */
const ENTER_ANIMATION_MS = 1200

/** Tab 切换：旧面板淡出时长（与 CSS 对齐） */
const PANEL_LEAVE_MS = 200
/** Tab 切换：新面板淡入时长（含 stagger，与 CSS 对齐） */
const PANEL_ENTER_MS = 360

/**
 * 各 Tab 对应的可切换面板（不含地图）
 * Kpi / Left / Right 分别填入顶部与左右栏
 */
const PANEL_MAP = {
  venues: {
    Kpi: VenuesKpi,
    Left: VenuesLeft,
    Right: VenuesRight,
  },
  participants: {
    Kpi: ParticipantsKpi,
    Left: ParticipantsLeft,
    Right: ParticipantsRight,
  },
  subjects: {
    Kpi: SubjectsKpi,
    Left: SubjectsLeft,
    Right: SubjectsRight,
  },
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function CockpitPage() {
  const [activeTab, setActiveTab] = useState('venues')
  // 实际挂载的面板 Tab；与 activeTab 不同时走 leave → swap → enter
  const [panelTab, setPanelTab] = useState('venues')
  /** @type {'idle' | 'leaving' | 'entering'} */
  const [panelPhase, setPanelPhase] = useState('idle')
  const [entering, setEntering] = useState(true)
  const { scaleX, scaleY } = useScreenScale()

  // 从导航点击进入时继承用户手势；直接打开 URL 时由 Header 提供手动入口。
  useEffect(() => {
    void requestFullscreen()
  }, [])

  // Tab 切换：淡出后再挂载目标面板，快速连点只落到最终 Tab
  useEffect(() => {
    if (panelTab === activeTab) return undefined

    if (prefersReducedMotion()) {
      setPanelTab(activeTab)
      setPanelPhase('idle')
      return undefined
    }

    setPanelPhase('leaving')
    const timer = window.setTimeout(() => {
      setPanelTab(activeTab)
      setPanelPhase('entering')
    }, PANEL_LEAVE_MS)
    return () => window.clearTimeout(timer)
  }, [activeTab, panelTab])

  // 连点回到当前面板时取消 leave，避免停在半透明
  useEffect(() => {
    if (panelTab !== activeTab) return undefined
    if (panelPhase !== 'leaving') return undefined
    setPanelPhase('idle')
  }, [activeTab, panelTab, panelPhase])

  // 淡入结束后回到 idle，避免动画 class 残留
  useEffect(() => {
    if (panelPhase !== 'entering') return undefined
    if (prefersReducedMotion()) {
      setPanelPhase('idle')
      return undefined
    }
    const timer = window.setTimeout(() => setPanelPhase('idle'), PANEL_ENTER_MS)
    return () => window.clearTimeout(timer)
  }, [panelPhase, panelTab])

  const panels = PANEL_MAP[panelTab] ?? PANEL_MAP.venues
  const { Kpi, Left, Right } = panels

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntering(false)
      return undefined
    }
    const timer = window.setTimeout(() => setEntering(false), ENTER_ANIMATION_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const panelAnimClass =
    panelPhase === 'leaving'
      ? ' cockpit-panels--leaving'
      : panelPhase === 'entering'
        ? ' cockpit-panels--entering'
        : ''

  return (
    <MapScopeProvider>
      <div className="cockpit-screen">
        <div
          className={`cockpit${entering ? ' cockpit--enter' : ''}`}
          style={{ transform: `scale(${scaleX}, ${scaleY})` }}
        >
          <Header />

          <div className={`cockpit__view cockpit-stage${panelAnimClass}`}>
            <aside className="cockpit-stage__side cockpit-stage__side--left">
              <Left />
            </aside>

            <main className="cockpit-stage__center">
              <div className="cockpit-stage__kpi">
                <Kpi />
              </div>
              <section className="cockpit-stage__map">
                <ChinaMap activeTab={activeTab} />
              </section>
              <BottomNav activeTab={activeTab} onChange={setActiveTab} />
            </main>

            <aside className="cockpit-stage__side cockpit-stage__side--right">
              <Right />
            </aside>
          </div>
        </div>
      </div>
    </MapScopeProvider>
  )
}

export default CockpitPage
