// 是数字
export function isNumeric(val: string | number): val is string {
    return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}
export function isString(val: unknown): val is string {
    return typeof val === 'string'
}
export function isBoolean(val: unknown): val is boolean {
    return typeof val === 'boolean'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isObject(val: unknown): val is Record<any, any> {
    return val !== null && typeof val === 'object'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isDate = (val: unknown): val is Date =>
    Object.prototype.toString.call(val) === '[object Date]' &&
    !Number.isNaN((val as Date).getTime())
