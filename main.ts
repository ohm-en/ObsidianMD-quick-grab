import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, FuzzySuggestModal, SuggestModal } from 'obsidian';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

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

	onunload() {

	}
}

// https://github.com/ryanjamurphy/workbench-obsidian/blob/master/main.ts
class workbenchNameModal extends FuzzySuggestModal<string> { // thanks to Licat for the assist!
	app: App;

    constructor(app: App) {
        super(app);
		this.app = app;
    }

    getItems(): string[] {
		let files = this.app.vault.getMarkdownFiles();
		let fileList = files.map(file => file.name);
        return fileList;
    }

    getItemText(item: string): string {
        return item;
    }

    async onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
	const {getPropertyValue} = app.plugins.plugins["metaedit"].api;
	//app.vault.getAbstractFileByPath(item)
	const URL = await getPropertyValue("url", item);
	window.open(URL);
    }
}
