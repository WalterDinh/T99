import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetLisTransactionUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: { contractId: string };
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const listTransactionResp =
                await this.contractRepo.getListTransaction(
                    this.params.contractId,
                );
            return listTransactionResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
