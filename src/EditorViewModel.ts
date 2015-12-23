// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  IChangedArgs, Property
} from 'phosphor-properties';

import {
  ISignal, Signal
} from 'phosphor-signaling';


/**
 * An interface required for implementing the editor model
 */
export
interface IEditorViewModel {
  /**
   * A signal emitted when the editor model state changes.
   */
  stateChanged: ISignal<IEditorViewModel, IChangedArgs<any>>

  /**
   * The text in the text editor.
   */
  text: string;

  /**
   * The mimetype of the text.
   *
   * #### Notes
   * The mimetype is used to set the syntax highlighting, for example.
   */
  mimetype: string;

  /**
   * The filename of the editor.
   */
  filename: string;

  /**
   * Whether the text editor has a fixed maximum height.
   *
   * #### Notes
   * If true, the editor has a fixed maximum height.  If false, the editor
   * resizes to fit the content.
   */
  fixedHeight: boolean;

  /**
   * A flag to determine whether to show line numbers.
   */
  lineNumbers: boolean;

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
 * Interface that must be implemented to set defaults on an EditorViewModelPrivate.
 */
export
interface IEditorViewModelOptions {
  /**
   * The initial text in the text editor.
   */
  text?: string;

  /**
   * The mimetype of the text.
   *
   * #### Notes
   * The mimetype is used to set the syntax highlighting, for example.
   */
  mimetype?: string;

  /**
   * The filename of the editor.
   */
  filename?: string;

  /**
   * Whether the text editor has a fixed maximum height.
   */
  fixedHeight?: boolean;

  /**
   * A flag to determine whether to show line numbers.
   */
  lineNumbers?: boolean;

  /**
   * A flag to determine whether to allow editing.
   */
  readOnly?: boolean;

  /**
   * The number of spaces to insert for each tab.
   */
  tabSize?: number;
}


/**
 * The data model behind the editor view.
 */
export
class EditorViewModel implements IEditorViewModel {

  /**
   * Construct an Editor Model.
   */
  constructor(options?: IEditorViewModelOptions) {
    if (options) EditorViewModelPrivate.initFrom(this, options);
  }

  /**
   * A signal emitted when the editor model state changes.
   *
   * #### Notes
   * This is a pure delegate to the [[stateChangedSignal]].
   */
  get stateChanged(): ISignal<IEditorViewModel, IChangedArgs<any>> {
    return EditorViewModelPrivate.stateChangedSignal.bind(this);
  }

  /**
   * Get the mode for the editor filename.
   */
  get filename(): string {
    return EditorViewModelPrivate.filenameProperty.get(this);
  }

  /**
   * Set the text for the editor filename.
   */
  set filename(value: string) {
    EditorViewModelPrivate.filenameProperty.set(this, value);
  }

  /**
   * Get whether the editor height should be constrained.
   */
  get fixedHeight() {
    return EditorViewModelPrivate.fixedHeightProperty.get(this);
  }

  /**
   * Set whether the editor height should be constrained.
   */
  set fixedHeight(value: boolean) {
    EditorViewModelPrivate.fixedHeightProperty.set(this, value);
  }

  /**
   * Get the mode for the editor mimetype.
   */
  get mimetype(): string {
    return EditorViewModelPrivate.mimetypeProperty.get(this);
  }

  /**
   * Set the text for the editor mimetype.
   */
  set mimetype(value: string) {
    EditorViewModelPrivate.mimetypeProperty.set(this, value);
  }

  /**
   * Get the lineNumbers flag for the editor model.
   */
  get lineNumbers(): boolean {
    return EditorViewModelPrivate.lineNumbersProperty.get(this);
  }

  /**
   * Set the lineNumbers flag for the editor model.
   */
  set lineNumbers(value: boolean) {
    EditorViewModelPrivate.lineNumbersProperty.set(this, value);
  }

  /**
   * Get the readOnly flag for the editor model.
   */
  get readOnly(): boolean {
    return EditorViewModelPrivate.readOnlyProperty.get(this);
  }

  /**
   * Set the readOnly flag for the editor model.
   */
  set readOnly(value: boolean) {
    EditorViewModelPrivate.readOnlyProperty.set(this, value);
  }

  /**
   * Get the tabSize number for the editor model.
   */
  get tabSize(): number {
    return EditorViewModelPrivate.tabSizeProperty.get(this);
  }

  /**
   * Set the tabSize number for the editor model.
   */
  set tabSize(value: number) {
    EditorViewModelPrivate.tabSizeProperty.set(this, value);
  }

  /**
   * Get the text of the editor model.
   */
  get text(): string {
    return EditorViewModelPrivate.textProperty.get(this);
  }

  /**
   * Set the text on the editor model.
   */
  set text(value: string) {
    EditorViewModelPrivate.textProperty.set(this, value);
  }
}


/**
 * The namespace for the `EditorViewModel` class private data.
 */
namespace EditorViewModelPrivate {

  /**
   * A signal emitted when the editor state changes.
   */
  export
  const stateChangedSignal = new Signal<IEditorViewModel, IChangedArgs<any>>();

  /**
   * The property descriptor for the editor mimetype.
   */
  export
  const mimetypeProperty = new Property<IEditorViewModel, string>({
    name: 'mimetype',
    value: '',
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
   * The property descriptor for the editor filename.
   */
  export
  const filenameProperty = new Property<IEditorViewModel, string>({
    name: 'filename',
    value: '',
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
  * A property descriptor which determines whether the editor height should be constrained.
  */
  export
  const fixedHeightProperty = new Property<IEditorViewModel, boolean>({
    name: 'fixedHeight',
    notify: EditorViewModelPrivate.stateChangedSignal,
    value: false,
  });

  /**
   * The property descriptor for the editor lineNumbers flag.
   */
  export
  const lineNumbersProperty = new Property<IEditorViewModel, boolean>({
    name: 'lineNumbers',
    value: true,
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
   * The property descriptor for the editor readOnly flag.
   */
  export
  const readOnlyProperty = new Property<IEditorViewModel, boolean>({
    name: 'readOnly',
    value: false,
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
   * The property descriptor for the editor text.
   */
  export
  const textProperty = new Property<IEditorViewModel, string>({
    name: 'text',
    value: '',
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
   * The property descriptor for the editor tabSize number.
   */
  export
  const tabSizeProperty = new Property<IEditorViewModel, number>({
    name: 'tabSize',
    value: 4,
    notify: EditorViewModelPrivate.stateChangedSignal
  });

  /**
   * Initialize an editor view model from an options object.
   */
  export
  function initFrom(model: EditorViewModel, options: IEditorViewModelOptions): void {
    if (options.mimetype !== void 0) {
      model.mimetype = options.mimetype;
    }
    if (options.filename !== void 0) {
      model.filename = options.filename;
    }
    if (options.fixedHeight !== void 0) {
      model.fixedHeight = options.fixedHeight;
    }
    if (options.lineNumbers !== void 0) {
      model.lineNumbers = options.lineNumbers;
    }
    if (options.readOnly !== void 0) {
      model.readOnly = options.readOnly;
    }
    if (options.text !== void 0) {
      model.text = options.text;
    }
    if (options.tabSize !== void 0) {
      model.tabSize = options.tabSize;
    }
  }

}
