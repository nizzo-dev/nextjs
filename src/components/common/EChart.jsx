"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

function EChart({ option, onEvents, className = '' }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const eventsRef = useRef(onEvents)

  useEffect(() => {
    eventsRef.current = onEvents
  }, [onEvents])

  useEffect(() => {
    if (!containerRef.current) return undefined

    const chart = echarts.init(containerRef.current)
    chartRef.current = chart
    const eventNames = Object.keys(onEvents || {})

    eventNames.forEach((eventName) => {
      chart.on(eventName, (...args) => {
        eventsRef.current?.[eventName]?.(...args)
      })
    })

    const resize = () => chart.resize()
    const observer = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(resize)

    observer?.observe(containerRef.current)
    window.addEventListener('resize', resize)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current || !option) return
    chartRef.current.setOption(option, true)
    chartRef.current.resize()
  }, [option])

  return <div ref={containerRef} className={`echart ${className}`.trim()} />
}

export default EChart
