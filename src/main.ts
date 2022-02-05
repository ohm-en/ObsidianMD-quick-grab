// This file exclusively contains the extended class Plugin as QuickGrab and its methods. Other imports from `obsidian` will be handled by `./apiAbstract.ts`;

// This import appears to be required in the main file for proper function;
import { Plugin } from 'obsidian';

// Provides functions to indirectly handle the `obsidian` classes with reference to `Plugin`;
import { constructor as Api } from './fullAppAPI';

// Provides functions to indirectly handle `obsidian` imports *without* reference to `Plugin`;
//import { } from './lessAppAPI';

// Contains methods with *no* direct dependencies on `obsidian`. These functions handle te "normal" work;
import { constructor as Action } from './processGrab';


// TODO: define in seperate file;
interface GrabSettings {
	yamlGrabbed: string;
}

// Generic defaults that are subject to change;
const DEFAULT_SETTINGS: GrabSettings = {
	yamlGrabbed: 'uri'
}

// This class allows access to the `obsidian` vault its enabled in
export default class QuickGrab extends Plugin {

	// Runs when `obsidian` loads or reloads the plugin;
	async onload() {
		// Constructs the abstracted Obsidian API layer (see `./apiAbstract.ts`);
		const api = Api(this);

		// TODO: refactor this implementation as it feels a bit tainted constructing it with `api`;
		const action = Action(api);

		// Load the saved settings; else, load the default;
		const quickGrabSettings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// TODO: create TS interface?
		// Defines a list of objects used as input for `this.addCommand`;
		const commands = [{
			id: "open-files-url",
			name: "Open Files URL",
			callback: function() {
				api.fuzzySuggestModal({ handler: action.getYAMLVal, data: { yaml: quickGrabSettings.yamlGrabbed } });
			}
		}];
		// Arrow funtion (`=>`) implies access to `this`;
		commands.forEach((command) => {
			this.addCommand(command);
		});

		// TODO: Create TS interface?;
		// TODO: `yamlGrabbed` should not be defined twice;
		// Defines a list of objects used an input for `this.addSettingTab`;
		const settingsTabTemplate = {
			header: {
				size: "h2",
				text: "Quick Grab Settings Panel"
			},
			options: {
				yamlGrabbed: {
					name: "yaml",
					desc: "The yaml variable to grab.",
					placeholder: 'yaml variable'
				}
			}
		};

		// Create a settings panel based on `settingsTabTemplate`;
		this.addSettingTab(api.pluginSettingsTab({ quickGrabSettings, settingsTabTemplate }));
	}
}
