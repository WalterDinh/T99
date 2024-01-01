import { SignType } from 'app/shared/constants';
import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class GetLoanListUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    params: SignType;
    constructor(loanRepo: ILoanRepository, params: SignType) {
        this.loanRepo = loanRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const listLoanResp = await this.loanRepo.getListLoan(this.params);
            return listLoanResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
