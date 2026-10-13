/**
 * @file 县区地图资源配置
 * 数据：provinceConfig（全国地市/区县清单）+ public/maps/{citySlug}/counties/{adcode}.geojson
 * 索引覆盖全国：中央账号可从全国图下钻到任意省市县。
 */
import { ALL_PROVINCE_SCOPES } from './provinceConfig'
import { CITY_MAP_SLUG_BY_REGION } from './mapConfig'

/** 市名 → { 县名 → adcode } */
const countyAdcodeByCity = new Map()
/** 县 adcode → { cityName, countyName } */
const countyByAdcode = new Map()
/** 市名 → [{ name, adcode }]，保持原有对外结构 */
const countiesByCity = {}

ALL_PROVINCE_SCOPES.flatMap((province) => province.cities).forEach((city) => {
  const index = new Map()
  const list = []
  city.counties.forEach(({ name, adcode }) => {
    const code = Number(adcode)
    index.set(name, code)
    countyByAdcode.set(String(adcode), { cityName: city.name, countyName: name, adcode: code })
    list.push({ name, adcode: code })
  })
  countyAdcodeByCity.set(city.name, index)
  countiesByCity[city.name] = list
})

/** @param {string} cityName */
export const getCountiesForCity = (cityName) => countiesByCity[cityName] || []

/** @param {string} cityName @param {string} countyName */
export const isCountyInCity = (cityName, countyName) => {
  const index = countyAdcodeByCity.get(cityName)
  return index ? index.has(countyName) : false
}

/**
 * @param {string} cityName
 * @param {string} countyName
 */
export const getCountyMapAssets = (cityName, countyName) => {
  const citySlug = CITY_MAP_SLUG_BY_REGION[cityName]
  const adcode = countyAdcodeByCity.get(cityName)?.get(countyName)
  if (!citySlug || !adcode) return null

  const base = `/maps/${citySlug}/counties/${adcode}`
  return {
    cityName,
    regionName: countyName,
    adcode,
    unitCode: String(adcode),
    mapURL: `${base}.geojson`,
    outlineURL: `${base}lunkuo.geojson`,
  }
}

/** @param {string|number} unitCode */
export const resolveCountyByAdcode = (unitCode) => {
  const code = String(unitCode ?? '').trim()
  if (!code) return null
  const hit = countyByAdcode.get(code)
  if (!hit) return null
  if (!getCountyMapAssets(hit.cityName, hit.countyName)) return null
  return { cityName: hit.cityName, countyName: hit.countyName, adcode: hit.adcode }
}
