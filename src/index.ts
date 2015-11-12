/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IDisposable
} from 'phosphor-disposable';

import {
  Message
} from 'phosphor-messaging';

import {
  Widget, ResizeMessage
} from 'phosphor-widget';


/**
 * An interface required for implementing the editor model
 */
export
interface IEditorModel {
  /**
   * Updates the buffer stored in the model.
   *
   * @param value - A string containing the complete data in the view.
   */
  updateBuffer(value: string): void;
  /**
   * Saves the current data in the existing file.
   *
   * @param data - A string containing the complete data to be saved.
   */
  save(data: string): void;
  /**
   * Renames the current file.
   *
   * @param name - A string denoting the new filename.
   *
   * #### Notes
   * This does *not* remove the existing file, it simply saves a
   * new file with the same data.
   */
  rename(name: string): void;
  /**
   * The mode of the editor, eg. for code this would be
   * the language, like 'python' or 'javascript'.
   */
  mode(): string;
  /**
   * A flag to determine whether to show line numbers.
   */
  showLineNumbers: boolean;
  /**
   * A flag to determine whether to allow editing.
   */
  readOnly: boolean;
  /**
   * The number of spaces to insert for each tab.
   */
  tabSize: number;
}


/**
 * Interface that must be implemented to set defaults on an EditorModel.
 */
export
interface IEditorConfigOptions {
  /**
   * The mode of the view, ie. 'python', 'text' or 'javascript'.
   */
  mode?: string;
  /**
   * A flag to determine whether to show line numbers.
   */
  showLineNumbers?: boolean;
  /**
   * A flag to determine whether the view is read-only.
   */
  readOnly?: boolean;
  /**
   * The number of spaces to use for a tab.
   */
  tabSize?: number;
}


/**
 * The data model behind the editor view.
 */
export
class EditorModel implements IDisposable, IEditorModel {

  /**
   * Construct an Editor Model.
   */
  constructor(config?: IEditorConfigOptions) {
    var cfg = config || {};
    this._mode = config.mode || 'python';
    this.showLineNumbers = config.showLineNumbers || true;
    this.readOnly = config.readOnly || false;
    this.tabSize = config.tabSize || 4;
  }

  /**
   * Updates the buffer stored in the model.
   *
   * @param value - A string containing the complete data in the view.
   */
  updateBuffer(value: string): void {
    if (!this.isDisposed) {
      this._buffer = value;
    }
  }

  /**
   * Save the current buffer in the existing file.
   */
  save(): void {
    // delegate to jupyter-js-services
    console.log('model save');
  }

  /**
   * Rename the current file.
   */
  rename(name: string): void {
    // delegate to jupyter-js-services
    console.log('model rename');
  }

  /**
   * The mode of the current editor.
   */
  mode(): string {
    return this._mode;
  }

  /**
   * Dispose of this object.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the disposed status of this object.
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Flag that determines whether to show line numbers.
   */
  showLineNumbers = true;

  /**
   * Flag that determines whether the view is read-only.
   */
  readOnly = true;

  /**
   * Number of spaces to use for a tab.
   */
  tabSize = 2;

  private _mode = '';
  private _disposed = false;
  private _buffer = '';
}

/**
 * A widget used for entering text/code.
 *
 * #### Notes
 * This class happens to use Codemirror as the hosted widget for
 * text entry, but Codemirror is entirely encapsulated
 * within this class. As long as the IEditorWidget interface is
 * adhered to, any other text editor widget can be easily
 * swapped in.
 */
export
class EditorWidget extends Widget {

  /**
   * Construct an EditorWidget.
   */
  constructor(model: IEditorModel) {
    super();
    this.addClass('Ph-EditorWidget');

    var config = {
      mode: model.mode(),
      lineNumbers: model.showLineNumbers,
      tabSize: model.tabSize
    };
    this._editor = CodeMirror(this.node, config);
    this._editor.on("change", () => {
      this._startBufferTimer();
    });

    this._model = model;
  }

  /**
   * Set the font size in the editor.
   */
  set fontSize(size: string) {
    (<any>(this._editor.getWrapperElement())).style["font-size"] = size;
    this._editor.refresh();
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _startBufferTimer(): void {
    clearTimeout(this._bufferTimeoutId);
    this._bufferTimeoutId = setTimeout(() => {
      var text = this._editor.getDoc().getValue();
      this._model.updateBuffer(text);
    }, this._bufferDelay);
  }

  private _model: IEditorModel;
  private _editor: CodeMirror.Editor;

  private _bufferTimeoutId = 0;
  private _bufferDelay = 1000;
}
