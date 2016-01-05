import { Message } from 'phosphor-messaging';
import { IChangedArgs } from 'phosphor-properties';
import { ResizeMessage, Widget } from 'phosphor-widget';
import { IEditorViewModel } from './EditorViewModel';
/**
 * A widget which hosts a CodeMirror editor.
 */
export declare class CodeMirrorWidget extends Widget {
    /**
     * Construct a CodeMirror widget.
     */
    constructor(model: IEditorViewModel);
    /**
     * Update whether the editor has a fixed maximum height.
     */
    protected updateFixedHeight(fixedHeight: boolean): void;
    /**
     * Update the text in the widget.
     *
     * #### Notes
     * This function attempts to restore the cursor to the correct
     * place by using the bitap algorithm to find the corresponding
     * position of the cursor in the new text.
     */
    protected updateText(text: string): void;
    /**
     * Set the mode by given the mimetype.
     *
     * #### Notes
     * Valid mimetypes are listed in https://github.com/codemirror/CodeMirror/blob/master/mode/meta.js.
     */
    protected updateMimetype(mimetype: string): void;
    /**
     * Set the mode by the given filename if the mimetype is not set.
     */
    protected updateFilename(filename: string): void;
    /**
     * Set the tab size.
     */
    protected updateTabSize(size: number): void;
    /**
     * Update whether line numbers are shown.
     */
    protected updateLineNumbers(lineNumbers: boolean): void;
    /**
     * Update the read only property of the editor.
     */
    protected updateReadOnly(readOnly: boolean): void;
    /**
     * Handle afterAttach messages.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    protected onAfterShow(msg: Message): void;
    /**
     * Handle resize messages.
     */
    protected onResize(msg: ResizeMessage): void;
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * Change handler for model updates.
     */
    protected onModelStateChanged(sender: IEditorViewModel, args: IChangedArgs<any>): void;
    /**
     * Load and set a CodeMirror mode.
     *
     * #### Notes
     * This assumes WebPack as the module loader.
     * It can be overriden by subclasses.
     */
    protected loadCodeMirrorMode(mode: string): void;
    private _editor;
    private _model;
    private _dirty;
}
