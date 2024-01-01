import { ItemContractBorrowingFilter } from 'app/presentation/redux/actions/contractBorrowing/filterBorrowing';
import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class postContractLoanExtensionUseCase implements IUseCase {
    contractRepo: IContractRepository;
    body: ItemContractBorrowingFilter;
    constructor(contractRepo: IContractRepository, body: any) {
        this.contractRepo = contractRepo;
        this.body = body;
    }
    execute = async () => {
        try {
            const listContractBorrowingResp =
                await this.contractRepo.postContractLoanExtension(
                    this.body
                );
            return listContractBorrowingResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
