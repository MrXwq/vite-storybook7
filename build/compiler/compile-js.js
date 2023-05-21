import babel from '@babel/core'
import { replaceExt, isJsx } from '../common/index.js'
import esbuild from 'esbuild'
import fs_extra from 'fs-extra'

const { readFileSync, removeSync, outputFileSync } = fs_extra

export async function compileJs(filePath, format) {
    if (filePath.includes('.d.ts')) {
        return
    }
    let code = readFileSync(filePath, 'utf-8')

    if (isJsx(filePath)) {
        const babelResult = await babel.transformAsync(code, {
            filename: filePath,
            babelrc: false,
            presets: ['@babel/preset-typescript'],
            plugins: [
                [
                    '@vue/babel-plugin-jsx',
                    {
                        // 虽然在 JSX 中比较好使，但是会增加一些 _isSlot 的运行时条件判断，这会增加你的项目体积，所以关闭
                        enableObjectSlots: false,
                    },
                ],
            ],
        })
        if (babelResult?.code) {
            ;({ code } = babelResult)
        }
    }

    const esbuildResult = await esbuild.transform(code, {
        loader: 'ts',
        target: 'es2016',
        format,
    })

    ;({ code } = esbuildResult)

    const jsFilePath = replaceExt(filePath, '.js')
    removeSync(filePath)
    outputFileSync(jsFilePath, code)
}
