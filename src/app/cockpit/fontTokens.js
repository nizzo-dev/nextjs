/** functionHome 数字展示统一字体（public/fonts/D-DIN-PRO-600-SemiBold.otf） */
export const FH_NUM_FONT = 'D-DIN-PRO-600-SemiBold'
export const FH_NUM_FONT_STACK = `'${FH_NUM_FONT}', MiSans, system-ui, sans-serif`

let fontReadyPromise

/** 确保 D-DIN 已加载（CSS + Canvas/ECharts 渲染前调用） */
export function ensureFhNumFont() {
  if (typeof document === 'undefined') return Promise.resolve()

  if (!fontReadyPromise) {
    fontReadyPromise = (async () => {
      try {
        if (document.fonts?.check?.(`600 16px '${FH_NUM_FONT}'`)) return

        const face = new FontFace(FH_NUM_FONT, "url('/fonts/D-DIN-PRO-600-SemiBold.otf')", {
          weight: '600',
          style: 'normal',
          display: 'swap',
        })
        const loaded = await face.load()
        document.fonts.add(loaded)
        await document.fonts.load(`600 16px '${FH_NUM_FONT}'`)
      } catch {
        // 回退到全局 @font-face
        await document.fonts?.ready
      }
    })()
  }

  return fontReadyPromise
}
