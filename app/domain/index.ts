export interface IUseCase {
    execute: () => Promise<any> | Promise<any>[];
}