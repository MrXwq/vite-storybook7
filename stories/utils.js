
/**
 * @description: 默认都是文本模式
 * @param {*} category 属于什么分类
 * @param {*} defaultValueSummary 默认值
 * @param {*} typeSummary 类型
 * @param {*} description 参数描述
 * @param {*} others 其他配置
 * @return {*}
 */
export function defaultProp(
    category,
    defaultValueSummary,
    typeSummary,
    description,
    others,
) {
    return {
        table: {
            category,
            defaultValue: {
                summary: defaultValueSummary,
            },
            type: {
                summary: typeSummary,
            },
        },
        description,
        control: {
            type: 'text',
        },
        ...others,
    }
}