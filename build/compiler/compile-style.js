import { parse } from 'path'
import { replaceExt } from '../common/index.js'
import { compileCss } from './compile-css.js'
import { compileLess } from './compile-less.js'

import fs_extra from 'fs-extra'
const { writeFileSync, readFileSync, removeSync } = fs_extra

async function compileFile(filePath) {
    const parsedPath = parse(filePath)

    try {
        if (parsedPath.ext === '.less') {
            const source = await compileLess(filePath)
            return await compileCss(source)
        }

        const source = readFileSync(filePath, 'utf-8')
        return await compileCss(source)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function compileStyle(filePath) {
    const css = await compileFile(filePath)
    removeSync(filePath)

    writeFileSync(replaceExt(filePath, '.css'), css)
}
