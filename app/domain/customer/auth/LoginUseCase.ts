import { StorageGatewayFactory } from 'app/data/gateway/storage';
import ResponseModel from 'app/models/common/ResponseModel';
import LoginModel from 'app/models/user/LoginModel';
import UserModel from 'app/models/user/UserModel';
import { User } from 'app/shared/constants';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class LoginUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    params: any;
    constructor(customerRepo: ICustomerRepository, params: any = {}) {
        this.customerRepo = customerRepo;
        this.params = params;
    }

    execute = async (): Promise<ResponseModel<UserModel>> => {
        try {
            const response = await this.customerRepo.loginUser(this.params);
            const loginData = LoginModel.parseFromJson(response.data);
            const storageClient =
                StorageGatewayFactory.createWithSecureClient();

            await this.customerRepo.setCustomerToken(
                loginData.accessToken,
                loginData.refreshToken,
                loginData.tokenType,
            );

            const profileResp: ResponseModel<UserModel> =
                await this.customerRepo.getProfile();
            const iDBiometric = await storageClient.doGet(User.IDBiometric);
            if (iDBiometric.data != profileResp.data?.cif) {
                storageClient.doDelete(User.IDBiometric);
            }
            await this.customerRepo.setDataLogin(this.params);
            if (profileResp.data) {
                this.customerRepo.setUser(profileResp.data);
            }
            return profileResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
