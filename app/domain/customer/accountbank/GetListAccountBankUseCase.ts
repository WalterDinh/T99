import { IAccountBankRepository } from '.';
import { IUseCase } from '../../index';

export class GetListAccountBankUseCase implements IUseCase {
    accountBankRepo: IAccountBankRepository;
    constructor(accountBankRepo: IAccountBankRepository) {
        this.accountBankRepo = accountBankRepo;
    }
    execute = async () => {
        try {
            const listTransactionResp =
                await this.accountBankRepo.getListAccountBank({
                    accountBankCustomerType: 1,
                });

            listTransactionResp.data?.data?.sort(
                (a: any, b: any) => -a.isSetDefault + b.isSetDefault,
            );

            return listTransactionResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
