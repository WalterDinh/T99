import ResponseModel from 'app/models/common/ResponseModel';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StorageClient} from './storageClient';

export class SecureStorageClient implements StorageClient {
    getString = async (key: string): Promise<ResponseModel<string>> => {
        const data = await EncryptedStorage.getItem(key);
        return ResponseModel.createSuccess(data);
    }

    putString = async (key: string, value: string): Promise<ResponseModel<boolean>> => {
        await EncryptedStorage.setItem(key, value);
        return ResponseModel.createSuccess(true);
    }

    delete = async (key: string): Promise<ResponseModel<boolean>> => {
        await EncryptedStorage.removeItem(key);
        return ResponseModel.createSuccess(true);
    }

    clean = async (): Promise<ResponseModel<boolean>> => {
        await EncryptedStorage.clear();
        return ResponseModel.createSuccess(true);
    }

}