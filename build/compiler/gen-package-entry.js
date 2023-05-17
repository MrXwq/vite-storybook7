import { SRC_DIR, pascalize } from '../common/constant.js'
import { smartOutputFile } from '../common/utils.js'
import { join, relative } from 'path'

function getPathByName(name) {
  let path = join(SRC_DIR, name);
  return `./${relative(SRC_DIR, path)}`;
}

function genImports(
  names,
) {
  return names
    .map((name) => {
      const pascalName = pascalize(name);
      const importName = `{ ${pascalName} }`;
      const importPath = getPathByName(name);

      return `import ${importName} from '${importPath}';`;
    })
    .join('\n');
}
function genExports(
  names,
) {
  const exports = names
    .map((name) => `export * from '${getPathByName(name)}';`)
    .join('\n');

  return `
export {
  install,
};

${exports}
`;
}
export function genPackageEntry({
  outputPath,
  compList,
}) {
  const components = compList.map(pascalize)
  const content = `${genImports(compList)}
  
function install(app) {
  const components = [
    ${components.join(',\n    ')}
  ];

  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
${genExports(compList)}
export default {
  install,
};
`;

  smartOutputFile(outputPath, content);
}
