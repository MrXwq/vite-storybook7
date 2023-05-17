// const fs_extra = require('fs-extra')
// const constant = require('../common/constant.js')
// exports.copySourceCode = async function copySourceCode(cb) {
//     await fs_extra.copy(constant.SRC_DIR, constant.LIB_DIR)
//     cb()
// }
import { copy } from 'fs-extra'
// import {join} from 'path'
import { SRC_DIR, LIB_DIR } from '../common/constant.js'
// import { isDemoDir,isDir,isScript,isStyle } from '../common/index.js'
// import {compileJs} from './compiler-js.js'
// const { copy, readdirSync, remove } = fs_extra

// async function compileFile(filePath) {
//     if (isScript(filePath)) {
//         return compileJs(filePath);
//     }
//     // if (isStyle(filePath)) {
//     //     return compile_style_1.compileStyle(filePath);
//     // }
//     // return remove(filePath);
// }
// async function compileDir(dir) {
//     const files = readdirSync(dir);
//     await Promise.all(files.map(filename => {
//         const filePath = join(dir, filename);
//         if (isDemoDir(filePath)) {
//             return remove(filePath);
//         }
//         if (isDir(filePath)) {
//             return compileDir(filePath);
//         }
//         return compileFile(filePath);
//     }));
// }

export async function copySourceCode(cb) {
    await copy(SRC_DIR, LIB_DIR)
    // await compileDir(LIB_DIR);
    cb()
}
