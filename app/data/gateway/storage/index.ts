import ResponseModel from '../../../models/common/ResponseModel';
import {DefaultStorageClient} from './defaultClient';
import {SecureStorageClient} from './secureClient';
import {StorageClient} from './storageClient';

export class StorageGateway {
    _client: StorageClient;

    constructor(client: StorageClient) {
        this._client = client;
    }

    doGet = (key: string): Promise<ResponseModel<string>> => {
        return this._client.getString(key);
    };

    doGetJson = async (key: string): Promise<ResponseModel<any>> => {
        const rawData = (await this._client.getString(key)).data;
        return ResponseModel.createSuccess(rawData ? JSON.parse(rawData) : undefined);
    };

    doUpdate = (key: string, value: string): Promise<ResponseModel<boolean>> => {
        return this._client.putString(key, value);
    };

    doUpdateJson = (key: string, value: any): Promise<ResponseModel<boolean>> => {
        return this._client.putString(key, JSON.stringify(value));
    };

    doDelete(key: string): Promise<ResponseModel<boolean>> {
        return this._client.delete(key);
    }

    doClean(): Promise<ResponseModel<boolean>> {
        return this._client.clean();
    }
}

export class StorageGatewayFactory {
    static createWithDefaultClient = (): StorageGateway => {
        return new StorageGateway(new DefaultStorageClient());
    }

    static createWithSecureClient = (): StorageGateway => {
        return new StorageGateway(new SecureStorageClient());
    }
}