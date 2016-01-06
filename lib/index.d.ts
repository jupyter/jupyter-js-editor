import { IEditorModelOptions } from './model';
import { IEditorModel, IEditorWidget } from './widget';
export * from './model';
export * from './widget';
/**
 * The interface for an editor factory.
 */
export interface IEditorFactory {
    /**
     * Create an editor model given optional initialization options.
     */
    createModel(options?: IEditorModelOptions): IEditorModel;
    /**
     * Create an editor widget from a given model.
     */
    createWidget(model: IEditorModel): IEditorWidget;
}
