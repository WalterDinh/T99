import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class ForgotPasswordUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    params:  {
        fullName: string;
        identityNumber: string;
        newPassWord: string;
        phoneNumber: string;
        reNewPassWord: string;
    };
    constructor(customerRepo: ICustomerRepository, params:  {
        fullName: string;
        identityNumber: string;
        newPassWord: string;
        phoneNumber: string;
        reNewPassWord: string;
    }) {
        this.customerRepo = customerRepo;
        this.params = params;
    }

    execute = async () => {
        try {
            const response = await this.customerRepo.forgotPassword(
                this.params,
            );
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
