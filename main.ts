import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, FuzzySuggestModal, SuggestModal } from 'obsidian';

interface GrabSettings {
	yamlGrabbed: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
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
				new workbenchNameModal(this.app, this.settings).open();
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

// https://github.com/ryanjamurphy/workbench-obsidian/blob/master/main.ts
class workbenchNameModal extends FuzzySuggestModal<string> {
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
	const {getPropertyValue} = app.plugins.plugins["metaedit"].api
	//app.vault.getAbstractFileByPath(item)
	const URL = await getPropertyValue(this.settings.yamlGrabbed, item);
	window.open(URL);
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

		new Setting(containerEl)
			.setName('YAML')
			.setDesc('The YAML variable to grab.')
			.addText(text => text
				.setPlaceholder('YAML variable.')
				.setValue(this.plugin.settings.yamlGrabbed)
				.onChange(async (value) => {
					console.log('YAML: ' + value);
					this.plugin.settings.yamlGrabbed = value;
					await this.plugin.saveSettings();
				}));
	}
}
