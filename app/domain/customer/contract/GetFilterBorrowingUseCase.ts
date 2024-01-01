import { ItemContractBorrowingFilter } from 'app/presentation/redux/actions/contractBorrowing/filterBorrowing';
import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetFilterBorrowingUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: ItemContractBorrowingFilter;
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const listContractBorrowingResp =
                await this.contractRepo.getFilterBorrowing(
                    this.params
                );
            return listContractBorrowingResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
