import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class ChangePasswordUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    params: any;
    constructor(customerRepo: ICustomerRepository, params: any = {}) {
        this.customerRepo = customerRepo;
        this.params = params;
    }

    execute = async () => {
        try {
            const response = await this.customerRepo.changePassword(
                this.params,
            );
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
