import { transformAsync } from '@babel/core';
import { replaceExt } from '../common/index.js'
import fs_extra from 'fs-extra'
const { readFileSync, removeSync, outputFileSync } = fs_extra

export function compileJs(filePath) {
    return new Promise((resolve, reject) => {
        if (filePath.includes('.d.ts')) {
            resolve();
            return;
        }
        let code = readFileSync(filePath, 'utf-8');

        transformAsync(code, {
            filename: filePath,
            babelrc: false,
            presets: ['@babel/preset-typescript'],
            plugins: [
                [
                    '@vue/babel-plugin-jsx',
                    {
                        enableObjectSlots: false,
                    },
                ],
            ],
        }).then((result) => {
            if (result) {
                const jsFilePath = replaceExt(filePath, '.js');
                removeSync(filePath);
                outputFileSync(jsFilePath, result.code);
                resolve();
            }
        })
            .catch(reject);
    });
}