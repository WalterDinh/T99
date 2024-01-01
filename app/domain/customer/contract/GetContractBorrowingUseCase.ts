import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetContractBorrowingUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: {
        ContractStatusType: any;
        AssetType: number;
        PageIndex: number;
        PageSize: number;
    };
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const listContractBorrowingResp =
                await this.contractRepo.getContractBorrowing(
                    this.params
                );
            return listContractBorrowingResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
