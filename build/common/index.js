import fs_extra from 'fs-extra'
import { join, sep } from 'path'
import { SRC_DIR } from './constant.js';
// import { loadConfigFromFile, mergeConfig } from 'vite';
const { lstatSync, existsSync, readdirSync, readFileSync } =
    fs_extra;

const EXT_REGEXP = /\.\w+$/;
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
const STYLE_REGEXP = /\.(css|less|scss)$/;
const JSX_REGEXP = /\.(j|t)sx$/;
const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');

export function isStyle(path) {
    return STYLE_REGEXP.test(path);
}

export function isScript(path) {
    return SCRIPT_REGEXP.test(path);
}
export function isDemoDir(dir) {
    return DEMO_REGEXP.test(dir);
}
export function isDir(dir) {
    return lstatSync(dir).isDirectory();
}
export const isJsx = (path) => JSX_REGEXP.test(path);

export function replaceExt(path, ext) {
    return path.replace(EXT_REGEXP, ext);
}

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

export function normalizePath(path) {
    return path.replace(/\\/g, '/');
}

export function hasDefaultExport(code) {
    return code.includes('export default') || code.includes('export { default }');
}

export function getComponents() {
    const dirs = readdirSync(SRC_DIR);

    return dirs
        .filter((dir) => {
            const path = join(SRC_DIR, dir, `index.ts`);
            if (existsSync(path)) {
                return hasDefaultExport(readFileSync(path, 'utf-8'));
            }

            return false;
        });
}

export async function mergeCustomViteConfig(
    config,
    // mode
) {
    // const vantConfig = getVantConfig();
    // const configureVite = vantConfig.build?.configureVite;


    // if (configureVite) {
    //   const ret = configureVite(config);
    //   if (ret) {
    //     config = ret;
    //   }
    // }

    return config;
}