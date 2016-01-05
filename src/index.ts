// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  Token
} from 'phosphor-di';

import {
  IEditorViewModelOptions
} from './viewmodel';

export * from './viewmodel';
export * from './widget';


export
interface INewEditor {
   open(options: IEditorViewModelOptions): void;
}

export
const INewEditor = new Token<INewEditor>('jupyter-js-editor.INewEditor');
