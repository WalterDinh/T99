import { ItemContractInterestDucation } from 'app/presentation/redux/actions/contractInterestDuration/contractInteresDucation';
import { ItemContractBorrowingFilter } from 'app/presentation/redux/actions/contractBorrowing/filterBorrowing';
import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class postContractInterestDurationUseCase implements IUseCase {
    contractRepo: IContractRepository;
    body: ItemContractInterestDucation;
    constructor(contractRepo: IContractRepository, body: any) {
        this.contractRepo = contractRepo;
        this.body = body;
    }
    execute = async () => {
        try {
            const contractInterestDucationResp =
                await this.contractRepo.postContractInterestDuration(
                    this.body
                );
            return contractInterestDucationResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
