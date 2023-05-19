import { pascalize, getComponents, normalizePath } from '../common/index.js'
import { SRC_DIR } from '../common/constant.js'
import { smartOutputFile } from '../common/utils.js'
import { join } from 'path'

function getPathByName(name, pathResolver) {
  let path = join(SRC_DIR, name);
  if (pathResolver) {
    path = pathResolver(path);
  }
  return normalizePath(path);
}

function genImports(
  names,
  pathResolver,
) {
  return names
    .map((name) => {
      const pascalName = pascalize(name);
      const importName = `{ ${pascalName} }`;
      const importPath = getPathByName(name, pathResolver);

      return `import ${importName} from '${importPath}';`;
    })
    .join('\n');
}
function genExports(
  names,
  pathResolver
) {
  const exports = names
    .map((name) => `export * from '${getPathByName(name, pathResolver)}';`)
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
  pathResolver,
}) {
  const compList = getComponents();
  const components = compList.map(pascalize)
  const content = `${genImports(compList, pathResolver)}
  
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
${genExports(compList, pathResolver)}
export default {
  install,
};
`;

  smartOutputFile(outputPath, content);
}
