import { Token } from 'phosphor-di';
import { IEditorViewModelOptions } from './viewmodel';
import { IEditorWidget } from './widget';
export * from './viewmodel';
export * from './widget';
export interface IEditorFactory {
    create(options: IEditorViewModelOptions): IEditorWidget;
}
export declare const IEditorFactory: Token<IEditorFactory>;
