import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetContractDetailUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: {contractId: string};
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const response = await this.contractRepo.contractDetail(
                this.params.contractId,
            );            
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
