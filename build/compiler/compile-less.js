import lessPkg from 'less';
const { render, FileManager } = lessPkg;
import fs_extra from 'fs-extra'
const { readFileSync } = fs_extra
import {join} from 'path'

import { CWD } from '../common/constant.js'

// less plugin to resolve tilde
class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '');
    return FileManager.prototype.loadFile.apply(this, [filename, ...args]);
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  },
};

export async function compileLess(filePath) {
  const source = readFileSync(filePath, 'utf-8');
  const { css } = await render(source, {
    filename: filePath,
    paths: [join(CWD, 'node_modules')],
  });

  return css;
}
