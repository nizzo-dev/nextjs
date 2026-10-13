/**
 * @file 省级行政区 → 地图资源目录（public/maps/{slug}/）
 * @description 轻量映射表，登录页预取可直接引用，无需加载完整地图清单。
 * 与 chinaMapManifest.json 中的 slug 保持一致，由 scripts/download-china-maps.mjs 生成。
 */

/** @type {Readonly<Record<string, { name: string, slug: string }>>} */
export const PROVINCE_BY_ADCODE = Object.freeze({
  '110000': { name: '北京市', slug: 'beijing' },
  '120000': { name: '天津市', slug: 'tianjin' },
  '130000': { name: '河北省', slug: 'hebei' },
  '140000': { name: '山西省', slug: 'shanxi' },
  '150000': { name: '内蒙古自治区', slug: 'neimenggu' },
  '210000': { name: '辽宁省', slug: 'liaoning' },
  '220000': { name: '吉林省', slug: 'jilin' },
  '230000': { name: '黑龙江省', slug: 'heilongjiang' },
  '310000': { name: '上海市', slug: 'shanghai' },
  '320000': { name: '江苏省', slug: 'jiangsu' },
  '330000': { name: '浙江省', slug: 'zhejiang' },
  '340000': { name: '安徽省', slug: 'anhui' },
  '350000': { name: '福建省', slug: 'fujian' },
  '360000': { name: '江西省', slug: 'jiangxi' },
  '370000': { name: '山东省', slug: 'shandong' },
  '410000': { name: '河南省', slug: 'henan' },
  '420000': { name: '湖北省', slug: 'hubei' },
  '430000': { name: '湖南省', slug: 'hunan' },
  '440000': { name: '广东省', slug: 'guangdong' },
  '450000': { name: '广西壮族自治区', slug: 'guangxi' },
  '460000': { name: '海南省', slug: 'hainan' },
  '500000': { name: '重庆市', slug: 'chongqing' },
  '510000': { name: '四川省', slug: 'sichuan' },
  '520000': { name: '贵州省', slug: 'guizhou' },
  '530000': { name: '云南省', slug: 'yunnan' },
  '540000': { name: '西藏自治区', slug: 'xizang' },
  '610000': { name: '陕西省', slug: 'shaanxi' },
  '620000': { name: '甘肃省', slug: 'gansu' },
  '630000': { name: '青海省', slug: 'qinghai' },
  '640000': { name: '宁夏回族自治区', slug: 'ningxia' },
  '650000': { name: '新疆维吾尔自治区', slug: 'xinjiang' },
  '710000': { name: '台湾省', slug: 'taiwan' },
  '810000': { name: '香港特别行政区', slug: 'hongkong' },
  '820000': { name: '澳门特别行政区', slug: 'macao' },
})

/** 未登录 / unitCode 异常时的兜底省份 */
export const FALLBACK_PROVINCE_ADCODE = '520000'

/** 由任意行政区划码取所属省 adcode（前两位 + 0000） */
export const toProvinceAdcode = (code) => {
  const text = String(code ?? '').trim()
  if (text.length < 2) return ''
  return `${text.slice(0, 2)}0000`
}

/** @param {string|number} unitCode @returns {{ adcode: string, name: string, slug: string } | null} */
export const getProvinceByUnitCode = (unitCode) => {
  const adcode = toProvinceAdcode(unitCode)
  const hit = PROVINCE_BY_ADCODE[adcode]
  return hit ? { adcode, ...hit } : null
}

/** @param {string} [slug] @returns {{ mapURL: string, outlineURL: string } | null} */
export const getProvinceMapURLs = (slug) =>
  slug
    ? {
        mapURL: `/maps/${slug}/${slug}.geojson`,
        outlineURL: `/maps/${slug}/${slug}lunkuo.geojson`,
      }
    : null

/** 中央（全国）单位编码与地图资源 */
export const COUNTRY_UNIT_CODE = '000000'
export const COUNTRY_REGION_NAME = '全国'
export const COUNTRY_MAP_SLUG = 'china'
export const COUNTRY_MAP_URL = '/maps/china/china.geojson'
export const COUNTRY_OUTLINE_URL = '/maps/china/chinalunkuo.geojson'

/** 全 0 编码统一视作中央，兼容 '0' / '000000' 等写法 */
export const isCountryUnitCode = (unitCode) => {
  const text = String(unitCode ?? '').trim()
  return text.length > 0 && /^0+$/.test(text)
}

export const getCountryMapURLs = () => ({
  mapURL: COUNTRY_MAP_URL,
  outlineURL: COUNTRY_OUTLINE_URL,
})
