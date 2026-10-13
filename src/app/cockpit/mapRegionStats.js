/**
 * @file 地图地区统计：getRegionListCount → 散点数据
 */
import {
  formatUnitRegionLabel,
  isCountryUnitCode,
  PROVINCE_UNIT_CODE,
  resolveCityFullName,
  resolveProvinceFullName,
} from './mapConfig'
import mapRegionCenters from './mapRegionCenters.json'

/** 省名 → 省 adcode，全国层按省取点 */
const provinceIndex = mapRegionCenters.provinceIndex || {}

/**
 * 取某省的「区域名 → adcode」索引，规避全国重名区县。
 * 传中央编码时用省名索引。
 */
const nameIndexOf = (provinceAdcode) => {
  const code = String(provinceAdcode ?? '').trim()
  if (!code || isCountryUnitCode(code)) return provinceIndex
  return mapRegionCenters.nameIndex?.[code] || {}
}

/** @param {string|number} adcode */
const centerByAdcode = (adcode) => {
  const code = String(adcode ?? '').trim()
  if (!code) return null
  return mapRegionCenters.cities?.[code] || mapRegionCenters.counties?.[code] || null
}

/** Tab → 指标字段 */
export const MAP_METRIC_BY_TAB = Object.freeze({
  venues: 'recordCount',
  participants: 'personnelCount',
  subjects: 'interlocutor',
})

const normalizeRegionName = (region) => formatUnitRegionLabel(region)

const matchRegionName = (apiRegion, targetName) => {
  const a = normalizeRegionName(apiRegion)
  const b = String(targetName ?? '').trim()
  if (!a || !b) return false
  if (a === b) return true
  const fullA = resolveCityFullName(a) || resolveProvinceFullName(a)
  const fullB = resolveCityFullName(b) || resolveProvinceFullName(b)
  if (fullA && fullB && fullA === fullB) return true
  return a.includes(b) || b.includes(a)
}

/** 在统计树中按区域名 / unitCode 深度查找节点 */
const findRegionNode = (node, name, unitCode) => {
  if (!node || typeof node !== 'object') return null
  const code = String(unitCode ?? '').trim()
  if ((code && String(node.unitCode ?? '') === code) || (name && matchRegionName(node.region, name))) {
    return node
  }
  for (const child of Array.isArray(node.subList) ? node.subList : []) {
    const hit = findRegionNode(child, name, unitCode)
    if (hit) return hit
  }
  return null
}

const toCount = (value) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

/**
 * @param {string} name 区域名（全称或简称）
 * @param {string|number} [unitCode] 接口 unitCode，优先按 adcode 精确匹配
 * @param {string} [provinceAdcode] 当前地图所属省；传全国码则按省名查
 */
export const getRegionCenter = (name, unitCode, provinceAdcode = PROVINCE_UNIT_CODE) => {
  const index = nameIndexOf(provinceAdcode)
  const isCountry = isCountryUnitCode(provinceAdcode)
  const label = normalizeRegionName(name)
  const fullName = isCountry
    ? resolveProvinceFullName(label) || resolveProvinceFullName(name)
    : resolveCityFullName(label)

  const center =
    centerByAdcode(unitCode) ||
    centerByAdcode(index[fullName || label]) ||
    centerByAdcode(index[name])
  if (!Array.isArray(center) || center.length < 2) return null
  const lng = Number(center[0])
  const lat = Number(center[1])
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null
  return [lng, lat]
}

/**
 * 取当前地图层级下应展示的子节点列表
 * @param {object|null} tree getRegionListCount data 根节点
 * @param {{ level: string, cityName?: string|null, countyName?: string|null, unitCode?: string, cityUnitCode?: string }} scope
 */
export const getRegionChildrenForScope = (tree, scope) => {
  if (!tree || typeof tree !== 'object') return []
  const rootChildren = Array.isArray(tree.subList) ? tree.subList : []

  // 全国层：根节点子级即为各省
  if (scope.level === 'country') return rootChildren

  if (scope.level === 'province') {
    // 中央账号的树根是全国，需先定位到省节点；省级账号的树根即该省
    const node = findRegionNode(tree, scope.provinceName, scope.provinceUnitCode)
    if (node && node !== tree) return Array.isArray(node.subList) ? node.subList : []
    return rootChildren
  }

  if (scope.level === 'city') {
    const cityCode = String(scope.cityUnitCode || scope.unitCode || '')
    const city = findRegionNode(tree, scope.cityName, cityCode)
    if (city && city !== tree) return Array.isArray(city.subList) ? city.subList : []

    // 接口按权限直接返回市级根节点时
    if (
      matchRegionName(tree.region, scope.cityName) ||
      String(tree.unitCode ?? '') === cityCode
    ) {
      return rootChildren
    }
    return []
  }

  return []
}

/**
 * @param {Array} children
 * @param {'venues'|'participants'|'subjects'} activeTab
 * @param {string} [provinceAdcode] 当前地图所属省；全国层传中央编码
 * @returns {Array<{ name: string, value: [number, number, number], unitCode: string }>}
 */
export const buildMapPointsFromRegions = (
  children,
  activeTab = 'venues',
  provinceAdcode = PROVINCE_UNIT_CODE,
) => {
  const metricKey = MAP_METRIC_BY_TAB[activeTab] || MAP_METRIC_BY_TAB.venues
  const list = Array.isArray(children) ? children : []

  return list
    .map((item) => {
      const name = normalizeRegionName(item?.region)
      if (!name) return null
      const center = getRegionCenter(name, item?.unitCode, provinceAdcode)
      if (!center) return null
      const count = toCount(item?.[metricKey])
      // 数量为 0 不展示点位与悬浮卡片
      if (count <= 0) return null
      return {
        name,
        unitCode: String(item?.unitCode ?? ''),
        value: [center[0], center[1], count],
      }
    })
    .filter(Boolean)
}
