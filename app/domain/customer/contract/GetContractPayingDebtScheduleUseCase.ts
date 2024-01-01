import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetContractPayingDebtScheduleUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: {contractId: string};
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const response = await this.contractRepo.contractPayingDebtSchedule(
                this.params.contractId,
            );            
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
