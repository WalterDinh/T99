import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import VerificationIncomeModel from 'app/models/Verification/VerificationIncomeModel';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class GetVerificationIncomeUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    constructor(customerRepo: ICustomerRepository) {
        this.customerRepo = customerRepo;
    }

    execute = async (): Promise<
        ResponseModel<ResponseDataModel<VerificationIncomeModel[]>>
    > => {
        try {
            const verificationIncomeResp =
                await this.customerRepo.getVerificationIncome();
            return verificationIncomeResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
