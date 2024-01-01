import { ITransactionRepository } from '.';
import { IUseCase } from '../../index';

export class postContractLoanExtensionUseCase implements IUseCase {
    transactionRepo: ITransactionRepository;
    body: any;
    constructor(transactionRepo: ITransactionRepository, body: any) {
        this.transactionRepo = transactionRepo;
        this.body = body;
    }
    execute = async () => {
        try {
            const resp =
                await this.transactionRepo.postRequestDisbursement(
                    this.body
                );
            return resp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
