import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/Stats.ts',
	output: [
		{
			format: 'umd',
			name: 'Stats',
			file: 'build/stats.js',
			sourcemap: true
		},
		{
			format: 'umd',
			name: 'Stats',
			file: 'build/stats.min.js',
			sourcemap: true,
			plugins: [terser()]
		},
		{
			format: 'es',
			name: 'Stats',
			file: 'build/stats.module.js',
			sourcemap: true
		}
	],
	plugins: [
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationDir: './build'
		})
	]
};
