import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetContractPayingDebtScheduleDetailUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: {id: string};
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const response = await this.contractRepo.contractPayingDebtDetailSchedule(
                this.params.id,
            );            
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
