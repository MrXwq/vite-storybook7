import { join, dirname } from 'path'
import fs_extra from 'fs-extra'

import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

function findRootDir(dir) {
    if (dir === '/') {
        return '/'
    }
    if (fs_extra.existsSync(join(dir, 'package.json'))) {
        return dir
    }
    return findRootDir(dirname(dir))
}
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es');
export const LIB_DIR = join(ROOT, 'lib')
export const SRC_DIR = join(ROOT, 'src')
export const SCRIPT_EXTS = ['.ts', '.tsx'];

export const DIST_DIR = join(__dirname, '../../dist');
export const CONFIG_DIR = join(__dirname, '../config');

export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json');

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

export function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function pascalize(str) {
    return camelize(str).replace(
        pascalizeRE,
        (_, c1, c2) => c1.toUpperCase() + c2
    );
}

export const COMPONENTS = JSON.parse(await fs_extra.readFileSync(new URL('../../components.json', import.meta.url)));
export const UI_COMPONENTS = COMPONENTS['b-ui-list']
export const BUSINESS_COMPONENTS = COMPONENTS['b-business-list']
export const ALL_COMPONENTS = [...COMPONENTS['b-ui-list'], ...COMPONENTS['b-business-list']]
export const STYLE_DIR = join(SRC_DIR, 'styles');