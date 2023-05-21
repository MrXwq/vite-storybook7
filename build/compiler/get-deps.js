import { SCRIPT_EXTS } from '../common/constant.js';
import fs_extra from 'fs-extra'
const { existsSync, readFileSync } = fs_extra
import { join } from 'path'

let depsMap = {};
let existsCache = {};

function exists(filePath) {
  if (!(filePath in existsCache)) {
    existsCache[filePath] = existsSync(filePath);
  }

  return existsCache[filePath];
}

export function fillExt(filePath) {
  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}${SCRIPT_EXTS[i]}`;
    if (exists(completePath)) {
      return {
        path: completePath,
        isIndex: false,
      };
    }
  }

  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}/index${SCRIPT_EXTS[i]}`;
    if (exists(completePath)) {
      return {
        path: completePath,
        isIndex: true,
      };
    }
  }

  return {
    path: '',
    isIndex: false,
  };
}


export function clearDepsCache() {
  depsMap = {};
  existsCache = {};
}
// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// 获取import语句导入的所有语句，排除导入的类型
function matchImports(code) {
  const imports = code.match(IMPORT_RE) || [];
  return imports.filter((line) => !line.includes('import type'));
}

function getPathByImport(code, filePath) {
  const divider = code.includes('"') ? '"' : "'";
  // import xxx from './xxx' 获取./xxx
  const relativePath = code.split(divider)[1];

  if (relativePath.includes('.')) {
    return fillExt(join(filePath, '..', relativePath));
  }

  return null;
}

// 获取组件import的文件
export function getDeps(filePath) {
  if (depsMap[filePath]) {
    return depsMap[filePath];
  }

  const code = readFileSync(filePath, 'utf-8');
  const imports = matchImports(code);
  // 只要绝对路径的 排除导入的npm包，比如：vue
  const paths = imports
    .map((item) => getPathByImport(item, filePath)?.path)
    .filter((item) => !!item);

  depsMap[filePath] = paths;

  paths.forEach(getDeps);

  return paths;
}