import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class GetListAssetAsyncUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    params: { assetGroupId: string, search?: string };
    constructor(loanRepo: ILoanRepository, params: any) {
        this.loanRepo = loanRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const listDataResp = await this.loanRepo.getListAssetAsync(
                this.params.assetGroupId, this.params.search,
            );
            const keys = Object.keys(listDataResp.data?.data);
            const data = keys.map((key) => ({
                label: key,
                value: listDataResp.data?.data[key],
            }));
            return data;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
