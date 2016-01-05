import { Token } from 'phosphor-di';
import { IEditorViewModelOptions } from './viewmodel';
export * from './viewmodel';
export * from './widget';
export interface INewEditor {
    open(options: IEditorViewModelOptions): void;
}
export declare const INewEditor: Token<INewEditor>;
