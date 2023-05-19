import { build } from 'vite';
import { getPackageJson } from '../common/constant.js';
import { mergeCustomViteConfig } from '../common/index.js';
import { getViteConfigForPackage } from '../config/vite.package.js';


export async function compileBundles() {
  const dependencies = getPackageJson().dependencies || {};
  const external = Object.keys(dependencies);

  const DEFAULT_OPTIONS = [
    {
      minify: false,
      formats: ['umd'],
    },
    {
      minify: true,
      formats: ['umd'],
    },
    {
      minify: false,
      formats: ['es', 'cjs'],
      external,
    },
  ];

  const fn = async (config) => {
    const res = await mergeCustomViteConfig(
      getViteConfigForPackage(config),
      'production'
    )
    return res
  }
  await Promise.all(
    DEFAULT_OPTIONS.map(async (config) =>
      build(await fn(config))
    )
  );
}
