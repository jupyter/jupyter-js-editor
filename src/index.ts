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
  Signal, ISignal, clearSignalData
} from 'phosphor-signaling';

import {
  Widget, ResizeMessage
} from 'phosphor-widget';


/**
 * The interface required for an editor model.
 */
export
interface IEditorModel {
  /**
   * Saves the current data in the existing file.
   *
   * @param data - A string containing the entire data to be saved.
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
}


/**
 * An implementation of IEditorModel.
 */
export
class EditorModel implements IEditorModel {

  save(data: string) {
    // to be delegated to jupyter-js-services.
    console.log('model save');
  }

  rename(name: string) {
    // to be delegated to jupyter-js-services.
    console.log('model rename');
  }

  private _filename: string;
  private _mode: string;
  private _lineNumbers = true;
  private _tabSize = 2;
}


/**
 * An interface required for implementing the view-model
 * for an editor.
 */
export
interface IEditorViewModel {
  /**
   * Save the current text buffer to the file.
   */
  save(data: string): void;
  /**
   * Rename this file.
   */
  rename(name: string): void;
  /**
   * The mode of the editor, eg. for code this would be
   * the language, like 'python' or 'javascript'.
   */
  mode(): string;
  /**
   * Sets the view class on on the view model.
   */
  setView(view: IEditorWidget): void;
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

export
class EditorViewModel implements IDisposable, IEditorViewModel {

  /**
   * Construct an editor view model.
   */
  constructor(model: IEditorModel) {
    this._model = model;
  }

  /**
   * Set the view object for this view model.
   */
  setView(view: IEditorWidget): void {
    this._view = view;
    EditorWidget
      .getContentsChanged(this._view)
      .connect(this._startBufferTimer, this);
  }

  /**
   * Save the current buffer in the existing file.
   */
  save(): void {
    this._updateBuffer();
    this._model.save(this._buffer);
  }

  /**
   * Rename the current file.
   */
  rename(name: string): void {
    this._model.rename(name);
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
    clearSignalData(this);
    this._model = null;
    this._view = null;
  }

  /**
   * Get the disposed status of this object.
   */
  get isDisposed(): boolean {
    return this._disposed;
  }

  private _updateBuffer(): void {
    if (!this.isDisposed) {
      var data = this._view.getContents();
      this._buffer = data;
    }
  }

  private _startBufferTimer(): void {
    clearTimeout(this._bufferTimeoutId);
    //console.log("setting timeout...");
    this._bufferTimeoutId = setTimeout(() => {
      //console.log("TIMED OUT");
      this._updateBuffer();
    }, this._bufferDelay);
  }

  showLineNumbers = true;
  readOnly = true;
  tabSize = 2; // TODO

  private _mode = '';
  private _disposed = false;
  private _view: IEditorWidget = null;
  private _model: IEditorModel;
  private _buffer = '';
  /**
   * The delay in milliseconds between view buffer-fetches.
   */
  private _bufferDelay = 1000;
  /**
   * The id returned by setTimeout.
   */
  private _bufferTimeoutId = 0;
}

/**
 * The interface to fulfil in order to implement
 * an EditorWidget.
 */
export
interface IEditorWidget {
  /**
   * Get the entire contents of the current editor.
   */
  getContents(): string;
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
class EditorWidget extends Widget implements IEditorWidget {

  /**
   * A signal which is emitted when the view contents change.
   *
   * #### Notes
   * This is designed for the view-model. The data is *not* passed
   * as the signal argument in order that the view-model can decide
   * when to pull the potentially large data string from the view.
   */
  static contentsChangedSignal = new Signal<IEditorWidget, boolean>();

  /**
   * A delegate for [[contentsChangedSignal]].
   */
  static getContentsChanged(item: IEditorWidget): ISignal<IEditorWidget, boolean> {
    return EditorWidget.contentsChangedSignal.bind(item);
  }

  /**
   * Construct an EditorWidget.
   */
  constructor(vm: IEditorViewModel) {
    super();
    this.addClass('EditorWidget');

    var config = {
      mode: vm.mode(),
      lineNumbers: vm.showLineNumbers,
      tabSize: vm.tabSize
    };
    this._editor = CodeMirror(this.node, config);
    this._editor.on("change", () => {
      EditorWidget.getContentsChanged(this).emit(true);
    });

    this._viewmodel = vm;
    this._viewmodel.setView(this);
  }

  /**
   * Get the contents of the current view as a string.
   */
  getContents(): string {
    var doc = this._editor.getDoc();
    return doc.getValue();
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

  private _viewmodel: IEditorViewModel;
  private _editor: CodeMirror.Editor;
}
