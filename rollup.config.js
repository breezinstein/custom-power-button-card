import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/custom-power-button-card.js',
  output: {
    file: 'dist/custom-power-button-card.js',
    format: 'iife',
    name: 'CustomPowerButtonCard'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};
