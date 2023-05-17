import { isNumeric } from './validate'
import { isDef, type Numeric } from './base'
import type { CSSProperties } from 'vue'
// 添加单位
export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined
  }
  return isNumeric(value) ? `${value}px` : String(value)
}

export function getZIndexStyle(zIndex?: string | number): CSSProperties {
  const style: CSSProperties = {}
  if (zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style
}
// cache
let rootFontSize: number

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = parseFloat(fontSize)
  }

  return rootFontSize
}

function convertRem(value: string) {
  value = value.replace(/rem/g, '')
  return +value * getRootFontSize()
}

function convertVw(value: string) {
  value = value.replace(/vw/g, '')
  return (+value * window.innerWidth) / 100
}

function convertVh(value: string) {
  value = value.replace(/vh/g, '')
  return (+value * window.innerHeight) / 100
}

export function unitToPx(value: string | number): number {
  if (typeof value === 'number') {
    return value
  }

  if (value.includes('rem')) {
    return convertRem(value)
  }
  if (value.includes('vw')) {
    return convertVw(value)
  }
  if (value.includes('vh')) {
    return convertVh(value)
  }

  return parseFloat(value)
}

export function getSizeStyle(originSize?: Numeric | Numeric[]): CSSProperties | undefined {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1])
      }
    }
    const size = addUnit(originSize)
    return {
      width: size,
      height: size
    }
  }
}
