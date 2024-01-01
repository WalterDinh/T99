import { OrganizationModel } from 'app/models/common/OrganizationModel';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { ICommonRepository } from '..';
import { IUseCase } from '../../index';

export class GetProvincesUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    constructor(commonRepo: ICommonRepository) {
        this.commonRepo = commonRepo;
    }

    execute = async (): Promise<ResponseModel<ResponseDataModel<OrganizationModel[]>>> => {
        try {
            const provinceResp: ResponseModel<OrganizationModel[]> =
                await this.commonRepo.getProvinces();
            return provinceResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
