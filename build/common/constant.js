import { join, dirname } from 'path'
import fse from 'fs-extra'

const { existsSync } = fse

import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function findRootDir(dir) {
    if (dir === '/') {
        return '/'
    }
    if (existsSync(join(dir, 'package.json'))) {
        return dir
    }
    return findRootDir(dirname(dir))
}
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es')
export const LIB_DIR = join(ROOT, 'lib')
export const SRC_DIR = join(ROOT, 'src')
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
export const SCRIPT_EXTS = ['.ts', '.tsx']

export const DIST_DIR = join(__dirname, '../../dist')
export const CONFIG_DIR = join(__dirname, '../config')

export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

export const STYLE_DIR = join(SRC_DIR, 'styles')
