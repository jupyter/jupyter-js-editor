import { IChangedArgs } from 'phosphor-properties';
import { ISignal } from 'phosphor-signaling';
/**
 * An interface required for implementing the editor model
 */
export interface IEditorViewModel {
    /**
     * A signal emitted when the editor model state changes.
     */
    stateChanged: ISignal<IEditorViewModel, IChangedArgs<any>>;
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
export interface IEditorViewModelOptions {
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
export declare class EditorViewModel implements IEditorViewModel {
    /**
     * Construct an Editor Model.
     */
    constructor(options?: IEditorViewModelOptions);
    /**
     * A signal emitted when the editor model state changes.
     *
     * #### Notes
     * This is a pure delegate to the [[stateChangedSignal]].
     */
    stateChanged: ISignal<IEditorViewModel, IChangedArgs<any>>;
    /**
     * Get the mode for the editor filename.
     */
    /**
     * Set the text for the editor filename.
     */
    filename: string;
    /**
     * Get whether the editor height should be constrained.
     */
    /**
     * Set whether the editor height should be constrained.
     */
    fixedHeight: boolean;
    /**
     * Get the mode for the editor mimetype.
     */
    /**
     * Set the text for the editor mimetype.
     */
    mimetype: string;
    /**
     * Get the lineNumbers flag for the editor model.
     */
    /**
     * Set the lineNumbers flag for the editor model.
     */
    lineNumbers: boolean;
    /**
     * Get the readOnly flag for the editor model.
     */
    /**
     * Set the readOnly flag for the editor model.
     */
    readOnly: boolean;
    /**
     * Get the tabSize number for the editor model.
     */
    /**
     * Set the tabSize number for the editor model.
     */
    tabSize: number;
    /**
     * Get the text of the editor model.
     */
    /**
     * Set the text on the editor model.
     */
    text: string;
}
