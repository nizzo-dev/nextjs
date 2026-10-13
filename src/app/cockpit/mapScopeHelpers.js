/**
 * @file 登录权限 → 驾驶舱地图初始层级
 * unitLevel: 1 中央（全国）/ 2 省 / 3 市 / 4 县；unitCode 如 520100 直接按市进入
 */
import {
  CITY_NAME_TO_UNIT_CODE,
  CITY_UNIT_CODE_TO_NAME,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  PROVINCE_REGION_NAME,
  PROVINCE_UNIT_CODE,
  formatUnitRegionLabel,
  isCountryUnitCode,
  readLoginUnitLevel,
  resolveCityNameFromUnit,
  resolveCityUnitCode,
} from './mapConfig'
import { getCountyMapAssets, resolveCountyByAdcode } from './countyMapConfig'

export const resolveLoginMapScope = () => {
  return {
    level: 'country',
    homeLevel: 'country',
    provinceName: null,
    provinceUnitCode: '',
    cityName: null,
    countyName: null,
    regionName: COUNTRY_REGION_NAME,
    unitCode: COUNTRY_UNIT_CODE,
    cityUnitCode: '',
  }
}

export const resolveCountyFromUnitCode = (unitCode) => {
  const county = resolveCountyByAdcode(unitCode)
  if (!county) return null
  const assets = getCountyMapAssets(county.cityName, county.countyName)
  if (!assets) return null
  return county
}

export {
  CITY_NAME_TO_UNIT_CODE,
  CITY_UNIT_CODE_TO_NAME,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  PROVINCE_REGION_NAME,
  PROVINCE_UNIT_CODE,
  formatUnitRegionLabel,
  isCountryUnitCode,
  readLoginUnitLevel,
  resolveCityNameFromUnit,
  resolveCityUnitCode,
}
