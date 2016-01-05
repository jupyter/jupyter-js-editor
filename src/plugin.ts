// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  IAppShell
} from 'phosphide';

import {
  Container, Token
} from 'phosphor-di';

import {
  INewEditor, IEditorViewModelOptions, EditorViewModel, CodeMirrorWidget
} from './index';


export
function resolve(container: Container): Promise<void> {
  return container.resolve(EditorHandler).then(handler => { handler.run(); });
}


export
function register(container: Container): void {
  return container.register(INewEditor, NewEditor);
}


class EditorHandler {

  static requires = [IAppShell];

  static create(shell: IAppShell): EditorHandler {
    return new EditorHandler(shell);
  }

  constructor(shell: IAppShell) {
    this._shell = shell;
  }

  run(): void {
    let model = new EditorViewModel();
    let editor = new CodeMirrorWidget(model);
    model.filename = 'untitled.txt'
    editor.title.closable = true;
    this._shell.addToMainArea(editor);
  }

  private _shell: IAppShell;
}


class NewEditor {

  static requires: Token<any>[] = [IAppShell];

  static create(shell: IAppShell): INewEditor {
    return new NewEditor(shell);
  }

  constructor(shell: IAppShell) {
    this._shell = shell;
  }

  open(options: IEditorViewModelOptions) {
    let model = new EditorViewModel(options);
    let editor = new CodeMirrorWidget(model);
    editor.title.closable = true;
    this._shell.addToMainArea(editor);
  }

  private _shell: IAppShell;

}
