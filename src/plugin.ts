// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  IAppShell
} from 'phosphide';

import {
  Container
} from 'phosphor-di';

import {
  CodeMirrorWidget
} from './widget';

import {
  EditorViewModel
} from './viewmodel';


export
function resolve(container: Container): Promise<void> {
  return container.resolve(EditorHandler).then(handler => { handler.run(); });
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
    let view = new CodeMirrorWidget(model);
    model.filename = 'untitled.txt'
    this._shell.addToLeftArea(view, { rank: 10 });
  }

  private _shell: IAppShell;
}
