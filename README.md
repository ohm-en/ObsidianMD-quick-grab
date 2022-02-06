# ObsidianMD Quick Grab
Provides the ability to quickly grab and process specific data from a file in your [Obsidian Vault](https://obsidian.md/).

## Manual Installation
The process is the same as for any ObsidianMD plugin. First, download the following files from the latest release: `main.ts`, `manifest.json`, and `style.css`. Now just create a folder called `obsidian-quick-grab` within <vaultFolder>/.obsidian/plugins/ and move the aformentioned files in.

Additionally, once the plugin is more mature, I will  submit it to the community repository.

## Current State
At this time, only opening URLs based on a frontmatter variable is supported.

## Planned features
- [ ] Copy to clipboard function.
- [ ] Option to modify regex.
- [ ] Support for `obsidian://` URLs (including the ability to open other vaults).
- [ ] Support for YAML values with multiple definitions.
- [ ] Support for inline [dataview](https://github.com/blacksmithgu/obsidian-dataview) variables.
