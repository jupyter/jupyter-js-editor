import { IDisposable } from 'phosphor-disposable';
import { Message } from 'phosphor-messaging';
import { IChangedArgs, Property } from 'phosphor-properties';
import { ISignal, Signal } from 'phosphor-signaling';
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
     * A signal emitted when the editor model state changes.
     */
    changed: ISignal<EditorModel, IChangedArgs<any>>;
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
     * A signal emitted when the title state changes.
     *
     * **See also:** [[changed]]
     */
    static changedSignal: Signal<EditorModel, IChangedArgs<any>>;
    /**
     * The property descriptor for the mode text.
     *
     * This will be used to set the mode of the editor.
     *
     * The default value is an empty string.
     *
     * **See also:** [[mode]]
     */
    static modeProperty: Property<EditorModel, string>;
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
    static showLineNumbersProperty: Property<EditorModel, boolean>;
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
    static readOnlyProperty: Property<EditorModel, boolean>;
    /**
     * The property descriptor for the tabSize number.
     *
     * This determines the number of spaces to use in place of a tab.
     *
     * The default value is `2`.
     *
     * **See also** [[tabSize]]
     */
    static tabSizeProperty: Property<EditorModel, number>;
    /**
     * Construct an Editor Model.
     */
    constructor(config?: IEditorConfigOptions);
    /**
     * Get the string for the current buffer.
     */
    buffer: string;
    /**
     * A signal emitted when the editor model state changes.
     *
     * #### Notes
     * This is a pure delegate to the [[changedSignal]].
     */
    changed: ISignal<EditorModel, IChangedArgs<any>>;
    /**
     * Get the mode for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[modeProperty]].
     */
    /**
     * Set the text for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[modeProperty]].
     */
    mode: string;
    /**
     * Get the showLineNumbers flag for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[showLineNumbersProperty]].
     */
    /**
     * Set the showLineNumbers flag for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[showLineNumbersProperty]].
     */
    showLineNumbers: boolean;
    /**
     * Get the readOnly flag for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[readOnlyProperty]].
     */
    /**
     * Set the readOnly flag for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[readOnlyProperty]].
     */
    readOnly: boolean;
    /**
     * Get the tabSize number for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[tabSizeProperty]].
     */
    /**
     * Set the tabSize number for the editor model.
     *
     * #### Notes
     * This is a pure delegate to the [[tabSizeProperty]]
     */
    tabSize: number;
    /**
     * Get the disposed status of this object.
     */
    isDisposed: boolean;
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
     * Dispose of this object.
     */
    dispose(): void;
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
    protected onAfterAttach(msg: Message): void;
    protected onResize(msg: ResizeMessage): void;
    private _buildConfig();
    private _applyConfig(config);
    private _startBufferTimer();
    private _modelChanged(sender, value);
    private _model;
    private _editor;
    private _bufferTimeoutId;
    private _bufferDelay;
}
