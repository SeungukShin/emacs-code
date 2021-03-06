import * as vscode from 'vscode';
import * as path from 'path';
import { Execute } from './execute';
import { Config } from './config';
import { Log } from './log';
import { FindFile } from './findFile';

enum EmacsMode {
	none = 'none',
	line = 'line',
	column = 'column'
}

export class Emacs implements vscode.Disposable {
	private config: Config;
	private log: Log;
	private mode: EmacsMode;

	constructor(context: vscode.ExtensionContext) {
		this.config = Config.getInstance();
		this.log = Log.getInstance();

		// add context
		vscode.commands.executeCommand('setContext', 'emacsMode', EmacsMode.none);
		this.mode = EmacsMode.none;

		// Register Commands
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.find.file', () => this.findFile()));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.clear.mode', () => this.toggleMode(EmacsMode.none)));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.toggle.mode.line', () => this.toggleMode(EmacsMode.line)));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.toggle.mode.column', () => this.toggleMode(EmacsMode.column)));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.copy', () => this.copy()));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.kill', () => this.kill()));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.kill.line', () => this.killLine()));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.search.forward', () => this.search('search forward: ')));
		context.subscriptions.push(vscode.commands.registerCommand('emacs-code.search.backward', () => this.search('search backward: ')));
	}

	dispose(): void {
	}

	async toggleMode(mode: EmacsMode): Promise<void> {
		await vscode.commands.executeCommand('cancelSelection');
		const toMode = (this.mode == mode) ? EmacsMode.none : mode;
		await vscode.commands.executeCommand('setContext', 'emacsMode', toMode);
		this.mode = toMode;
		vscode.window.setStatusBarMessage('emacs: ' + this.mode, 5000);
		return Promise.resolve();
	}

	async copy(): Promise<void> {
		await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
		await this.toggleMode(EmacsMode.none);
		return Promise.resolve();
	}

	async kill(): Promise<void> {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			if (!selection.isEmpty) {
				const text = editor.document.getText(selection);
				await vscode.env.clipboard.writeText(text);
				await editor.edit((editBuilder) => {
					editBuilder.delete(selection);
				});
			}
		}
//		await vscode.commands.executeCommand('editor.action.clipboardCutAction');
		await this.toggleMode(EmacsMode.none);
		return Promise.resolve();
	}

	async killLine(): Promise<void> {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			await vscode.commands.executeCommand('cancelSelection');
			await vscode.commands.executeCommand('cursorEndSelect');
			const document = editor.document;
			const selection = editor.selection;
			if (selection.isEmpty) {
				await vscode.commands.executeCommand('deleteRight');
			} else {
				await vscode.commands.executeCommand('editor.action.clipboardCutAction');
			}
		}
		return Promise.resolve();
	}

	private findWord(): string {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			const msg: string = 'Cannot find Active Text Editor.';
			this.log.err(msg);
			vscode.window.showInformationMessage(msg);
			return '';
		}
		const document = editor.document;
		const selection = editor.selection;
		if (!selection.isEmpty) {
			return document.getText(selection);
		}
		const range = document.getWordRangeAtPosition(selection.active);
		if (!range) {
			return '';
		}
		return document.getText(range);
	}

	search(prompt: string, word: string | undefined = undefined): void {
		if (word == undefined) {
			word = this.findWord();
		}
		vscode.window.setStatusBarMessage(prompt + word);
	}

	private async getCurrentDirectory(): Promise<string> {
		let currentDirectory = '';

		// opened file
		const file = vscode.window.activeTextEditor?.document?.uri.fsPath;
		if (file !== undefined) {
			await vscode.workspace.fs.stat(vscode.Uri.file(file)).then((value) => {
				currentDirectory = path.dirname(file);
			}, (reason) => {
			});
		}

		// predefined directories
		if (currentDirectory === '') {
			if (vscode.workspace.workspaceFolders) {
				currentDirectory = vscode.workspace.workspaceFolders[0].uri.fsPath;
			} else if (process.env.home) {
				currentDirectory = process.env.home;
			} else {
				currentDirectory = vscode.env.appRoot;
			}
		}

		return new Promise<string>((resolve, reject) => resolve(currentDirectory));
	}

	async findFile(): Promise<void> {
		const currentDirectory = await this.getCurrentDirectory();
		const findFile = new FindFile(currentDirectory);
		await findFile.prepare();
		const result = await findFile.show();
		if (result !== undefined) {
			const file = vscode.Uri.file(result);
			const stat = await vscode.workspace.fs.stat(file);
			if (stat.type & vscode.FileType.Directory) {
				await vscode.commands.executeCommand('vscode.openFolder', file);
			} else {
				await vscode.window.showTextDocument(file);
			}
			findFile.dispose();
			Promise.resolve();
		}
	}
}

let emacs: Emacs | undefined;

export function activate(context: vscode.ExtensionContext): void {
	emacs = new Emacs(context);
	console.log('"emacs-code" is now active!');
}

export function deactivate(): void {
	if (emacs) {
		emacs.dispose();
		emacs = undefined;
	}
	console.log('"emacs-code" is now inactive!');
}