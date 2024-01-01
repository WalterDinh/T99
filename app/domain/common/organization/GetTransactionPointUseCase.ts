import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import TransactionPointModel from 'app/models/ListTransaction/TransactionPointModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetTransactionPointUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    params: {
        lat: number;
        lng: number;
    };
    constructor(
        commonRepo: ICommonRepository,
        params: { lat: number; lng: number },
    ) {
        this.commonRepo = commonRepo;
        this.params = params;
    }

    execute = async (): Promise<
        ResponseModel<ResponseDataModel<TransactionPointModel>>
    > => {
        try {
            const districtsResp: ResponseModel<TransactionPointModel> =
                await this.commonRepo.getTransactionPoint(this.params)
            return districtsResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
