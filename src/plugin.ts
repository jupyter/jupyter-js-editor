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
  IEditorFactory, IEditorViewModelOptions, IEditorViewModel,
  IEditorWidget, EditorViewModel, CodeMirrorWidget
} from './index';


/**
 * Register the plugin contributions.
 *
 * @param container - The di container for type registration.
 *
 * #### Notes
 * This is called automatically when the plugin is loaded.
 */
export
function register(container: Container): void {
  return container.register(IEditorFactory, EditorFactory);
}


/**
 * A concrete implementation of `IEditorFactory`.
 */
class EditorFactory {
  /**
   * The dependencies required by the editor factory.
   */
  static requires: Token<any>[] = [];

  /**
   * Create a new editor factory instance.
   */
  static create(): IEditorFactory {
    return new EditorFactory();
  }

  /**
   * Create a new editor view model from options.
   *
   * @param options - The initialization options for the view model.
   */
  newViewModel(options?: IEditorViewModelOptions): IEditorViewModel {
    return new EditorViewModel(options);
  }

  /**
   * Create a new editor from a view model.
   *
   * @param model - The view model for the editor.
   */
  newEditor(model: IEditorViewModel): IEditorWidget {
    let editor = new CodeMirrorWidget(model);
    editor.title.closable = true;
    return editor;
  }

  private _shell: IAppShell;

}
