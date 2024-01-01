import {ICustomerRepository} from '..';
import {IUseCase} from '../../index';

export default class LogoutUseCase implements IUseCase {
    customerRepo: ICustomerRepository;

    constructor(customerRepo: ICustomerRepository) {
        this.customerRepo = customerRepo;
    }

    execute = () => Promise.all([this.customerRepo.logoutUser()]);
}