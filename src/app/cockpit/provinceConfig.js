/**
 * @file 驾驶舱地图的省级作用域解析
 * @description 按登录 unitCode 推导当前省份，并从全国地图清单派生市/县索引。
 * 省份在模块加载时解析一次；切换账号需重新加载页面（登录流程本身会跳转）。
 */
import chinaMapManifest from './chinaMapManifest.json'
import {
  COUNTRY_MAP_SLUG,
  COUNTRY_MAP_URL,
  COUNTRY_OUTLINE_URL,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  FALLBACK_PROVINCE_ADCODE,
  isCountryUnitCode,
  PROVINCE_BY_ADCODE,
  toProvinceAdcode,
} from './provinceSlugs'

/** 全国（中央）层，定义在 provinceSlugs 以便登录页等轻量模块复用 */
export {
  COUNTRY_MAP_SLUG,
  COUNTRY_MAP_URL,
  COUNTRY_OUTLINE_URL,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  isCountryUnitCode,
}

/** 自治州 / 地区类地市的展示简称，正则难以覆盖，集中维护 */
const CITY_SHORT_NAME_OVERRIDES = Object.freeze({
  黔西南布依族苗族自治州: '黔西南',
  黔东南苗族侗族自治州: '黔东南',
  黔南布依族苗族自治州: '黔南',
  恩施土家族苗族自治州: '恩施',
  湘西土家族苗族自治州: '湘西',
  阿坝藏族羌族自治州: '阿坝',
  甘孜藏族自治州: '甘孜',
  凉山彝族自治州: '凉山',
  临夏回族自治州: '临夏',
  甘南藏族自治州: '甘南',
  延边朝鲜族自治州: '延边',
  楚雄彝族自治州: '楚雄',
  红河哈尼族彝族自治州: '红河',
  文山壮族苗族自治州: '文山',
  西双版纳傣族自治州: '西双版纳',
  大理白族自治州: '大理',
  德宏傣族景颇族自治州: '德宏',
  怒江傈僳族自治州: '怒江',
  迪庆藏族自治州: '迪庆',
  海北藏族自治州: '海北',
  黄南藏族自治州: '黄南',
  海南藏族自治州: '海南州',
  果洛藏族自治州: '果洛',
  玉树藏族自治州: '玉树',
  海西蒙古族藏族自治州: '海西',
  昌吉回族自治州: '昌吉',
  博尔塔拉蒙古自治州: '博尔塔拉',
  巴音郭楞蒙古自治州: '巴音郭楞',
  克孜勒苏柯尔克孜自治州: '克州',
  伊犁哈萨克自治州: '伊犁',
})

/** @param {string} name */
const toShortName = (name) => {
  if (CITY_SHORT_NAME_OVERRIDES[name]) return CITY_SHORT_NAME_OVERRIDES[name]
  const short = String(name || '').replace(/(市|地区|盟|特别行政区)$/, '')
  return short || name
}

/** 省级简称，正则难以覆盖自治区/特区，集中维护 */
const PROVINCE_SHORT_NAME_OVERRIDES = Object.freeze({
  内蒙古自治区: '内蒙古',
  广西壮族自治区: '广西',
  西藏自治区: '西藏',
  宁夏回族自治区: '宁夏',
  新疆维吾尔自治区: '新疆',
  香港特别行政区: '香港',
  澳门特别行政区: '澳门',
})

/** @param {string} name */
const toProvinceShortName = (name) => {
  if (PROVINCE_SHORT_NAME_OVERRIDES[name]) return PROVINCE_SHORT_NAME_OVERRIDES[name]
  const short = String(name || '').replace(/(省|市)$/, '')
  return short || name
}

/** adcode → 省信息（以 provinceSlugs 为准，覆盖清单外的省份） */
const provinceByAdcode = new Map(
  Object.entries(PROVINCE_BY_ADCODE).map(([adcode, prov]) => [adcode, { adcode, ...prov }]),
)
/** 省 adcode → 该省下辖地市（按 manifest 顺序） */
const citiesByProvince = new Map()

Object.keys(chinaMapManifest.provinces || {}).forEach((name) => {
  const adcode = String(chinaMapManifest.provinces[name].adcode)
  citiesByProvince.set(adcode, [])
})

Object.entries(chinaMapManifest.cities || {}).forEach(([name, city]) => {
  const province = chinaMapManifest.provinces?.[city.province]
  if (!province) return
  const provinceAdcode = String(province.adcode)
  citiesByProvince.get(provinceAdcode)?.push({
    name,
    adcode: String(city.adcode),
    slug: city.slug,
    counties: Array.isArray(city.counties) ? city.counties : [],
  })
})

export { toProvinceAdcode }

/**
 * 保留全国省级资源索引；驾驶舱首屏由 mock scope 从全国地图开始。
 */
const resolveActiveProvince = () => {
  const fallback =
    provinceByAdcode.get(FALLBACK_PROVINCE_ADCODE) ||
    provinceByAdcode.values().next().value
  return { ...fallback, source: 'mock' }
}

const active = resolveActiveProvince()

/** 登录用户所属省份：{ name, adcode, slug, source } */
export const ACTIVE_PROVINCE = Object.freeze(active)

const buildCities = (provinceAdcode) =>
  Object.freeze(
    (citiesByProvince.get(provinceAdcode) || []).map((city) =>
      Object.freeze({
        name: city.name,
        adcode: city.adcode,
        slug: city.slug,
        shortName: toShortName(city.name),
        counties: Object.freeze(
          city.counties.map((c) => Object.freeze({ name: c.name, adcode: String(c.adcode) })),
        ),
      }),
    ),
  )

/**
 * 直辖市 / 特别行政区：清单里没有独立地市，下级直接是区县。
 * 此时把「省」同时当作唯一的「市」，使省→市→县三级模型继续成立。
 */
const isMunicipalityOf = (province, cities) =>
  cities.length === 1 && cities[0].name === province.name && cities[0].slug === province.slug

/** @type {Map<string, Readonly<object>>} */
const scopeCache = new Map()

/**
 * 取某省的地图作用域。全国层下钻到任意省时使用。
 * @param {string|number} provinceAdcode
 */
export const getProvinceScope = (provinceAdcode) => {
  const adcode = toProvinceAdcode(provinceAdcode)
  if (scopeCache.has(adcode)) return scopeCache.get(adcode)

  const province = provinceByAdcode.get(adcode)
  if (!province) return null

  const cities = buildCities(adcode)
  const scope = Object.freeze({
    ...province,
    cities,
    isMunicipality: isMunicipalityOf(province, cities),
    shortName: toProvinceShortName(province.name),
    capitalShortName: cities[0]?.shortName || '',
    mapURL: `/maps/${province.slug}/${province.slug}.geojson`,
    outlineURL: `/maps/${province.slug}/${province.slug}lunkuo.geojson`,
  })
  scopeCache.set(adcode, scope)
  return scope
}

/** 全部省份作用域（按 adcode 升序），全国图下钻用 */
export const ALL_PROVINCE_SCOPES = Object.freeze(
  [...provinceByAdcode.keys()]
    .sort()
    .map((adcode) => getProvinceScope(adcode))
    .filter(Boolean),
)

/** 有下辖市县数据、可从全国图下钻的省份 */
export const DRILLABLE_PROVINCE_SCOPES = Object.freeze(
  ALL_PROVINCE_SCOPES.filter((p) => p.cities.length > 0),
)

const activeScope = getProvinceScope(active.adcode)

export const IS_MUNICIPALITY = activeScope?.isMunicipality ?? false

/** 当前省下辖地市（含直辖市自身） */
export const PROVINCE_CITIES = activeScope?.cities ?? Object.freeze([])

/** 省会（清单首个地市），用于省图默认高亮 */
export const PROVINCE_CAPITAL_SHORT_NAME = activeScope?.capitalShortName || ''

/** 省级地图资源路径 */
export const PROVINCE_MAP_URL = activeScope?.mapURL || ''
export const PROVINCE_OUTLINE_URL = activeScope?.outlineURL || ''
