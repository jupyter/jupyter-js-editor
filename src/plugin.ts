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
  IEditorFactory, IEditorViewModelOptions, IEditorWidget, EditorViewModel,
  CodeMirrorWidget
} from './index';


export
function resolve(container: Container): Promise<void> {
  return container.resolve(EditorHandler).then(handler => { handler.run(); });
}


export
function register(container: Container): void {
  return container.register(IEditorFactory, EditorFactory);
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


class EditorFactory {

  static requires: Token<any>[] = [];

  static create(): IEditorFactory {
    return new EditorFactory();
  }

  create(options: IEditorViewModelOptions): IEditorWidget {
    let model = new EditorViewModel(options);
    let editor = new CodeMirrorWidget(model);
    editor.title.closable = true;
    return editor;
  }

  private _shell: IAppShell;

}
