import { join } from 'node:path'
import { CWD, LIB_DIR } from '../common/constant.js'

export function getViteConfigForPackage({ minify, formats }) {
    const name = 'b'
    const entry = join(LIB_DIR, `index.js`)

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
                    return minify ? `${name}.min.js` : `${name}.js`
                },
            },

            minify: minify ? 'terser' : false,
            rollupOptions: {
                external: ['vue'],
                output: {
                    dir: LIB_DIR,
                    exports: 'named',
                    globals: {
                        vue: 'Vue',
                    },
                },
            },
        },
    }
}
