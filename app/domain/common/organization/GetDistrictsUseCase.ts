import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetDistrictsUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    params: { provinceId: string };
    constructor(commonRepo: ICommonRepository, params: { provinceId: string }) {
        this.commonRepo = commonRepo;
        this.params = params;
    }

    execute = async (): Promise<ResponseModel<ResponseDataModel<OrganizationModel[]>>> => {
        try {
            const districtsResp: ResponseModel<OrganizationModel[]> =
                await this.commonRepo.getDistricts(this.params.provinceId);
            return districtsResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
