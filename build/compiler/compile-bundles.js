import { build } from 'vite'
import { getViteConfigForPackage } from '../config/vite.package.js'

export async function compileBundles() {
    const DEFAULT_OPTIONS = [
        {
            minify: false,
            formats: ['umd'],
        },
        {
            minify: true,
            formats: ['umd'],
        },
    ]

    await Promise.all(DEFAULT_OPTIONS.map(async (config) => build(getViteConfigForPackage(config))))
}
