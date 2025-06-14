import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser  from '@rollup/plugin-terser';

export default {
  input: 'src/raccoon-cleaner.js',
  output: {
    file:  'dist/raccoon-cleaner.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),               // allows “bare” module imports
    terser({ format:{ comments:false } })
  ]
};