/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import * as CodeMirror from 'codemirror';

import {
  IDisposable
} from 'phosphor-disposable';

import {
  Message
} from 'phosphor-messaging';

import {
  IChangedArgs, Property
} from 'phosphor-properties';

import {
  ISignal, Signal
} from 'phosphor-signaling';

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
   * A signal emitted when the editor model state changes.
   */
  changed: ISignal<EditorModel, IChangedArgs<any>>
  /**
   * The mode of the editor, eg. for code this would be
   * the language, like 'python' or 'javascript'.
   */
  mode: string;
  /**
   * The current state of the buffer.
   */
  buffer: string;
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
   * A signal emitted when the title state changes.
   *
   * **See also:** [[changed]]
   */
  static changedSignal = new Signal<EditorModel, IChangedArgs<any>>();

  /**
   * The property descriptor for the mode text.
   *
   * This will be used to set the mode of the editor.
   *
   * The default value is an empty string.
   *
   * **See also:** [[mode]]
   */
  static modeProperty = new Property<EditorModel, string>({
    name: 'mode',
    value: '',
    notify: EditorModel.changedSignal
  });

  /**
   * The property descriptor for the showLineNumbers flag.
   *
   * This will be used to set whether line numbers are visible
   * in the editor.
   *
   * The default value is `true`.
   *
   * **See also:** [[showLineNumbers]]
   */
  static showLineNumbersProperty = new Property<EditorModel, boolean>({
    name: 'showLineNumbers',
    value: true,
    notify: EditorModel.changedSignal
  });

  /**
   * The property descriptor for the readOnly flag.
   *
   * This will be used to set whether the editor is read-only,
   * or if it is editable.
   *
   * The default value is `false`.
   *
   * **See also:** [[readOnly]]
   */
  static readOnlyProperty = new Property<EditorModel, boolean>({
    name: 'readOnly',
    value: false,
    notify: EditorModel.changedSignal
  });

  /**
   * The property descriptor for the tabSize number.
   *
   * This determines the number of spaces to use in place of a tab.
   *
   * The default value is `2`.
   *
   * **See also** [[tabSize]]
   */
  static tabSizeProperty = new Property<EditorModel, number>({
    name: 'tabSize',
    value: 2,
    notify: EditorModel.changedSignal
  });

  /**
   * Construct an Editor Model.
   */
  constructor(config?: IEditorConfigOptions) {
    var cfg = config || {};
    this.mode = cfg.mode || '';
    this.showLineNumbers = cfg.showLineNumbers || true;
    this.readOnly = cfg.readOnly || false;
    this.tabSize = cfg.tabSize || 4;
  }

  /**
   * Get the string for the current buffer.
   */
  get buffer(): string {
    return this._buffer;
  }

  /**
   * A signal emitted when the editor model state changes.
   *
   * #### Notes
   * This is a pure delegate to the [[changedSignal]].
   */
  get changed(): ISignal<EditorModel, IChangedArgs<any>> {
    return EditorModel.changedSignal.bind(this);
  }

  /**
   * Get the mode for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[modeProperty]].
   */
  get mode(): string {
    return EditorModel.modeProperty.get(this);
  }

  /**
   * Set the text for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[modeProperty]].
   */
  set mode(value: string) {
    EditorModel.modeProperty.set(this, value);
  }

  /**
   * Get the showLineNumbers flag for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[showLineNumbersProperty]].
   */
  get showLineNumbers(): boolean {
    return EditorModel.showLineNumbersProperty.get(this);
  }

  /**
   * Set the showLineNumbers flag for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[showLineNumbersProperty]].
   */
  set showLineNumbers(value: boolean) {
    EditorModel.showLineNumbersProperty.set(this, value);
  }

  /**
   * Get the readOnly flag for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[readOnlyProperty]].
   */
  get readOnly(): boolean {
    return EditorModel.readOnlyProperty.get(this);
  }

  /**
   * Set the readOnly flag for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[readOnlyProperty]].
   */
  set readOnly(value: boolean) {
    EditorModel.readOnlyProperty.set(this, value);
  }

  /**
   * Get the tabSize number for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[tabSizeProperty]].
   */
  get tabSize(): number {
    return EditorModel.tabSizeProperty.get(this);
  }

  /**
   * Set the tabSize number for the editor model.
   *
   * #### Notes
   * This is a pure delegate to the [[tabSizeProperty]]
   */
  set tabSize(value: number) {
    EditorModel.tabSizeProperty.set(this, value);
  }

  /**
   * Get the disposed status of this object.
   */
  get isDisposed(): boolean {
    return this._disposed;
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
   * Dispose of this object.
   */
  dispose(): void {
    this._disposed = true;
  }

  private _disposed = false;
  private _buffer = '';
}


/**
 * A widget used for entering text/code.
 *
 * #### Notes
 * This class happens to use Codemirror as the hosted widget for
 * text entry, but Codemirror is entirely encapsulated
 * within this class so any other text editor widget can be easily
 * swapped in.
 */
export
class EditorWidget extends Widget {

  /**
   * Construct an EditorWidget.
   */
  constructor(model: IEditorModel) {
    super();
    this.addClass('jp-EditorWidget');
    this._model = model;
    this._model.changed.connect(this._modelChanged);

    var config = this._buildConfig();
    this._editor = CodeMirror(this.node, config);
    this._editor.on("change", () => {
      this._startBufferTimer();
    });
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

  private _buildConfig(): any {
    return {
      mode: this._model.mode,
      lineNumbers: this._model.showLineNumbers,
      tabSize: this._model.tabSize
    };
  }

  private _applyConfig(config: any) {
    config.value = this._model.buffer;
    this._editor = CodeMirror(this.node, config);
    this._editor.on("change", () => {
      this._startBufferTimer();
    });
  }

  private _startBufferTimer(): void {
    clearTimeout(this._bufferTimeoutId);
    this._bufferTimeoutId = setTimeout(() => {
      var text = this._editor.getDoc().getValue();
      this._model.updateBuffer(text);
    }, this._bufferDelay);
  }

  private _modelChanged(sender: IEditorModel, value: IChangedArgs<any>) {
    var config = this._buildConfig();
    this._applyConfig(config);
  }

  private _model: IEditorModel;
  private _editor: CodeMirror.Editor;

  private _bufferTimeoutId = 0;
  private _bufferDelay = 1000;
}
