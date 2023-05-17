/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropType, ComponentPublicInstance } from 'vue'

export type Numeric = number | string

export const extend = Object.assign

export const unknownProp = null as unknown as PropType<unknown>

export type Arrayable<T> = T | T[]

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>

export function get(object: any, path: string): any {
  const keys = path.split('.')
  let result = object

  keys.forEach((key) => {
    result = result[key] ?? ''
  })

  return result
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export function pick<T, U extends keyof T>(obj: T, keys: ReadonlyArray<U>) {
  return keys.reduce((ret, key) => {
    if (obj[key] !== undefined) {
      ret[key] = obj[key]
    }
    return ret
  }, {} as Writeable<Pick<T, U>>)
}

export type ThemeType = 'light' | 'dark' | ''

export const isSameValue = (newValue: unknown, oldValue: unknown) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue)

type Many<T> = T | Array<T>
export const ensureArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}
