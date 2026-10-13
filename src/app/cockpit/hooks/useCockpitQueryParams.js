/**
 * @file 驾驶舱接口公共查询参数（随地图下钻 unitCode 变化）
 */
import { useMemo } from 'react'
import { useMapScope } from '../MapScopeContext'

export function useCockpitQueryParams() {
  const { scope } = useMapScope()

  return useMemo(() => {
    return scope.unitCode ? { unitCode: scope.unitCode } : {}
  }, [scope.unitCode])
}
