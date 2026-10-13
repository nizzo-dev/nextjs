/**
 * @file 驾驶舱面板数据缓存（内存 + sessionStorage）
 * @description 请求成功后写入；下次进入同 unitCode 先读缓存再静默刷新。
 */

const memory = new Map()
const PREFIX = 'cockpit:swr:v1:'

export function buildCockpitCacheKey(name, params = {}) {
  const unitCode = params.unitCode ?? ''
  const userId = params.userId ?? ''
  return `${PREFIX}${name}|${unitCode}|${userId}`
}

export function getCockpitCache(key) {
  if (!key) return undefined
  if (memory.has(key)) return memory.get(key)
  try {
    const raw = sessionStorage.getItem(key)
    if (raw == null) return undefined
    const parsed = JSON.parse(raw)
    memory.set(key, parsed)
    return parsed
  } catch {
    return undefined
  }
}

export function setCockpitCache(key, value) {
  if (!key) return
  memory.set(key, value)
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota / private mode：仅保留内存缓存
  }
}

/** 读取缓存；无则返回 fallback（支持函数） */
export function readCockpitCache(name, params, fallback) {
  const cached = getCockpitCache(buildCockpitCacheKey(name, params))
  if (cached !== undefined) return cached
  return typeof fallback === 'function' ? fallback() : fallback
}
