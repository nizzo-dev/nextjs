/**
 * @file 驾驶舱 SWR：先缓存后请求
 */
import { useEffect, useRef, useState } from 'react'
import {
  buildCockpitCacheKey,
  getCockpitCache,
  setCockpitCache,
} from './cockpitDataCache'

const identity = (v) => v

/**
 * @param {string} cacheName 缓存命名空间
 * @param {{ userId?: string, unitCode?: string }} params
 * @param {(params: object, config: { signal: AbortSignal }) => Promise<{ data?: any }>} fetcher
 * @param {{ select?: (payload: any) => any, fallback?: any }} [options]
 *   select: 将接口 data 映射为组件 state；fallback: 无缓存时的初始值（可为函数）
 */
export function useCockpitSWR(cacheName, params, fetcher, options = {}) {
  const { select = identity, fallback } = options
  const selectRef = useRef(select)
  const fetcherRef = useRef(fetcher)
  selectRef.current = select
  fetcherRef.current = fetcher

  const resolveFallback = () =>
    typeof fallback === 'function' ? fallback() : fallback

  const [data, setData] = useState(() => {
    const key = buildCockpitCacheKey(cacheName, params)
    const cached = getCockpitCache(key)
    if (cached !== undefined) return select(cached)
    return resolveFallback()
  })

  useEffect(() => {
    const key = buildCockpitCacheKey(cacheName, params)
    const cached = getCockpitCache(key)
    if (cached !== undefined) {
      setData(selectRef.current(cached))
    } else {
      setData(resolveFallback())
    }

    const controller = new AbortController()
    let cancelled = false

    const run = async () => {
      try {
        const res = await fetcherRef.current(params, { signal: controller.signal })
        if (cancelled) return
        const payload = res?.data
        setCockpitCache(key, payload)
        setData(selectRef.current(payload))
      } catch (err) {
        if (cancelled || err?.name === 'AbortError') return
        if (getCockpitCache(key) === undefined) {
          setData(resolveFallback())
        }
      }
    }

    run()
    return () => {
      cancelled = true
      controller.abort()
    }
    // params.unitCode / userId 变化时重拉；fetcher/select 用 ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheName, params.unitCode, params.userId])

  return data
}
