import less from 'less'
import fs_extra from 'fs-extra'
const { readFileSync } = fs_extra
import { join } from 'path'
import { CWD } from '../common/constant.js'

export async function compileLess(filePath) {
    const source = readFileSync(filePath, 'utf-8')
    const { css } = await less.render(source, {
        filename: filePath,
        paths: [join(CWD, 'node_modules')],
    })

    return css
}
