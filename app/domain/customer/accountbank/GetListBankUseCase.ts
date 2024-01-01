import { IAccountBankRepository } from '.';
import { IUseCase } from '../../index';

export class GetListBankUseCase implements IUseCase {
    bankRepo: IAccountBankRepository;
    constructor(bankRepo: IAccountBankRepository) {
        this.bankRepo = bankRepo;
    }
    execute = async () => {
        try {
            const listBankResp = await this.bankRepo.getListBank();
            return listBankResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
