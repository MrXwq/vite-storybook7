import fs_extra from 'fs-extra'
import path from 'path'
// import { loadConfigFromFile, mergeConfig } from 'vite';
const { lstatSync } = fs_extra

export const EXT_REGEXP = /\.\w+$/;
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
const STYLE_REGEXP = /\.(css|less|scss)$/;
const DEMO_REGEXP = new RegExp('\\' + path.sep + 'demo$');

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

export function replaceExt(path, ext) {
    return path.replace(EXT_REGEXP, ext);
}

export function normalizePath(path) {
    return path.replace(/\\/g, '/');
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