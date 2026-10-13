/**
 * @file 省级场所地图（三 Tab 共用，支持省→市→县下钻）
 * @description 外轮廓挤出 3D、市州/区县标注、菱形点位；下钻联动 unitCode；登录权限限制初始层级与返回。
 */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EChart from '../../../../components/common/EChart'
import { GET_REGION_LIST_COUNT } from '../../mockData'
import { useMapScope } from '../../MapScopeContext'
import { useCockpitQueryParams } from '../../hooks/useCockpitQueryParams'
import {
  CITY_SHORT_NAME_MAP,
  COUNTRY_REGION_NAME,
  COUNTRY_UNIT_CODE,
  getProvinceMapAssets,
  IS_MUNICIPALITY,
  isDrillableCity,
  isDrillableProvince,
  PROVINCE_CAPITAL_SHORT_NAME,
  PROVINCE_MAP_SLUG,
  PROVINCE_REGION_NAME,
  PROVINCE_SHORT_NAME_MAP,
  PROVINCE_UNIT_CODE,
  resolveCityFullName,
  resolveProvinceFullName,
} from '../../mapConfig'
import { isCountyInCity } from '../../countyMapConfig'
import {
  ensureCityMap,
  ensureCountryMap,
  ensureCountyMap,
  ensureProvinceMap,
} from '../../mapPreload'
import {
  buildMapPointsFromRegions,
  getRegionChildrenForScope,
} from '../../mapRegionStats'

const PROVINCE_MAP = `province-${PROVINCE_MAP_SLUG}`
const PROVINCE_OUTLINE = `province-${PROVINCE_MAP_SLUG}-outline`

const TRANSITION_MS = 480
const ENTER_MS = 560
const TRANSITION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const waitMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const cancelElAnimations = (el) => {
  if (!el) return
  el.getAnimations?.().forEach((anim) => anim.cancel())
}

const animateEl = (el, keyframes, duration) => {
  if (!el?.animate) return Promise.resolve()
  cancelElAnimations(el)
  return el
    .animate(keyframes, {
      duration,
      easing: TRANSITION_EASE,
      fill: 'forwards',
    })
    .finished.catch(() => undefined)
}

const LEVEL_RANK = { country: 0, province: 1, city: 2, county: 3 }

/** 各 Tab 地图气泡文案与主题色（场所绿 / 人员蓝 / 对象橙） */
const MAP_TIP_CONFIG = {
  venues: {
    prefix: '谈话场次',
    theme: {
      ring: 'rgba(0, 255, 220, 0.75)',
      ringShadow: 'rgba(0, 255, 210, 0.45)',
      ripple: 'rgba(0, 255, 200, 0.45)',
      diamond: ['#e8fff8', '#5fffd4', '#00e8a8', '#00a868'],
      diamondShadow: 'rgba(0, 255, 190, 0.9)',
      diamondBorder: 'rgba(200, 255, 240, 0.95)',
      tipColor: '#7fffff',
      tipBg: 'rgba(2, 28, 42, 0.82)',
      tipBorder: 'rgba(0, 255, 220, 0.9)',
      tipShadow: 'rgba(0, 255, 220, 0.55)',
    },
  },
  participants: {
    prefix: '谈话人员',
    theme: {
      ring: 'rgba(64, 180, 255, 0.8)',
      ringShadow: 'rgba(40, 150, 255, 0.5)',
      ripple: 'rgba(64, 180, 255, 0.5)',
      diamond: ['#e8f6ff', '#7ec8ff', '#3aa0ff', '#1568d8'],
      diamondShadow: 'rgba(40, 160, 255, 0.9)',
      diamondBorder: 'rgba(180, 220, 255, 0.95)',
      tipColor: '#9ad8ff',
      tipBg: 'rgba(2, 20, 48, 0.85)',
      tipBorder: 'rgba(64, 180, 255, 0.9)',
      tipShadow: 'rgba(40, 160, 255, 0.55)',
    },
  },
  subjects: {
    prefix: '谈话对象',
    theme: {
      ring: 'rgba(255, 170, 60, 0.8)',
      ringShadow: 'rgba(255, 140, 40, 0.5)',
      ripple: 'rgba(255, 170, 60, 0.5)',
      diamond: ['#fff4e8', '#ffc878', '#ff9a30', '#e06810'],
      diamondShadow: 'rgba(255, 150, 40, 0.9)',
      diamondBorder: 'rgba(255, 220, 180, 0.95)',
      tipColor: '#ffd090',
      tipBg: 'rgba(36, 20, 8, 0.85)',
      tipBorder: 'rgba(255, 170, 60, 0.9)',
      tipShadow: 'rgba(255, 140, 40, 0.55)',
    },
  },
}

const EXTRUDE_LAYERS = 6
const EXTRUDE_STEP = 0.42

const DIAMOND_SYMBOL =
  'path://M12 0 L21 11 L12 15 L3 11 Z M12 15 L21 11 L12 28 L3 11 Z M11.2 28 L12.8 28 L12.8 38 L11.2 38 Z'

const RING_SYMBOL = 'path://M20,0 A20,20 0 1,1 19.99,0 Z'

function getGeoLayout({ map, outline, nameMap, centerY = 48 }) {
  const base = {
    roam: false,
    aspectScale: 0.92,
    layoutCenter: ['50%', `${centerY}%`],
    layoutSize: '92%',
  }
  return {
    region: {
      ...base,
      map,
      ...(nameMap ? { nameMap } : {}),
    },
    outline: {
      ...base,
      map: outline,
    },
  }
}

function buildExtrudeGeos(outlineLayout) {
  const geos = []
  for (let i = EXTRUDE_LAYERS; i >= 1; i -= 1) {
    const t = i / EXTRUDE_LAYERS
    const y = Number.parseFloat(outlineLayout.layoutCenter[1]) + i * EXTRUDE_STEP
    geos.push({
      ...outlineLayout,
      layoutCenter: [outlineLayout.layoutCenter[0], `${y}%`],
      zlevel: 0,
      silent: true,
      itemStyle: {
        areaColor: 'transparent',
        borderColor: `rgba(0, ${90 + Math.round(t * 50)}, ${200 + Math.round(t * 55)}, ${0.2 + t * 0.35})`,
        borderWidth: 1.6 + t * 1.2,
      },
      label: { show: false },
      emphasis: { disabled: true },
      select: { disabled: true },
    })
  }
  return geos
}

function buildMainOption({
  activeTab = 'venues',
  mapName,
  outlineName,
  nameMap,
  showPoints,
  mapPoints = [],
  highlightName,
  labelFontSize = 12,
  interactive = true,
}) {
  const tip = MAP_TIP_CONFIG[activeTab] ?? MAP_TIP_CONFIG.venues
  const points = showPoints ? mapPoints : []
  const theme = tip.theme
  const { region: regionLayout, outline: outlineLayout } = getGeoLayout({
    map: mapName,
    outline: outlineName,
    nameMap,
  })
  const extrudeGeos = buildExtrudeGeos(outlineLayout)
  const topGeoIndex = extrudeGeos.length + 2

  const regions = highlightName
    ? [
        {
          name: highlightName,
          itemStyle: {
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.75,
              colorStops: [
                { offset: 0, color: 'rgba(0, 190, 255, 0.5)' },
                { offset: 1, color: 'rgba(0, 110, 210, 0.28)' },
              ],
            },
            borderColor: 'rgba(255, 255, 255, 0.95)',
            borderWidth: 1.1,
            shadowColor: 'rgba(0, 132, 255, 0.65)',
            shadowBlur: 10,
          },
          label: { color: '#ffffff' },
        },
      ]
    : []

  return {
    animation: false,
    backgroundColor: 'transparent',
    tooltip: { show: false },
    geo: [
      ...extrudeGeos,
      {
        ...outlineLayout,
        zlevel: 1,
        silent: true,
        itemStyle: {
          areaColor: 'transparent',
          borderColor: 'rgba(0, 132, 255, 0.6)',
          borderWidth: 10,
          shadowColor: 'rgba(0, 132, 255, 0.9)',
          shadowBlur: 40,
        },
        label: { show: false },
        emphasis: { disabled: true },
        select: { disabled: true },
      },
      {
        ...outlineLayout,
        zlevel: 2,
        silent: true,
        itemStyle: {
          areaColor: 'transparent',
          borderColor: 'rgb(210, 235, 255)',
          borderWidth: 3,
          shadowColor: 'rgba(0, 132, 255, 0.95)',
          shadowBlur: 32,
        },
        label: { show: false },
        emphasis: { disabled: true },
        select: { disabled: true },
      },
      {
        ...regionLayout,
        zlevel: 3,
        silent: !interactive,
        itemStyle: {
          areaColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
          cursor: interactive ? 'pointer' : 'default',
        },
        label: {
          show: true,
          color: 'rgba(230, 242, 255, 0.88)',
          fontSize: labelFontSize,
          fontWeight: 400,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
          textBorderColor: 'rgba(0, 20, 50, 0.65)',
          textBorderWidth: 2,
        },
        regions,
        emphasis: {
          disabled: !interactive,
          itemStyle: {
            areaColor: 'rgba(0, 132, 255, 0.4)',
            borderColor: 'rgba(120, 200, 255, 0.95)',
            borderWidth: 1.2,
            shadowColor: 'rgba(0, 132, 255, 0.55)',
            shadowBlur: 12,
          },
          label: { color: '#ffffff' },
        },
        select: { disabled: true },
      },
    ],
    series: [
      {
        name: '点位基座',
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: topGeoIndex,
        zlevel: 4,
        silent: true,
        data: points,
        symbol: RING_SYMBOL,
        symbolSize: 28,
        itemStyle: {
          color: 'transparent',
          borderColor: theme.ring,
          borderWidth: 1.2,
          borderType: [3, 3],
          shadowBlur: 8,
          shadowColor: theme.ringShadow,
        },
        label: { show: false },
      },
      {
        name: '场所点位',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: topGeoIndex,
        zlevel: 5,
        silent: true,
        data: points,
        symbol: DIAMOND_SYMBOL,
        symbolSize: [20, 38],
        symbolOffset: [0, -10],
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          color: theme.ripple,
          scale: 3.2,
          period: 3.4,
          number: 2,
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: theme.diamond[0] },
              { offset: 0.28, color: theme.diamond[1] },
              { offset: 0.62, color: theme.diamond[2] },
              { offset: 1, color: theme.diamond[3] },
            ],
          },
          shadowBlur: 16,
          shadowColor: theme.diamondShadow,
          borderColor: theme.diamondBorder,
          borderWidth: 0.8,
        },
        label: {
          show: showPoints && points.length > 0,
          formatter(params) {
            const count = params.value?.[2] ?? ''
            return `${tip.prefix}：${count}`
          },
          position: 'top',
          distance: 6,
          color: theme.tipColor,
          fontSize: 12,
          fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif',
          backgroundColor: theme.tipBg,
          padding: [5, 11],
          borderColor: theme.tipBorder,
          borderWidth: 1,
          borderRadius: 1,
          shadowBlur: 10,
          shadowColor: theme.tipShadow,
        },
        labelLayout: { hideOverlap: false },
      },
    ],
  }
}

function ChinaMap({ activeTab = 'venues' }) {
  const {
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
    isCounty,
  } = useMapScope()
  const queryParams = useCockpitQueryParams()
  const [regionTree, setRegionTree] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const [mapBundle, setMapBundle] = useState({
    mapName: PROVINCE_MAP,
    outlineName: PROVINCE_OUTLINE,
    nameMap: CITY_SHORT_NAME_MAP,
    showPoints: true,
    highlightName: PROVINCE_CAPITAL_SHORT_NAME,
    labelFontSize: 12,
    interactive: true,
  })

  const stageLayerRef = useRef(null)
  const veilRef = useRef(null)
  const animatingRef = useRef(false)
  const scopeKeyRef = useRef('')
  const hasShownRef = useRef(false)
  const prevLevelRef = useRef(scope.level)

  // 地图树一次拉全量（type 默认 1）；下钻只做前端裁剪，避免随 unitCode 重复请求
  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    const load = async () => {
      try {
        const userId = queryParams.userId
        const res = await GET_REGION_LIST_COUNT(
          {
            type: 1,
            ...(userId ? { userId } : {}),
          },
          { signal: controller.signal },
        )
        if (cancelled) return
        setRegionTree(res?.data ?? null)
      } catch (err) {
        if (!cancelled && err?.name !== 'AbortError') setRegionTree(null)
      }
    }
    load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [queryParams.userId])

  const mapPoints = useMemo(() => {
    if (scope.level === 'county') return []
    const children = getRegionChildrenForScope(regionTree, scope)
    const provinceAdcode =
      scope.level === 'country'
        ? COUNTRY_UNIT_CODE
        : scope.provinceUnitCode || PROVINCE_UNIT_CODE
    return buildMapPointsFromRegions(children, activeTab, provinceAdcode)
  }, [regionTree, scope, activeTab])

  const resolveBundle = useCallback(async (targetScope) => {
    if (targetScope.level === 'country') {
      const ids = await ensureCountryMap()
      return {
        mapName: ids.mapName,
        outlineName: ids.outlineName,
        nameMap: PROVINCE_SHORT_NAME_MAP,
        showPoints: true,
        highlightName: '',
        labelFontSize: 11,
        interactive: true,
      }
    }

    if (targetScope.level === 'province') {
      const assets = targetScope.provinceName
        ? getProvinceMapAssets(targetScope.provinceName)
        : null
      const loaded = await ensureProvinceMap(targetScope.provinceName || undefined)
      if (!loaded) throw new Error('未找到该省地图资源')
      return {
        mapName: loaded.mapName,
        outlineName: loaded.outlineName,
        nameMap: assets?.cityShortNameMap || CITY_SHORT_NAME_MAP,
        showPoints: true,
        highlightName: assets?.capitalShortName ?? PROVINCE_CAPITAL_SHORT_NAME,
        labelFontSize: 12,
        interactive: true,
      }
    }

    if (targetScope.level === 'county') {
      const loaded = await ensureCountyMap(targetScope.cityName, targetScope.countyName)
      if (!loaded) {
        throw new Error('未找到该区县地图资源')
      }
      return {
        mapName: loaded.mapName,
        outlineName: loaded.outlineName,
        nameMap: null,
        showPoints: false,
        highlightName: '',
        labelFontSize: 11,
        interactive: false,
      }
    }

    const loaded = await ensureCityMap(targetScope.cityName)
    if (!loaded) {
      throw new Error('未找到该市地图资源')
    }
    return {
      mapName: loaded.mapName,
      outlineName: loaded.outlineName,
      nameMap: null,
      showPoints: true,
      highlightName: '',
      labelFontSize: 11,
      interactive: true,
    }
  }, [])

  useEffect(() => {
    const scopeKey = `${scope.level}:${scope.cityName || ''}:${scope.countyName || ''}`
    if (scopeKeyRef.current === scopeKey && hasShownRef.current) return undefined
    scopeKeyRef.current = scopeKey

    let cancelled = false
    const prevLevel = prevLevelRef.current
    const forward = LEVEL_RANK[scope.level] > LEVEL_RANK[prevLevel]
    prevLevelRef.current = scope.level

    const run = async () => {
      setError('')
      const shouldExit = hasShownRef.current && ready

      const bundlePromise = resolveBundle(scope)

      if (shouldExit) {
        animatingRef.current = true
        setTransitioning(true)
        void animateEl(
          veilRef.current,
          [{ opacity: 0 }, { opacity: 0.34, offset: 0.42 }, { opacity: 0 }],
          TRANSITION_MS + 180,
        )
        await Promise.all([
          animateEl(
            stageLayerRef.current,
            forward
              ? [
                  { opacity: 1, transform: 'scale(1)' },
                  { opacity: 0, transform: 'scale(1.3)' },
                ]
              : [
                  { opacity: 1, transform: 'scale(1)' },
                  { opacity: 0, transform: 'scale(0.76)' },
                ],
            TRANSITION_MS,
          ),
          bundlePromise.catch(() => undefined),
        ])
        if (cancelled) return
      }

      try {
        const bundle = await bundlePromise
        if (cancelled) return
        const isFirstShow = !hasShownRef.current
        setMapBundle(bundle)
        setReady(true)
        hasShownRef.current = true

        const layer = stageLayerRef.current
        if (layer) {
          cancelElAnimations(layer)
          layer.style.opacity = '0'
          // 首屏只用透明度，避免开图形加速时 scale 合成层命中盒异常
          layer.style.transform = isFirstShow
            ? ''
            : forward
              ? 'scale(0.76)'
              : 'scale(1.24)'
        }

        await waitMs(40)
        if (cancelled) return

        if (isFirstShow) {
          await animateEl(
            stageLayerRef.current,
            [{ opacity: 0 }, { opacity: 1 }],
            380,
          )
        } else {
          await animateEl(
            stageLayerRef.current,
            forward
              ? [
                  { opacity: 0, transform: 'scale(0.76)' },
                  { opacity: 1, transform: 'scale(1)' },
                ]
              : [
                  { opacity: 0, transform: 'scale(1.24)' },
                  { opacity: 1, transform: 'scale(1)' },
                ],
            ENTER_MS,
          )
        }
        if (cancelled) return

        if (stageLayerRef.current) {
          stageLayerRef.current.style.opacity = ''
          stageLayerRef.current.style.transform = ''
          cancelElAnimations(stageLayerRef.current)
        }
        if (veilRef.current) {
          veilRef.current.style.opacity = ''
          cancelElAnimations(veilRef.current)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || '地图加载失败')
          setReady(false)
        }
      } finally {
        if (!cancelled) {
          animatingRef.current = false
          setTransitioning(false)
        }
      }
    }

    run()
    return () => {
      cancelled = true
      cancelElAnimations(stageLayerRef.current)
      cancelElAnimations(veilRef.current)
    }
    // ready 仅用于判断是否需要退场，不纳入依赖避免循环
  }, [scope.level, scope.cityName, scope.countyName, resolveBundle])

  const mainOption = useMemo(
    () =>
      ready
        ? buildMainOption({
            activeTab,
            ...mapBundle,
            mapPoints,
          })
        : null,
    [ready, activeTab, mapBundle, mapPoints],
  )

  const handleChartClick = useCallback(
    (params) => {
      if (animatingRef.current || transitioning) return
      if (params?.componentType !== 'geo') return
      const name = String(params.name ?? '').trim()
      if (!name) return

      if (scope.level === 'country') {
        const provinceName = resolveProvinceFullName(name)
        if (!provinceName || !isDrillableProvince(provinceName)) return
        void ensureProvinceMap(provinceName)
        drillToProvince(provinceName)
        return
      }

      if (scope.level === 'province') {
        // 直辖市省图上直接是区县，跳过市级
        const provinceName = scope.provinceName || PROVINCE_REGION_NAME
        const municipality = scope.provinceName
          ? Boolean(getProvinceMapAssets(provinceName)?.isMunicipality)
          : IS_MUNICIPALITY
        if (municipality) {
          if (!isCountyInCity(provinceName, name)) return
          void ensureCountyMap(provinceName, name)
          drillToCounty(provinceName, name)
          return
        }
        const fullName = resolveCityFullName(name)
        if (!fullName || !isDrillableCity(fullName)) return
        void ensureCityMap(fullName)
        drillToCity(fullName)
        return
      }

      if (scope.level === 'city' && scope.cityName) {
        if (!isCountyInCity(scope.cityName, name)) return
        void ensureCountyMap(scope.cityName, name)
        drillToCounty(scope.cityName, name)
      }
    },
    [
      scope.level,
      scope.cityName,
      scope.provinceName,
      drillToProvince,
      drillToCity,
      drillToCounty,
      transitioning,
    ],
  )

  const handleChartMouseover = useCallback(
    (params) => {
      if (params?.componentType !== 'geo') return
      const name = String(params.name ?? '').trim()
      if (!name) return

      if (scope.level === 'country') {
        const provinceName = resolveProvinceFullName(name)
        if (provinceName && isDrillableProvince(provinceName)) {
          void ensureProvinceMap(provinceName)
        }
        return
      }

      if (scope.level === 'province') {
        const provinceName = scope.provinceName || PROVINCE_REGION_NAME
        const municipality = scope.provinceName
          ? Boolean(getProvinceMapAssets(provinceName)?.isMunicipality)
          : IS_MUNICIPALITY
        if (municipality) {
          if (isCountyInCity(provinceName, name)) {
            void ensureCountyMap(provinceName, name)
          }
          return
        }
        const fullName = resolveCityFullName(name)
        if (!fullName || !isDrillableCity(fullName)) return
        void ensureCityMap(fullName)
        return
      }

      if (scope.level === 'city' && scope.cityName && isCountyInCity(scope.cityName, name)) {
        void ensureCountyMap(scope.cityName, name)
      }
    },
    [scope.level, scope.cityName, scope.provinceName],
  )

  const handleBackToCountry = useCallback(() => {
    if (animatingRef.current || transitioning || !canGoCountry) return
    void ensureCountryMap()
    backToCountry()
  }, [backToCountry, canGoCountry, transitioning])

  const handleBackToProvince = useCallback(() => {
    if (animatingRef.current || transitioning || !canGoProvince) return
    void ensureProvinceMap(scope.provinceName || undefined)
    backToProvince()
  }, [backToProvince, canGoProvince, scope.provinceName, transitioning])

  const handleBackToCity = useCallback(() => {
    if (animatingRef.current || transitioning || !canGoCity) return
    if (scope.cityName) void ensureCityMap(scope.cityName)
    backToCity()
  }, [backToCity, canGoCity, scope.cityName, transitioning])

  const chartEvents = useMemo(
    () => ({
      click: handleChartClick,
      mouseover: handleChartMouseover,
    }),
    [handleChartClick, handleChartMouseover],
  )

  const provinceLabel = scope.provinceName || PROVINCE_REGION_NAME

  const title =
    scope.level === 'country'
      ? `${COUNTRY_REGION_NAME}场所地图`
      : scope.level === 'province'
        ? `${provinceLabel}场所地图`
        : scope.regionName || '场所地图'

  const isCountry = scope.level === 'country'
  const showCountryCrumb = canGoCountry && !isCountry
  const showProvinceCrumb =
    canGoProvince && scope.level !== 'province' && !isCountry && Boolean(scope.provinceName || !canGoCountry)
  const showCityCrumb = Boolean(scope.cityName) && (showProvinceCrumb || homeLevel !== 'province')
  const showBreadcrumb = showCountryCrumb || showProvinceCrumb || showCityCrumb || isCounty
  const cityIsLink = isCounty && canGoCity
  const provinceIsLink = scope.level !== 'province'

  const breadcrumb = (
    <nav
      className={`map-area__breadcrumb${showBreadcrumb ? ' map-area__breadcrumb--visible' : ''}`}
      aria-label="地图层级"
    >
      {showCountryCrumb ? (
        <button type="button" className="map-area__breadcrumb-link" onClick={handleBackToCountry}>
          <span className="map-area__breadcrumb-chevron" aria-hidden>
            ‹
          </span>
          {COUNTRY_REGION_NAME}
        </button>
      ) : null}

      {showProvinceCrumb ? (
        <>
          {showCountryCrumb ? (
            <span className="map-area__breadcrumb-sep" aria-hidden>
              /
            </span>
          ) : null}
          {provinceIsLink ? (
            <button
              type="button"
              className="map-area__breadcrumb-link"
              onClick={handleBackToProvince}
            >
              {!showCountryCrumb ? (
                <span className="map-area__breadcrumb-chevron" aria-hidden>
                  ‹
                </span>
              ) : null}
              {provinceLabel}
            </button>
          ) : (
            <span className="map-area__breadcrumb-current">{provinceLabel}</span>
          )}
        </>
      ) : null}

      {showCityCrumb ? (
        <>
          {showProvinceCrumb || showCountryCrumb ? (
            <span className="map-area__breadcrumb-sep" aria-hidden>
              /
            </span>
          ) : null}
          {cityIsLink ? (
            <button type="button" className="map-area__breadcrumb-link" onClick={handleBackToCity}>
              {!showProvinceCrumb && !showCountryCrumb ? (
                <span className="map-area__breadcrumb-chevron" aria-hidden>
                  ‹
                </span>
              ) : null}
              {scope.cityName}
            </button>
          ) : (
            <span className="map-area__breadcrumb-current">{scope.cityName}</span>
          )}
        </>
      ) : null}

      {isCounty && scope.countyName ? (
        <>
          <span className="map-area__breadcrumb-sep" aria-hidden>
            /
          </span>
          <span className="map-area__breadcrumb-current">{scope.countyName}</span>
        </>
      ) : null}
    </nav>
  )

  if (error) {
    return (
      <div className="map-area" aria-label={title}>
        <div className="map-area__placeholder">
          <span className="map-area__placeholder-title">{title}</span>
          <span>{error}</span>
        </div>
        {breadcrumb}
      </div>
    )
  }

  return (
    <div
      className={`map-area${transitioning ? ' map-area--transitioning' : ''}`}
      aria-label={title}
    >
      <div className="map-area__radar" aria-hidden="true">
        <span className="map-area__radar-ring map-area__radar-ring--1" />
        <span className="map-area__radar-ring map-area__radar-ring--2" />
        <span className="map-area__radar-ring map-area__radar-ring--3" />
        <span className="map-area__radar-ring map-area__radar-ring--4" />
        <span className="map-area__radar-ring map-area__radar-ring--5" />
      </div>

      <div className="map-area__stage">
        <div ref={stageLayerRef} className="map-area__stage-layer">
          {ready && mainOption ? (
            <EChart
              option={mainOption}
              onEvents={chartEvents}
              className="echart--fill map-area__chart"
            />
          ) : (
            <div className="map-area__placeholder">
              <span className="map-area__placeholder-title">{title}</span>
              <span>地图加载中…</span>
            </div>
          )}
        </div>
        <div ref={veilRef} className="map-area__veil" aria-hidden="true" />
      </div>

      {breadcrumb}
    </div>
  )
}

export default ChinaMap
