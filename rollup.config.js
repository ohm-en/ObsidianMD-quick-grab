import eslint from '@rollup/plugin-eslint';
import copy from "rollup-plugin-copy";
import typescript from '@rollup/plugin-typescript';

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
    eslint({
      /* your options */
    }),
    copy({
    	targets: [
		{ src: "manifest.json", dest: "test-vault/.obsidian/plugins/ObsidianMD-Quick-Grab/" },
		{ src: "styles.css", dest: "test-vault/.obsidian/plugins/ObsidianMD-Quick-Grab/" }
	]}),
  ]
};
