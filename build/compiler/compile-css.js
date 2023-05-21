import postcss from 'postcss'
import { transform } from 'esbuild'

export async function compileCss(source) {
    const { css } = await postcss().process(source, {
        from: undefined,
    })
    const result = await transform(css, {
        loader: 'css',
        minify: true,
        target: 'chrome64',
    })
    return result.code
}
