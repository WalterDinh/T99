import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { TransactionOfficeModel } from 'app/models/common/TransactionOfficeModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetT99TransactionOfficesUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    branchId: string;
    constructor(commonRepo: ICommonRepository, branchId: string) {
        this.commonRepo = commonRepo;
        this.branchId = branchId;
    }

    execute = async (): Promise<
        ResponseModel<ResponseDataModel<TransactionOfficeModel[]>>
    > => {
        try {
            const resp: ResponseModel<TransactionOfficeModel[]> =
                await this.commonRepo.getT99Office(this.branchId);
            return resp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
