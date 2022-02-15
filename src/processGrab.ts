import { raiseError } from './lessAppAPI';

// TODO: Properly implement TS types; TODO: TS types should not form a dependency loop!
export function constructor(api: any, settings: any) {
	const { getYaml } = api;

	// TODO: refactor this whole funtion. Possibly combine with `getYAMLVal`;
	const process = function (item: String, evt: MouseEvent | KeyboardEvent) {
		// TODO: rework flow to avoid hard coded values;
		if (evt.altKey == true) {
			// not implemented
			return
		} else {
			return openURL(item);
		}
	}

	// Finds and opens the first URL in a string; else, `raiseError`;
	const openURL = function (text: String): void {
		// TODO: regex should have a rebust default and be configurable
		//const rTest = /https?:\/\/(?:[A-Za-z0-9]+\.)+[A-Za-z]+(?:\/[\w\d.]*)*(?:#[\w]*)?\??(?:[\w-]*=[\w\d+-]*&?)*/;
		// TODO: Refactor;
		const rTest = new RegExp(settings.urlRegex);
		console.log(rTest);
		const URL = rTest.exec(text);
		//pass/fail
		if (URL) {
			// TODO: Check if `window.open` is the proper method to use;
			window.open(URL[0]);
		} else {
			raiseError({text: "No URL was found within provided string"});
		}
	}
	// A mostly pointless function that pipes a yaml value returned by `getYaml()` into `openURL`;
	// TODO: Refactor me;
	const getYAMLVal = function (item: string, evt: MouseEvent | KeyboardEvent, data: any): void {
		const { yaml } = data;
		const frontmatter = getYaml(item);
		if (typeof(frontmatter[yaml]) == 'string')  {
			process(frontmatter[yaml], evt); // pass/fail
		} else {
			raiseError({text: `YAML value, '${yaml}', was not set in file.`});
		}
	}

	//const addToClipBoard function(text: String) {
	// not implemented
	//}

	// Export relevant functions to be executed else where;
	return Object.freeze({
		getYAMLVal
	});
}
