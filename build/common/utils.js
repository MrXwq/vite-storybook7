import fs_extra from 'fs-extra'
import { SCRIPT_EXTS } from './constant.js'

/**
 * 判断刚路径是否含有index.js
 * @param {String} dir
 */
function hasIndex(dir, target) {
    let dirs = []
    try {
        dirs = fs_extra.readdirSync(dir)
    } catch (e) {
        dirs = null
    }
    return dirs && dirs.includes(target)
}
export function getEntryExt(entryDir, options = {}) {
    const extArr = options.exts || SCRIPT_EXTS
    for (let i = 0; i < extArr.length; i += 1) {
        const ext = extArr[i]
        if (hasIndex(entryDir, `index${ext}`)) {
            return ext
        }
    }
    return ''
}


export function smartOutputFile(filePath, content) {
    if (fs_extra.existsSync(filePath)) {
        const previousContent = fs_extra.readFileSync(filePath, 'utf-8')

        if (previousContent === content) {
            return
        }
    }
    fs_extra.outputFileSync(filePath, content)
}