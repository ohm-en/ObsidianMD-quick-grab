import eslint from '@rollup/plugin-eslint';
import copy from "rollup-plugin-copy";
import typescript from '@rollup/plugin-typescript';
//import nodeResolve from "@rollup/plugin-node-resolve";
//import commonjs from "@rollup/plugin-commonjs";

export default {
  input: 'src/main.ts',
  output: {
	dir: "test-vault/.obsidian/plugins/ObsidianMD-Quick-Grab/",
        sourcemap: "inline",
        format: "cjs",
        exports: "default",
  },
  plugins: [
    typescript(),
    //nodeResolve({ browser: true }),
    //commonjs(),
    eslint({
      /* your options */
    }),
    copy({
    	targets: [
		{ src: "manifest.json", dest: "test-vault/.obsidian/plugins/ObsidianMD-Quick-Grab/" },
		{ src: "styles.css", dest: "test-vault/.obsidian/plugins/ObsidianMD-Quick-Grab/" }
	]}),
  ],
  external: ['obsidian']
};
