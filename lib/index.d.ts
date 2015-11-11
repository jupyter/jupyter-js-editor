import { IDisposable } from 'phosphor-disposable';
import { Message } from 'phosphor-messaging';
import { Signal, ISignal } from 'phosphor-signaling';
import { Widget, ResizeMessage } from 'phosphor-widget';
/**
 * The interface required for an editor model.
 */
export interface IEditorModel {
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
}
/**
 * An implementation of IEditorModel.
 */
export declare class EditorModel implements IEditorModel {
    /**
     * Save the data to file.
     */
    save(data: string): void;
    /**
     * Rename the current file.
     */
    rename(name: string): void;
    private _filename;
    private _mode;
    private _lineNumbers;
    private _tabSize;
}
/**
 * An interface required for implementing the view-model
 * for an editor.
 */
export interface IEditorViewModel {
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
export declare class EditorViewModel implements IDisposable, IEditorViewModel {
    /**
     * Construct an editor view model.
     */
    constructor(model: IEditorModel);
    /**
     * Set the view object for this view model.
     */
    setView(view: IEditorWidget): void;
    /**
     * Save the current buffer in the existing file.
     */
    save(): void;
    /**
     * Rename the current file.
     */
    rename(name: string): void;
    /**
     * The mode of the current editor.
     */
    mode(): string;
    /**
     * Dispose of this object.
     */
    dispose(): void;
    /**
     * Get the disposed status of this object.
     */
    isDisposed: boolean;
    /**
     * Flag that determines whether to show line numbers.
     */
    showLineNumbers: boolean;
    /**
     * Flag that determines whether the view is read-only.
     */
    readOnly: boolean;
    /**
     * Number of spaces to use for a tab.
     */
    tabSize: number;
    private _updateBuffer();
    private _startBufferTimer();
    private _mode;
    private _disposed;
    private _view;
    private _model;
    private _buffer;
    /**
     * The delay in milliseconds between view buffer-fetches.
     */
    private _bufferDelay;
    /**
     * The id returned by setTimeout.
     */
    private _bufferTimeoutId;
}
/**
 * The interface to fulfil in order to implement
 * an EditorWidget.
 */
export interface IEditorWidget {
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
export declare class EditorWidget extends Widget implements IEditorWidget {
    /**
     * A signal which is emitted when the view contents change.
     *
     * #### Notes
     * This is designed for the view-model. The data is *not* passed
     * as the signal argument in order that the view-model can decide
     * when to pull the potentially large data string from the view.
     */
    static contentsChangedSignal: Signal<IEditorWidget, boolean>;
    /**
     * A pure delegate for [[contentsChangedSignal]].
     */
    static getContentsChanged(item: IEditorWidget): ISignal<IEditorWidget, boolean>;
    /**
     * Construct an EditorWidget.
     */
    constructor(vm: IEditorViewModel);
    /**
     * Get the contents of the current view as a string.
     */
    getContents(): string;
    /**
     * Set the font size in the editor.
     */
    fontSize: string;
    protected onAfterAttach(msg: Message): void;
    protected onResize(msg: ResizeMessage): void;
    private _viewmodel;
    private _editor;
}
