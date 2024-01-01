import { ParamsGetPaymentContractDetail } from 'app/presentation/modules/Payment/ContractSettlementInformation/ContractSettlementInformation';
import { IContractRepository } from '.';
import { IUseCase } from '../../index';

export class GetPaymentContractDetailUseCase implements IUseCase {
    contractRepo: IContractRepository;
    params: ParamsGetPaymentContractDetail;
    constructor(contractRepo: IContractRepository, params: any) {
        this.contractRepo = contractRepo;
        this.params = params;
    }
    execute = async () => {
        try {
            const response = await this.contractRepo.getPaymentContractDetail(
                this.params
            );
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
