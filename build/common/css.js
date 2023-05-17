import {join} from 'path'
const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// "import 'a.less';" => "import 'a.css';"
export function replaceCssImportExt(code) {
  return code.replace(IMPORT_STYLE_RE, (str) =>
    str.replace(`.less`, '.css')
  );
}

/**
 * 获取所有组件样式
 */
 export function getStyles(entryDir, options = {}) {
  const compList = componentsConfig[options.compListName]
  const result = {}
  compList.forEach((name) => {
      const compEntry = join(entryDir, name)
      const stat = fs_extra.statSync(compEntry)
      if (stat.isDirectory()) {
          const ext = getEntryExt(compEntry, { exts: ['.less'] })
          if (ext) {
              result[name] = compEntry
          }
      }
  })
  return result
}