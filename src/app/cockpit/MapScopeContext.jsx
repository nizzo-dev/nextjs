/**
 * @file 驾驶舱地图下钻范围（全国 / 省 / 市 / 县）与登录权限联动
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  getCityMapAssets,
  getProvinceAdcodeOfCity,
  getProvinceMapAssets,
  PROVINCE_REGION_NAME,
  PROVINCE_UNIT_CODE,
} from './mapConfig'
import { getCountyMapAssets } from './countyMapConfig'
import { resolveLoginMapScope } from './mapScopeHelpers'

const MapScopeContext = createContext(null)

const LEVEL_RANK = { country: 0, province: 1, city: 2, county: 3 }

export function MapScopeProvider({ children }) {
  const [scope, setScope] = useState(() => resolveLoginMapScope())

  const homeLevel = scope.homeLevel || 'province'
  const canGoCountry = LEVEL_RANK[homeLevel] <= LEVEL_RANK.country
  const canGoProvince = LEVEL_RANK[homeLevel] <= LEVEL_RANK.province
  const canGoCity = LEVEL_RANK[homeLevel] <= LEVEL_RANK.city

  const drillToProvince = useCallback((provinceName) => {
    const assets = getProvinceMapAssets(provinceName)
    if (!assets) return false
    setScope((prev) => {
      // 非中央账号不可横向切省
      if (prev.homeLevel !== 'country' && prev.provinceName !== assets.regionName) return prev
      return {
        ...prev,
        level: 'province',
        regionName: assets.regionName,
        provinceName: assets.regionName,
        provinceUnitCode: assets.unitCode,
        cityName: null,
        countyName: null,
        unitCode: assets.unitCode,
        cityUnitCode: '',
      }
    })
    return true
  }, [])

  const drillToCity = useCallback((regionName) => {
    const assets = getCityMapAssets(regionName)
    if (!assets) return false
    setScope((prev) => {
      // 市级账号不可切到别的市
      if (prev.homeLevel === 'city' && prev.cityName && prev.cityName !== assets.regionName) {
        return prev
      }
      if (prev.homeLevel === 'county') return prev
      const provinceAdcode = getProvinceAdcodeOfCity(assets.regionName)
      // 省级及以下账号不可跨省下钻
      if (
        prev.homeLevel !== 'country' &&
        provinceAdcode &&
        prev.provinceUnitCode &&
        provinceAdcode !== prev.provinceUnitCode
      ) {
        return prev
      }
      return {
        ...prev,
        level: 'city',
        regionName: assets.regionName,
        cityName: assets.regionName,
        countyName: null,
        provinceUnitCode: provinceAdcode || prev.provinceUnitCode,
        provinceName: prev.provinceName,
        unitCode: assets.unitCode || prev.cityUnitCode || prev.unitCode,
        cityUnitCode: assets.unitCode || prev.cityUnitCode,
      }
    })
    return true
  }, [])

  const drillToCounty = useCallback((cityName, countyName) => {
    const assets = getCountyMapAssets(cityName, countyName)
    if (!assets) return false
    setScope((prev) => {
      if (prev.homeLevel === 'county' && prev.countyName && prev.countyName !== countyName) {
        return prev
      }
      if (prev.homeLevel === 'city' && prev.cityName && prev.cityName !== cityName) {
        return prev
      }
      return {
        ...prev,
        level: 'county',
        regionName: assets.regionName,
        cityName: assets.cityName,
        countyName: assets.regionName,
        unitCode: assets.unitCode,
        cityUnitCode: prev.cityUnitCode || getCityMapAssets(assets.cityName)?.unitCode || '',
      }
    })
    return true
  }, [])

  const backToCity = useCallback(() => {
    setScope((prev) => {
      if (LEVEL_RANK[prev.homeLevel] > LEVEL_RANK.city) return prev
      if (!prev.cityName) return prev
      const cityAssets = getCityMapAssets(prev.cityName)
      // 直辖市的「市」即省本身，回退直接落到省级，避免出现同图两级
      if (cityAssets && getProvinceMapAssets(prev.cityName)?.isMunicipality) {
        return {
          ...prev,
          level: 'province',
          regionName: prev.provinceName || PROVINCE_REGION_NAME,
          countyName: null,
        }
      }
      return {
        ...prev,
        level: 'city',
        regionName: prev.cityName,
        countyName: null,
        unitCode: prev.cityUnitCode || cityAssets?.unitCode || prev.unitCode,
      }
    })
  }, [])

  const backToProvince = useCallback(() => {
    setScope((prev) => {
      if (LEVEL_RANK[prev.homeLevel] > LEVEL_RANK.province) return prev
      const provinceName = prev.provinceName || PROVINCE_REGION_NAME
      const provinceUnitCode = prev.provinceUnitCode || PROVINCE_UNIT_CODE
      return {
        ...prev,
        level: 'province',
        regionName: provinceName,
        provinceName,
        provinceUnitCode,
        cityName: null,
        countyName: null,
        unitCode: provinceUnitCode,
        cityUnitCode: '',
      }
    })
  }, [])

  const backToCountry = useCallback(() => {
    setScope((prev) => {
      if (LEVEL_RANK[prev.homeLevel] > LEVEL_RANK.country) return prev
      return {
        ...prev,
        level: 'country',
        regionName: COUNTRY_REGION_NAME,
        provinceName: null,
        provinceUnitCode: '',
        cityName: null,
        countyName: null,
        unitCode: COUNTRY_UNIT_CODE,
        cityUnitCode: '',
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      scope,
      homeLevel,
      canGoCountry,
      canGoProvince,
      canGoCity,
      drillToProvince,
      drillToCity,
      drillToCounty,
      backToCountry,
      backToCity,
      backToProvince,
      isCountry: scope.level === 'country',
      isProvince: scope.level === 'province',
      isCity: scope.level === 'city',
      isCounty: scope.level === 'county',
    }),
    [
      scope,
      homeLevel,
      canGoCountry,
      canGoProvince,
      canGoCity,
      drillToProvince,
      drillToCity,
      drillToCounty,
      backToCountry,
      backToCity,
      backToProvince,
    ],
  )

  return (
    <MapScopeContext.Provider value={value}>{children}</MapScopeContext.Provider>
  )
}

export function useMapScope() {
  const ctx = useContext(MapScopeContext)
  if (!ctx) {
    throw new Error('useMapScope must be used within MapScopeProvider')
  }
  return ctx
}
