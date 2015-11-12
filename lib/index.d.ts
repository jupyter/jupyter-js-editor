import { IDisposable } from 'phosphor-disposable';
import { Message } from 'phosphor-messaging';
import { Widget, ResizeMessage } from 'phosphor-widget';
/**
 * An interface required for implementing the editor model
 */
export interface IEditorModel {
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
export interface IEditorConfigOptions {
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
export declare class EditorModel implements IDisposable, IEditorModel {
    /**
     * Construct an Editor Model.
     */
    constructor(config?: IEditorConfigOptions);
    /**
     * Updates the buffer stored in the model.
     *
     * @param value - A string containing the complete data in the view.
     */
    updateBuffer(value: string): void;
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
    private _mode;
    private _disposed;
    private _buffer;
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
export declare class EditorWidget extends Widget {
    /**
     * Construct an EditorWidget.
     */
    constructor(model: IEditorModel);
    /**
     * Set the font size in the editor.
     */
    fontSize: string;
    protected onAfterAttach(msg: Message): void;
    protected onResize(msg: ResizeMessage): void;
    private _startBufferTimer();
    private _model;
    private _editor;
    private _bufferTimeoutId;
    private _bufferDelay;
}
