/**
 * @file 驾驶舱地图资源加载与注册缓存
 * @description 按需加载：仅当前层级 + 用户悬浮/点击意图时预取单块，不做全量空闲预取。
 */
import * as echarts from 'echarts'
import {
  COUNTRY_MAP_URL,
  COUNTRY_OUTLINE_URL,
  COUNTRY_REGION_NAME,
  getCityMapAssets,
  getProvinceMapAssets,
  PROVINCE_MAP_SLUG,
  PROVINCE_MAP_URL,
  PROVINCE_OUTLINE_URL,
  PROVINCE_REGION_NAME,
} from './mapConfig'
import { getCountyMapAssets } from './countyMapConfig'

// 注册名带省前缀，避免同一会话切换省份时命中上一省的缓存
const COUNTRY_MAP = 'country-china'
const COUNTRY_OUTLINE = 'country-china-outline'

/** @type {Map<string, Promise<{ mapName: string, outlineName: string }>>} */
const pending = new Map()

/** @type {Set<string>} */
const readyKeys = new Set()

const fetchJson = async (url, label) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${label}加载失败: ${res.status}`)
  return res.json()
}

export const getCountryMapIds = () => ({
  mapName: COUNTRY_MAP,
  outlineName: COUNTRY_OUTLINE,
})

export const getProvinceMapIds = (slug = PROVINCE_MAP_SLUG) => ({
  mapName: `province-${slug}`,
  outlineName: `province-${slug}-outline`,
})

export const getCityMapIds = (slug) => ({
  mapName: `city-${slug}`,
  outlineName: `city-${slug}-outline`,
})

export const getCountyMapIds = (adcode) => ({
  mapName: `county-${adcode}`,
  outlineName: `county-${adcode}-outline`,
})

export const isMapReady = (key) => readyKeys.has(key) || Boolean(echarts.getMap(key))

/**
 * 确保全国地图已拉取并 registerMap
 * @returns {Promise<{ mapName: string, outlineName: string }>}
 */
export const ensureCountryMap = () => {
  const key = 'country'
  const ids = getCountryMapIds()
  if (isMapReady(ids.mapName) && isMapReady(ids.outlineName)) {
    readyKeys.add(key)
    return Promise.resolve(ids)
  }
  if (pending.has(key)) return pending.get(key)

  const task = Promise.all([
    fetchJson(COUNTRY_MAP_URL, `${COUNTRY_REGION_NAME}地图`),
    fetchJson(COUNTRY_OUTLINE_URL, `${COUNTRY_REGION_NAME}轮廓`),
  ]).then(([geo, outline]) => {
    echarts.registerMap(ids.mapName, geo)
    echarts.registerMap(ids.outlineName, outline)
    readyKeys.add(key)
    pending.delete(key)
    return ids
  }).catch((err) => {
    pending.delete(key)
    throw err
  })

  pending.set(key, task)
  return task
}

/**
 * 确保省级地图已拉取并 registerMap
 * @param {string} [provinceName] 省全称/简称，缺省为登录省
 * @returns {Promise<{ mapName: string, outlineName: string, regionName: string, slug: string } | null>}
 */
export const ensureProvinceMap = (provinceName) => {
  const assets = provinceName ? getProvinceMapAssets(provinceName) : null
  if (provinceName && !assets) return Promise.resolve(null)

  const slug = assets?.slug || PROVINCE_MAP_SLUG
  const mapURL = assets?.mapURL || PROVINCE_MAP_URL
  const outlineURL = assets?.outlineURL || PROVINCE_OUTLINE_URL
  const regionName = assets?.regionName || PROVINCE_REGION_NAME

  const key = `province:${slug}`
  const ids = getProvinceMapIds(slug)
  if (isMapReady(ids.mapName) && isMapReady(ids.outlineName)) {
    readyKeys.add(key)
    return Promise.resolve({ ...ids, regionName, slug })
  }
  if (pending.has(key)) return pending.get(key)

  const task = Promise.all([
    fetchJson(mapURL, `${regionName}地图`),
    fetchJson(outlineURL, `${regionName}轮廓`),
  ]).then(([geo, outline]) => {
    echarts.registerMap(ids.mapName, geo)
    echarts.registerMap(ids.outlineName, outline)
    readyKeys.add(key)
    pending.delete(key)
    return { ...ids, regionName, slug }
  }).catch((err) => {
    pending.delete(key)
    throw err
  })

  pending.set(key, task)
  return task
}

/**
 * 确保某市地图已拉取并 registerMap
 * @param {string} regionName 全称或简称
 * @returns {Promise<{ mapName: string, outlineName: string, regionName: string, slug: string } | null>}
 */
export const ensureCityMap = (regionName) => {
  const assets = getCityMapAssets(regionName)
  if (!assets) return Promise.resolve(null)

  const key = `city:${assets.slug}`
  const ids = getCityMapIds(assets.slug)
  if (isMapReady(ids.mapName) && isMapReady(ids.outlineName)) {
    readyKeys.add(key)
    return Promise.resolve({ ...ids, regionName: assets.regionName, slug: assets.slug })
  }
  if (pending.has(key)) return pending.get(key)

  const task = Promise.all([
    fetchJson(assets.mapURL, `${assets.regionName}地图`),
    fetchJson(assets.outlineURL, `${assets.regionName}轮廓`),
  ]).then(([geo, outline]) => {
    echarts.registerMap(ids.mapName, geo)
    echarts.registerMap(ids.outlineName, outline)
    readyKeys.add(key)
    pending.delete(key)
    return { ...ids, regionName: assets.regionName, slug: assets.slug }
  }).catch((err) => {
    pending.delete(key)
    throw err
  })

  pending.set(key, task)
  return task
}

/**
 * 确保某县地图已拉取并 registerMap
 * @param {string} cityName
 * @param {string} countyName
 */
export const ensureCountyMap = (cityName, countyName) => {
  const assets = getCountyMapAssets(cityName, countyName)
  if (!assets) return Promise.resolve(null)

  const key = `county:${assets.adcode}`
  const ids = getCountyMapIds(assets.adcode)
  if (isMapReady(ids.mapName) && isMapReady(ids.outlineName)) {
    readyKeys.add(key)
    return Promise.resolve({
      ...ids,
      regionName: assets.regionName,
      cityName: assets.cityName,
      adcode: assets.adcode,
    })
  }
  if (pending.has(key)) return pending.get(key)

  const task = Promise.all([
    fetchJson(assets.mapURL, `${assets.regionName}地图`),
    fetchJson(assets.outlineURL, `${assets.regionName}轮廓`),
  ]).then(([geo, outline]) => {
    echarts.registerMap(ids.mapName, geo)
    echarts.registerMap(ids.outlineName, outline)
    readyKeys.add(key)
    pending.delete(key)
    return {
      ...ids,
      regionName: assets.regionName,
      cityName: assets.cityName,
      adcode: assets.adcode,
    }
  }).catch((err) => {
    pending.delete(key)
    throw err
  })

  pending.set(key, task)
  return task
}
