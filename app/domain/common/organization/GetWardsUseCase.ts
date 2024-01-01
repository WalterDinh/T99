import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetWardsUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    params: { districtId: string };
    constructor(commonRepo: ICommonRepository, params: { districtId: string }) {
        this.commonRepo = commonRepo;
        this.params = params;
    }

    execute = async (): Promise<ResponseModel<ResponseDataModel<OrganizationModel[]>>> => {
        try {
            const wardsResp: ResponseModel<OrganizationModel[]> =
                await this.commonRepo.getWards(this.params.districtId);
            return wardsResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
