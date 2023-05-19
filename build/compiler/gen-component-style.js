import { STYLE_DIR, STYLE_DEPS_JSON_FILE, ES_DIR, LIB_DIR, SRC_DIR } from '../common/constant.js'
import { replaceExt, getComponents } from '../common/index.js'
import { checkStyleExists } from './gen-style-deps-map.js'
import fs_extra from 'fs-extra'
import { join, relative, sep } from 'path'
import { createRequire } from 'node:module';

// 把组件的依赖组件和当前组件合并 比如button：[ 'badge', 'icon' ] -> [ 'badge', 'icon', 'button' ]
function getDeps(component) {
    const require = createRequire(import.meta.url);
    const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
    // const styleDepsJson = JSON.parse(await fs_extra.readFileSync(new URL(STYLE_DEPS_JSON_FILE, import.meta.url)));

    if (styleDepsJson.map[component]) {
        const deps = styleDepsJson.map[component].slice(0);

        if (checkStyleExists(component)) {
            deps.push(component);
        }

        return deps;
    }
    return [];
}
const OUTPUT_CONFIG = [
    {
        dir: ES_DIR,
        template: (dep) => `import '${dep}';`,
    },
    {
        dir: LIB_DIR,
        template: (dep) => `require('${dep}');`,
    },
];
function getPath(component, ext = '.css') {
    return join(ES_DIR, `${component}/index${ext}`);
}

function getRelativePath(component, style, ext) {
    return relative(join(ES_DIR, `${component}/style`), getPath(style, ext));
}

async function genEntry(params) {
    const { ext, filename, component, baseFile } = params;
    const deps = getDeps(component);
    const depsPath = deps.map((dep) => getRelativePath(component, dep, ext));

    OUTPUT_CONFIG.forEach(({ dir, template }) => {
        const outputDir = join(dir, component, 'style');
        const outputFile = join(outputDir, filename);

        let content = '';

        if (baseFile) {
            const compiledBaseFile = replaceExt(baseFile.replace(SRC_DIR, dir), ext);
            content += template(relative(outputDir, compiledBaseFile));
            content += '\n';
        }

        content += depsPath.map(template).join('\n');
        content = content.replace(new RegExp('\\' + sep, 'g'), '/');
        fs_extra.outputFileSync(outputFile, content);
    });
}

export function genComponentStyle() {

    const baseFile = join(STYLE_DIR, 'base.less');

    const components = getComponents();
    components.forEach((component) => {
        genEntry({
            baseFile,
            component,
            filename: 'index.js',
            ext: '.css',
        });
    });
}