// Contains function to abstract the Obsidian API away from classes to allow a more functional programming style. I'm just a functional person ^.^ (in JS at least);

import { Plugin, App, FuzzySuggestModal, PluginSettingTab, Setting } from 'obsidian';
import { raiseError } from './lessAppAPI';


/*
Naming convention example:

1. FuzzySuggestModal - inherited class

2. fuzzysuggestmodal - defined class

3. fuzzySuggestModal - exported function

TODO: the naming convention sucks? Probably.

*/

// This `modal` is responsible for prompting the user to select a file;
class fuzzysuggestmodal extends FuzzySuggestModal<string> {
    constructor(app: App, spec: any) {
        super(app);
		this.app = app;
		this.handler = spec.handler; // make sure to omit `()` in the function when creating the class.
		this.data = spec.data; // an object containing any additional data required for `runFunc`
    }

    getItems(): string[] {
		const files = this.app.vault.getMarkdownFiles();
		const fileList = files.map(file => file.path.replace(".md", ""));
        return fileList;
    }

    getItemText(item: string): string {
        return item;
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent) {
		this.handler(item, evt, this.data); // pass selected data to a handler func;
    }
}

// This class provides an endpoint for adding a settings panel for your plugin;
class pluginsettingstab extends PluginSettingTab {
	constructor(app: App, plugin: QuickGrab, spec: any) {
		super(app, plugin);
		this.plugin = plugin;
		this.quickGrabSettings = spec.quickGrabSettings; // Where the settings are saved (unpure);
		this.settingsTabTemplate = spec.settingsTabTemplate; // Template to iterate over;
	}

	display(): void {
		const {plugin, containerEl, quickGrabSettings, settingsTabTemplate} = this;
		containerEl.empty();
		containerEl.createEl(settingsTabTemplate.header.size, {text: settingsTabTemplate.header.text});

		Object.keys(settingsTabTemplate.options).forEach(function(item)  {
			const c = settingsTabTemplate.options[item];
			new Setting(containerEl)
				.setName(c.name)
				.setDesc(c.desc)
				.addText(function(text) {
					text
						.setValue(quickGrabSettings[item])
						.onChange(function(value) { // save the data on change
							quickGrabSettings[item] = value;
							plugin.saveData(quickGrabSettings);
						});
				});
		});
	}
}

// TODO: Properly implement TS types;
export function constructor(plugin: any) {
	const { app } = plugin;

	// Syntactical sugar;
	const fuzzySuggestModal = function(spec: any): void {
		new fuzzysuggestmodal(app, spec).open();
	}

	// More Syntactical;
	const pluginSettingsTab = function(spec: any) {
		return new pluginsettingstab(app, plugin, spec);
	}

	// Retrieves and returns the fronmatter from a file in the vault based on file name;
	const getYaml = function(fileName: String) {
		// TODO: Consider case where fileName does not end in `.md`;
		const tFile = app.vault.getAbstractFileByPath(fileName + ".md");
		if (tFile) {
			const frontmatter = app.metadataCache.getFileCache(tFile).frontmatter;
			if (frontmatter) {
				return frontmatter;
			}
			raiseError({ text: `No frontmatter was found in '${fileName}'.` });
		} else {
			raiseError({ text: `File '${fileName}' not found.` });
		}
	}

	// Returns relevant functions for later execution;
	return Object.freeze({
		fuzzySuggestModal,
		pluginSettingsTab,
		getYaml
	});

}
