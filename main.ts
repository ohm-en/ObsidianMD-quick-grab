import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, FuzzySuggestModal, SuggestModal } from 'obsidian';

interface GrabSettings {
	yamlGrabbed: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	yamlGrabbed: 'uri'
}

export default class MyPlugin extends Plugin {
	settings: GrabSettings;
	console.log(this);
	async onload() {
		this.addCommand({
			id: "open-files-url",
      			name: "Open Files URL",
			editorCallback: (editor: Editor) => {
				const obsidianApp = this.app;
				new workbenchNameModal(obsidianApp).open();
			},
		});
	}

	//this.addSettingTab(new GrabSettingTab(this.app, this));

	onunload() {

	};
}

// https://github.com/ryanjamurphy/workbench-obsidian/blob/master/main.ts
class workbenchNameModal extends FuzzySuggestModal<string> {
	app: App;

    constructor(app: App) {
        super(app);
		this.app = app;
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
	//app.vault.getAbstractFileByPath(item)
	const URL = await getPropertyValue("uri", item);
	window.open(URL);
    }
}
class GrabSettingTab extends PluginSettingTab {
	plugin: Grab;

	constructor(app: App, plugin: Grab) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
