import { genPackageStyle } from './gen-package-style.js'
import { LIB_DIR } from '../common/constant.js'
import { join, dirname } from 'path'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import less from 'gulp-less'
import gulp from 'gulp'

export function createHomeStyle(cb) {
    genPackageStyle({
        outputPath: join(LIB_DIR, '/index.less'),
        entry: LIB_DIR,
        compListName: 'b-ui-list'
    })
    cb()
}

function buildSingleCss(dirPath, name = 'index.css') {
    gulp.src(dirPath)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename(name))
        .pipe(gulp.dest(dirname(dirPath)))
    return Promise.resolve()
}
export async function buildHomeCss(cb) {
    const homePath = join(LIB_DIR, 'index.less')
    buildSingleCss(homePath)
    cb()
}