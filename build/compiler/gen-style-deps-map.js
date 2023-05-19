import { SRC_DIR, STYLE_DEPS_JSON_FILE } from '../common/constant.js'
import { getComponents } from '../common/index.js'
import { smartOutputFile } from '../common/utils.js'
import { clearDepsCache, fillExt, getDeps } from './get-deps.js'
import { join, relative, sep } from 'path'
import fs_extra from 'fs-extra'
const { existsSync } = fs_extra

// 是否包含组件的名称
function matchPath(path, component) {
    const p = relative(SRC_DIR, path);
    const arr = p.split(sep);
    return arr.includes(component);
}
function getStylePath(component) {
    return join(SRC_DIR, `${component}/index.less`);
}
// 组件存在 xxx/index.less文件
export function checkStyleExists(component) {
    return existsSync(getStylePath(component));
}
// analyze component dependencies
function analyzeComponentDeps(components, component) {

    const checkList = [];
    // 获取存在的文件路径
    const componentEntry = fillExt(join(SRC_DIR, component, 'index')).path;
    const record = new Set();

    // 深度遍历
    function search(filePath) {
        record.add(filePath);
        getDeps(filePath).forEach((key) => {
            if (record.has(key)) {
                return;
            }

            search(key);
            components
                .filter((item) => matchPath(key, item))
                .forEach((item) => {
                    // 依赖的其他组件，不是自己
                    if (!checkList.includes(item) && item !== component) {
                        checkList.push(item);
                    }
                });
        });
    }


    search(componentEntry);
    console.log('checkList: ', checkList);
    return checkList.filter(checkStyleExists);
}

function getSequence(components, depsMap) {
    const sequence = [];
    const record = new Set();

    function add(item) {
        const deps = depsMap[item];

        if (sequence.includes(item) || !deps) {
            return;
        }

        if (record.has(item)) {
            sequence.push(item);
            return;
        }

        record.add(item);

        if (!deps.length) {
            sequence.push(item);
            return;
        }

        deps.forEach(add);

        if (sequence.includes(item)) {
            return;
        }

        const maxIndex = Math.max(...deps.map((dep) => sequence.indexOf(dep)));

        sequence.splice(maxIndex + 1, 0, item);
    }

    components.forEach(add);

    return sequence;
}

export async function genStyleDepsMap() {
    const components = getComponents();

    return new Promise((resolve) => {
        clearDepsCache();

        const map = {}

        components.forEach((component) => {
            map[component] = analyzeComponentDeps(components, component);
        });

        // sequence是所有组件数组，前面的是被依赖项
        const sequence = getSequence(components, map);

        Object.keys(map).forEach((key) => {
            map[key] = map[key].sort(
                (a, b) => sequence.indexOf(a) - sequence.indexOf(b)
            );
        });

        smartOutputFile(
            STYLE_DEPS_JSON_FILE,
            JSON.stringify({ map, sequence }, null, 2)
        );

        resolve();
    });
}