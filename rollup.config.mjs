import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from "rollup-plugin-postcss";

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/components/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript({
        tsconfig: './rollup.config.json',
        // exclude: ['./src/pages'],
        declaration: true,
        declarationDir: 'dist',
      }),
      commonjs(),
      postcss(),
      external()
    ],
    external: ["react", "react-dom"],
  },
  {
    input: 'dist/esm/components/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
]
