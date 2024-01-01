import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class GetEkycUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    constructor(customerRepo: ICustomerRepository,) {
        this.customerRepo = customerRepo;
    }

    execute = async (): Promise<ResponseModel<ResponseDataModel<VerifyUserEkycDataModel>>> => {
        try {
            const ekycStatusRes: ResponseModel<ResponseDataModel<VerifyUserEkycDataModel>> =
                await this.customerRepo.getEkycStatus();
            return ekycStatusRes;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
