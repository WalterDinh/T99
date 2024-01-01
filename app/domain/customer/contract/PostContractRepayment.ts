import { BodyContractChangeRepayment } from 'app/presentation/modules/ContractManagement/BorrowingContract';
import { ItemContractBorrowingFilter } from 'app/presentation/redux/actions/contractBorrowing/filterBorrowing';
import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class postContractRepaymentUseCase implements IUseCase {
    contractRepo: IContractRepository;
    body: BodyContractChangeRepayment;
    constructor(contractRepo: IContractRepository, body: any) {
        this.contractRepo = contractRepo;
        this.body = body;
    }
    execute = async () => {
        try {
            const contractRepaymentResp =
                await this.contractRepo.postContractChangeRepayment(
                    this.body
                );
            return contractRepaymentResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
