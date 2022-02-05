// This file contains functions that interact directly with `obsidian` but do *not* require a `Plugin` instance;
// As such, this file should have no good reason to contain references to `this`;

import { Notice } from 'obsidian';


// TODO: Add extra verbose console.log message;
// TODO: Add verbosity flag;
// Provides a consistant endpoint for providing users with verbose error messages;
export function raiseError(spec: { text: String }) {
	const { text } = spec;
	const message = "Plugin: quick-grab\n" + text;
	new Notice(message, 4000);
	console.error(message);
}

// If you know how to seperate access `app.vault` without extending `Plugin`, please help me out. I find it absurd that `vault` is under `Plugin`!
