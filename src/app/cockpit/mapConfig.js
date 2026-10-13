/**
 * @file 驾驶舱地图配置：省/市资源与 unitCode 映射
 * @description 省份由登录 unitCode 推导（见 provinceConfig.js），此处按当前省派生各类映射。
 */
import {
  ACTIVE_PROVINCE,
  ALL_PROVINCE_SCOPES,
  COUNTRY_MAP_URL,
  COUNTRY_OUTLINE_URL,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  DRILLABLE_PROVINCE_SCOPES,
  getProvinceScope,
  isCountryUnitCode,
  IS_MUNICIPALITY,
  PROVINCE_CAPITAL_SHORT_NAME,
  PROVINCE_CITIES,
  PROVINCE_MAP_URL,
  PROVINCE_OUTLINE_URL,
  toProvinceAdcode,
} from './provinceConfig'

/** 全国所有地市（中央账号可跨省下钻，故索引不限于登录省） */
const ALL_CITIES = ALL_PROVINCE_SCOPES.flatMap((province) =>
  province.cities.map((city) => ({ ...city, provinceAdcode: province.adcode })),
)

/** 地市 unitCode → GeoJSON 区域全称 */
export const CITY_UNIT_CODE_TO_NAME = Object.freeze(
  Object.fromEntries(ALL_CITIES.map((city) => [city.adcode, city.name])),
)

/** 区域全称 → unitCode */
export const CITY_NAME_TO_UNIT_CODE = Object.freeze(
  Object.fromEntries(
    Object.entries(CITY_UNIT_CODE_TO_NAME).map(([code, name]) => [name, code]),
  ),
)

export const PROVINCE_UNIT_CODE = ACTIVE_PROVINCE.adcode
export const PROVINCE_REGION_NAME = ACTIVE_PROVINCE.name
export const PROVINCE_MAP_SLUG = ACTIVE_PROVINCE.slug

export {
  COUNTRY_MAP_URL,
  COUNTRY_OUTLINE_URL,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  getProvinceScope,
  isCountryUnitCode,
  IS_MUNICIPALITY,
  PROVINCE_CAPITAL_SHORT_NAME,
  PROVINCE_MAP_URL,
  PROVINCE_OUTLINE_URL,
}

/** 地市 → 市级地图 slug（public/maps/{slug}/） */
export const CITY_MAP_SLUG_BY_REGION = Object.freeze(
  Object.fromEntries(ALL_CITIES.map((city) => [city.name, city.slug])),
)

/** 省图 nameMap 简称 */
export const CITY_SHORT_NAME_MAP = Object.freeze(
  Object.fromEntries(ALL_CITIES.map((city) => [city.name, city.shortName])),
)

/** 全国图 nameMap 简称：省全称 → 简称 */
export const PROVINCE_SHORT_NAME_MAP = Object.freeze(
  Object.fromEntries(ALL_PROVINCE_SCOPES.map((p) => [p.name, p.shortName])),
)

/** 简称 / 全称 → 省全称 */
export const resolveProvinceFullName = (name) => {
  const text = String(name ?? '').trim()
  if (!text) return null
  if (PROVINCE_SHORT_NAME_MAP[text]) return text
  const entry = ALL_PROVINCE_SCOPES.find((p) => p.shortName === text)
  return entry?.name ?? null
}

/** @param {string} provinceName 省全称或简称 */
export const getProvinceMapAssets = (provinceName) => {
  const fullName = resolveProvinceFullName(provinceName)
  if (!fullName) return null
  const scope = ALL_PROVINCE_SCOPES.find((p) => p.name === fullName)
  if (!scope) return null
  return {
    regionName: scope.name,
    shortName: scope.shortName,
    adcode: scope.adcode,
    slug: scope.slug,
    unitCode: scope.adcode,
    isMunicipality: scope.isMunicipality,
    capitalShortName: scope.capitalShortName,
    mapURL: scope.mapURL,
    outlineURL: scope.outlineURL,
    cityShortNameMap: Object.freeze(
      Object.fromEntries(scope.cities.map((city) => [city.name, city.shortName])),
    ),
  }
}

/** 全国图上可下钻的省份（有下辖市县数据） */
export const isDrillableProvince = (name) => {
  const fullName = resolveProvinceFullName(name)
  if (!fullName) return false
  return DRILLABLE_PROVINCE_SCOPES.some((p) => p.name === fullName)
}

/** 地市所属省 adcode */
export const getProvinceAdcodeOfCity = (cityName) => {
  const hit = ALL_CITIES.find((city) => city.name === cityName)
  return hit?.provinceAdcode ?? ''
}

/** 简称 / 全称 → 全称 */
export const resolveCityFullName = (name) => {
  const text = String(name ?? '').trim()
  if (!text) return null
  if (CITY_MAP_SLUG_BY_REGION[text]) return text
  const entry = Object.entries(CITY_SHORT_NAME_MAP).find(([, short]) => short === text)
  return entry?.[0] ?? null
}

export const getCityMapAssets = (regionName) => {
  const fullName = resolveCityFullName(regionName)
  const slug = fullName ? CITY_MAP_SLUG_BY_REGION[fullName] : null
  if (!fullName || !slug) return null
  const base = `/maps/${slug}/${slug}`
  return {
    regionName: fullName,
    slug,
    mapURL: `${base}.geojson`,
    outlineURL: `${base}lunkuo.geojson`,
    fallbackMapURL: `${base}.geojson`,
    unitCode: CITY_NAME_TO_UNIT_CODE[fullName] || '',
  }
}

export const isDrillableCity = (name) => Boolean(getCityMapAssets(name))

/** @deprecated 使用 isDrillableCity，保留以兼容场所总览页 */
export const isDrillableRegion = isDrillableCity

/** 可下钻的地市名称列表（与省图 GeoJSON 一致） */
export const DRILLABLE_REGION_NAMES = Object.freeze(PROVINCE_CITIES.map((city) => city.name))

/** unitCode 是否属于当前省 */
export const isUnitCodeInProvince = (unitCode) =>
  toProvinceAdcode(unitCode) === PROVINCE_UNIT_CODE

export const readRootUnitCode = () => {
  return PROVINCE_UNIT_CODE
}

export const readLoginUnitLevel = () => 2

export const formatUnitRegionLabel = (unitName) =>
  String(unitName ?? '')
    .replace(/纪委监委$/, '')
    .replace(/监委$/, '')
    .trim()

export const resolveCityNameFromUnit = (unitCode, unitName = '') => {
  const code = String(unitCode ?? '').trim()
  if (CITY_UNIT_CODE_TO_NAME[code]) return CITY_UNIT_CODE_TO_NAME[code]

  const label = formatUnitRegionLabel(unitName)
  const byName = resolveCityFullName(label)
  if (byName) return byName

  if (code.length >= 4) {
    const cityCode = `${code.slice(0, 4)}00`
    if (CITY_UNIT_CODE_TO_NAME[cityCode]) return CITY_UNIT_CODE_TO_NAME[cityCode]
  }
  // 直辖市无地市层，省内任意 unitCode 都归属省本身
  if (IS_MUNICIPALITY && isUnitCodeInProvince(code)) return PROVINCE_REGION_NAME
  return null
}

export const resolveCityUnitCode = (unitCode, cityName) => {
  const code = String(unitCode ?? '').trim()
  if (CITY_UNIT_CODE_TO_NAME[code]) return code
  if (code.length >= 4) {
    const cityCode = `${code.slice(0, 4)}00`
    if (CITY_UNIT_CODE_TO_NAME[cityCode]) return cityCode
  }
  if (IS_MUNICIPALITY && isUnitCodeInProvince(code)) return PROVINCE_UNIT_CODE
  return CITY_NAME_TO_UNIT_CODE[cityName] || code
}
