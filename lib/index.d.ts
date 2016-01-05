import { Token } from 'phosphor-di';
import { IEditorViewModelOptions, IEditorViewModel } from './viewmodel';
import { IEditorWidget } from './widget';
export * from './viewmodel';
export * from './widget';
/**
 * A factory for creating editor view models and widgets.
 */
export interface IEditorFactory {
    /**
     * Create a new editor view model from options.
     *
     * @param options - The initialization options for the view model.
     */
    newViewModel(options?: IEditorViewModelOptions): IEditorViewModel;
    /**
     * Create a new editor from a view model.
     *
     * @param model - The view model for the editor.
     */
    newEditor(model: IEditorViewModel): IEditorWidget;
}
/**
 * The dependency token for the `IEditorFactory` interface.
 */
export declare const IEditorFactory: Token<IEditorFactory>;
