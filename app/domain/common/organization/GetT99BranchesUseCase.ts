import { BranchesModel } from 'app/models/common/BranchesModel';
import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetT99BranchesUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    regionId: string | null;
    constructor(commonRepo: ICommonRepository, regionId: string | null) {
        this.commonRepo = commonRepo;
        this.regionId = regionId;
    }

    execute = async (): Promise<
        ResponseModel<ResponseDataModel<BranchesModel[]>>
    > => {
        try {
            const resp: ResponseModel<BranchesModel[]> =
                await this.commonRepo.getBranch(this.regionId);
            return resp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
