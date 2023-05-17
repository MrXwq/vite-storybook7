import gulp from 'gulp'
import { execa } from 'execa';
import { copySourceCode } from './compiler/gen-script.js'
import { compileJs } from './compiler/compile-js.js'
import { compileStyle } from './compiler/compile-style.js'
import { genPackageEntry } from './compiler/gen-package-entry.js'
import { genPackageStyle } from './compiler/gen-package-style.js'
import { genComponentStyle } from './compiler/gen-component-style.js'
import { genStyleDepsMap } from './compiler/gen-style-deps-map.js'
import { compileBundles } from './compiler/compile-bundles.js'
import { LIB_DIR, UI_COMPONENTS, SRC_DIR, ROOT } from './common/constant.js'
import { isDemoDir, isDir, isScript, isStyle } from './common/index.js'
import { join } from 'path'
import fs_extra from 'fs-extra'
const { existsSync, readdir, remove } = fs_extra

async function buildPackageScriptEntry() {
    const libEntryFile = join(LIB_DIR, 'index.js');

    await genPackageEntry({
        outputPath: libEntryFile,
        compList: UI_COMPONENTS
    });
}
async function buildPackageStyleEntry() {
    const styleEntryFile = join(LIB_DIR, `index.less`);

    genPackageStyle({
        outputPath: styleEntryFile,
        pathResolver: (path) => path.replace(SRC_DIR, '.'),
    });
}

async function buildStyleEntry() {
    // 生成dist文件包含所有组件的映射关系，和所有组件的数组，数组前面的是被依赖项 
    await genStyleDepsMap();
    genComponentStyle();
}

async function buildTypeDeclarations() {
    await preCompileDir(LIB_DIR)
    const tsConfig = join(ROOT, 'tsconfig.declaration.json');
    if (existsSync(tsConfig)) {
        await execa('tsc', ['-p', tsConfig]);
    }
}
async function compileFile(filePath) {

    if (isScript(filePath)) {
        return compileJs(filePath);
    }

    if (isStyle(filePath)) {
        return compileStyle(filePath);
    }

    return remove(filePath);
}

async function preCompileDir(dir) {
    const files = await readdir(dir);

    await Promise.all(
        files.map((filename) => {
            const filePath = join(dir, filename);

            if (isDemoDir(filePath)) {
                return remove(filePath);
            }
            if (isDir(filePath)) {
                return preCompileDir(filePath);
            }
            return Promise.resolve();
        })
    );
}

async function compileDir(dir) {
    const files = await readdir(dir);
    await Promise.all(
        files.map((filename) => {
            const filePath = join(dir, filename);

            // if (isDemoDir(filePath)) {
            //     return remove(filePath);
            // }

            // if (isDir(filePath)) {
            //     return compileDir(filePath);
            // }

            // return compileFile(filePath);
            return isDir(filePath)
                ? compileDir(filePath)
                : compileFile(filePath);
        })
    );
}

async function buildCJSOutputs() {
    await compileDir(LIB_DIR);
}

gulp.task(
    'default',
    gulp.series(
        copySourceCode, // 复制文件
        buildPackageScriptEntry, // 生成入口js文件
        buildStyleEntry, // 生成每个组件的样式入口文件
        buildPackageStyleEntry, // 生成总less
        buildTypeDeclarations, // 生成声明文件
        buildCJSOutputs, // 生成CJS版本
        // buildHomeCss,
        // createHomeEntry, // 生成入口文件
        // buildSeperateCss, // 生成单独css
        // buildHomeCss, // 生成总css
        // babelCJSTask, // 打包ts
        compileBundles, // 打包入口
    ),
)

