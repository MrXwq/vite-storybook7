import gulp from 'gulp'
import { execa } from 'execa'
import { compileJs } from './compiler/compile-js.js'
import { compileStyle } from './compiler/compile-style.js'
import { genPackageEntry } from './compiler/gen-package-entry.js'
import { genPackageStyle } from './compiler/gen-package-style.js'
import { genComponentStyle } from './compiler/gen-component-style.js'
import { genStyleDepsMap } from './compiler/gen-style-deps-map.js'
import { compileBundles } from './compiler/compile-bundles.js'
import { ES_DIR, LIB_DIR, DIST_DIR, SRC_DIR, ROOT } from './common/constant.js'
import { isDemoDir, isDir, isScript, isStyle } from './common/index.js'
import { join, relative } from 'path'
import fs_extra from 'fs-extra'
const { existsSync, readdir, remove, copy } = fs_extra

async function buildPackageScriptEntry() {
    const esEntryFile = join(ES_DIR, 'index.js')
    const libEntryFile = join(LIB_DIR, 'index.js')

    genPackageEntry({
        outputPath: esEntryFile,
        pathResolver: (path) => `./${relative(SRC_DIR, path)}`,
    })
    await copy(esEntryFile, libEntryFile)
}
async function buildPackageStyleEntry() {
    const styleEntryFile = join(LIB_DIR, `index.less`)

    genPackageStyle({
        outputPath: styleEntryFile,
        pathResolver: (path) => path.replace(SRC_DIR, '.'),
    })
}

async function buildStyleEntry() {
    // 生成dist文件包含所有组件的映射关系，和所有组件的数组，数组前面的是被依赖项
    await genStyleDepsMap()
    genComponentStyle()
}

async function buildTypeDeclarations() {
    await Promise.all([preCompileDir(ES_DIR), preCompileDir(LIB_DIR)])
    const tsConfig = join(ROOT, 'tsconfig.declaration.json')
    if (existsSync(tsConfig)) {
        await execa('tsc', ['-p', tsConfig])
    }
}
async function compileFile(filePath, format) {
    if (isScript(filePath)) {
        return compileJs(filePath, format)
    }

    if (isStyle(filePath)) {
        return compileStyle(filePath)
    }

    return remove(filePath)
}

async function preCompileDir(dir) {
    const files = await readdir(dir)

    await Promise.all(
        files.map((filename) => {
            const filePath = join(dir, filename)

            if (isDemoDir(filePath)) {
                return remove(filePath)
            }
            if (isDir(filePath)) {
                return preCompileDir(filePath)
            }
            return Promise.resolve()
        }),
    )
}

async function compileDir(dir, format) {
    const files = await readdir(dir)
    await Promise.all(
        files.map((filename) => {
            const filePath = join(dir, filename)
            return isDir(filePath) ? compileDir(filePath, format) : compileFile(filePath, format)
        }),
    )
}

async function buildESMOutputs() {
    await compileDir(ES_DIR, 'esm')
}
async function buildCJSOutputs() {
    await compileDir(LIB_DIR, 'cjs')
}

async function copySourceCode() {
    return Promise.all([copy(SRC_DIR, ES_DIR), copy(SRC_DIR, LIB_DIR)])
}

async function clean() {
    await Promise.all([remove(ES_DIR), remove(LIB_DIR), remove(DIST_DIR)])
}

gulp.task(
    'default',
    gulp.series(
        clean, // 清空之前打包过的文件
        copySourceCode, // 复制文件
        buildPackageScriptEntry, // 生成入口js文件
        buildStyleEntry, // 生成每个组件的样式入口文件
        buildPackageStyleEntry, // 生成总less
        buildTypeDeclarations, // 生成声明文件
        buildESMOutputs, // 生成ES版本入口
        buildCJSOutputs, // 生成CJS版本
        compileBundles, // 打包入口
    ),
)
