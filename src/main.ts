// This file should be the sole bridge between ObsidianMD API and any other code.
// As all examples of the ObsidianMD I've seen are based on objects (classes), this file will remain object orientated. However, as I prefer JavaScript for functional programming, my library components should be as such.

import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, FuzzySuggestModal, SuggestModal } from 'obsidian';
import { process } from "./processGrab";

interface GrabSettings {
	yamlGrabbed: string;
}

const DEFAULT_SETTINGS: GrabSettings = {
	yamlGrabbed: 'uri'
}

export default class quickGrab extends Plugin {
	settings: GrabSettings;
	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: "open-files-url",
      			name: "Open Files URL",
			editorCallback: (editor: Editor) => {
				new fileSelectModal(this.app, this.settings).open();
			},
		})
		this.addSettingTab(new GrabSettingTab(this.app, this));
	}


	onunload() {

	};

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// Thanks to this repo which was used as reference for FuzzySuggest: https://github.com/ryanjamurphy/workbench-obsidian/blob/master/main.ts
class fileSelectModal extends FuzzySuggestModal<string> {
	app: App;

    constructor(app: App, settings: Settings) {
        super(app, settings);
	this.app = app;
	this.settings = settings;
    }

    getItems(): string[] {
	const files = this.app.vault.getMarkdownFiles();
	const fileList = files.map(file => file.name);
        return fileList;
    }

    getItemText(item: string): string {
        return item;
    }

    async onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
	const {getPropertyValue} = app.plugins.plugins["metaedit"].api;
	const string = await getPropertyValue(this.settings.yamlGrabbed, item));
	if (typeof(string) == 'string')  {
		process(string, evt);
	} else {
		new Notice(`YAML value, '${yamlGrabbed}', was not set in file.`);
	}
    }
}
class GrabSettingTab extends PluginSettingTab {
	plugin: quickGrab;

	constructor(app: App, plugin: quickGrab) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Quick Grab Settings Panel'});

		const rTest = /^[A-Za-z]*$/;

		new Setting(containerEl)
			.setName('YAML')
			.setDesc('The YAML variable to grab.')
			.addText(text => text
				.setPlaceholder('YAML variable.')
				.setValue(this.plugin.settings.yamlGrabbed)
				.onChange(async (value) => {
					if (rTest.test(value) == true) {
						this.plugin.settings.yamlGrabbed = value;
						await this.plugin.saveSettings();
					} else {
						new Notice("Value is not yaml compatible. Try again.");
						// TODO: limit to one notice to avoid spamming the user.
					}
				}));
	}
}
