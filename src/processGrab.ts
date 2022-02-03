export function process(string: String, evt: MouseEvent | KeyboardEvent) {
	// TODO: rework flow to avoid hard coded values;
	if (evt.altKey == true) {
		// not implemented
		return
	} else {
		return openURL(string);
	}
}


// Finds and opens the first URL in a string; else, returns `-1`;
function openURL(string: String) {
	// TODO: regex should have a rebust default and be configurable
	const rTest = /^https?:\/\/(?:[A-Za-z]*\.){1,}[A-Za-z]{2,3}/;
	const URL = rTest.exec(string));
	if (URL) {
		window.open(URL);
		return 1; //pass
	} else {
		return -1; //fail
	}
}

// not implemented
//function addToClipBoard {
//}
