import { terser } from "rollup-plugin-terser";
import { getBabelOutputPlugin as babel } from '@rollup/plugin-babel';

const BASE_FILENAME = "stretchy";
const IIFE_NAME = "Stretchy";

function bundle(format, {minify} = {}) {
	let filename = BASE_FILENAME;

	if (format !== "esm") {
		filename += "." + format;
	}

	if (minify) {
		filename += ".min";
	}

	let plugins = [
		babel({
			presets: ["@babel/preset-env"],
			allowAllFormats: true,
		})
	];

	if (minify) {
		plugins.push(
			terser({
				compress: true,
				mangle: true
			})
		);
	}

	return {
		file: `dist/${filename}.js`,
		name: IIFE_NAME,
		format: format,
		sourcemap: format !== "esm",
		plugins
	};
}

// Same as a rollup.config.js
export default {
	input: "src/" + BASE_FILENAME + ".js",
	output: [
		bundle("iife"),
		bundle("iife", {minify: true}),
		bundle("esm"),
		bundle("esm", {minify: true}),
		bundle("cjs"),
		bundle("cjs", {minify: true})
	],
};