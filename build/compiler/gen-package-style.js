import { smartOutputFile } from '../common/utils.js'
import { STYLE_DEPS_JSON_FILE, STYLE_DIR, SRC_DIR } from '../common/constant.js'
import { normalizePath } from '../common/index.js'
import { join } from 'path'
import { createRequire } from 'node:module';
import fs_extra from 'fs-extra'
const { existsSync } = fs_extra

export function genPackageStyle(options) {
    const require = createRequire(import.meta.url);
    const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
    const ext = '.less'

    let content = '';

    let baseFile = join(STYLE_DIR, 'base.less');
    if (baseFile) {
        if (options.pathResolver) {
            baseFile = options.pathResolver(baseFile);
        }

        content += `@import "${normalizePath(baseFile)}";\n`;
    }

    content += styleDepsJson.sequence
        .map((name) => {
            let path = join(SRC_DIR, `${name}/index${ext}`);

            if (!existsSync(path)) {
                return '';
            }

            if (options.pathResolver) {
                path = options.pathResolver(path);
            }

            return `@import "${normalizePath(path)}";`;
        })
        .filter((item) => !!item)
        .join('\n');

    smartOutputFile(options.outputPath, content);
}