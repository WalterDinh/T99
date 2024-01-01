import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class GetListAssetPictureUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    data: { groupAssetType: string };
    constructor(loanRepo: ILoanRepository, data: any) {
        this.loanRepo = loanRepo;
        this.data = data;
    }
    execute = async () => {
        try {
            const listTransactionResp = await this.loanRepo.getListAssetPicture(
                this.data,
            );
            return listTransactionResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
