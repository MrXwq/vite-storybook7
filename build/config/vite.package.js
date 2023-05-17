import { join } from 'node:path';
// import { setBuildTarget } from '../common/index.js';
import {
  CWD,
  // ES_DIR, getVantConfig,
  LIB_DIR
} from '../common/constant.js';

export function getViteConfigForPackage({
  minify,
  formats,
  external = [],
}) {

  const name = 'brick'
  const entryExtension = '.js';
  const entry = join(LIB_DIR, `index${entryExtension}`);

  return {
    root: CWD,

    logLevel: 'silent',

    define: {
      'process.env.NODE_ENV': 'production',
    },

    build: {
      emptyOutDir: false,

      lib: {
        name,
        entry,
        formats,
        fileName: () => {
          return minify ? `${name}.min.js` : `${name}.js`;
        },
      },

      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external: [...external, 'vue'],
        output: {
          dir: LIB_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
}
