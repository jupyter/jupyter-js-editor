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
  IEditorViewModelOptions, IEditorViewModel
} from './viewmodel';

import {
  IEditorWidget
} from './widget';

export * from './viewmodel';
export * from './widget';


/**
 * A factory for creating editor view models and widgets.
 */
export
interface IEditorFactory {
  /**
   * Create a new editor view model from options.
   *
   * @param options - The initialization options for the view model.
   */
  newViewModel(options?: IEditorViewModelOptions): IEditorViewModel;

  /**
   * Create a new editor from a view model.
   *
   * @param model - The view model for the editor.
   */
  newEditor(model: IEditorViewModel): IEditorWidget;
}


/**
 * The dependency token for the `IEditorFactory` interface.
 */
export
const IEditorFactory = new Token<IEditorFactory>('jupyter-js-editor.IEditorFactory');
