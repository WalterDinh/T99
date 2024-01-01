import ResponseModel from 'app/models/common/ResponseModel';
import UserModel from 'app/models/user/UserModel';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class GetProfileUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    constructor(customerRepo: ICustomerRepository,) {
        this.customerRepo = customerRepo;
    }

    execute = async (): Promise<ResponseModel<UserModel>> => {
        try {
            const profileResp: ResponseModel<UserModel> =
                await this.customerRepo.getProfile();
            if (!!profileResp?.data) {
                this.customerRepo.setUser(profileResp?.data);
            }
            return profileResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
