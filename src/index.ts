// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  Token
} from 'phosphor-di';

import {
  Widget
} from 'phosphor-widget';

import {
  IEditorViewModelOptions
} from './viewmodel';

import {
  IEditorWidget
} from './widget';

export * from './viewmodel';
export * from './widget';


export
interface IEditorFactory {
   create(options: IEditorViewModelOptions): IEditorWidget;
}

export
const IEditorFactory = new Token<IEditorFactory>('jupyter-js-editor.IEditorFactory');
