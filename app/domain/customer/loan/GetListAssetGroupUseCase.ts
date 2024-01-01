import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class GetListAssetGroupUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    data: { groupAssetType: string; assetType?: string };
    constructor(loanRepo: ILoanRepository, data: any) {
        this.loanRepo = loanRepo;
        this.data = data;
    }
    execute = async () => {
        try {
            const listResp = await this.loanRepo.getListAssetGroup(
                this.data,
            );
            return listResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
