import ResponseModel from 'app/models/common/ResponseModel';

export interface StorageClient {
    getString(key: string): Promise<ResponseModel<string>>;
    putString(key: string, value: string): Promise<ResponseModel<boolean>>;
    delete(key: string): Promise<ResponseModel<boolean>>;
    clean(): Promise<ResponseModel<boolean>>;
}