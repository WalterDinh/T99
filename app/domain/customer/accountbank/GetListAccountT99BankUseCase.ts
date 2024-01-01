import { IAccountBankRepository } from '.';
import { IUseCase } from '../../index';

export class GetListAccountT99BankUseCase implements IUseCase {
    accountBankRepo: IAccountBankRepository;
    constructor(accountBankRepo: IAccountBankRepository) {
        this.accountBankRepo = accountBankRepo;
    }
    execute = async () => {
        try {
            const listTransactionResp =
                await this.accountBankRepo.getListAccountBank({
                    accountBankCustomerType: 2,
                });

            return listTransactionResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
