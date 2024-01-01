import { IUseCase } from 'app/domain';
import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import SearchTransactionOfficeModel from 'app/models/ListTransaction/SearchTransactionOfficeModel';
import { ICommonRepository } from '..';

export class GetSearchTransactionOfficeUseCase implements IUseCase {
    commonRepo: ICommonRepository;
    params: { key: string };
    constructor(commonRepo: ICommonRepository, params: { key: string }) {
        this.commonRepo = commonRepo;
        this.params = params;
    }
    execute = async (): Promise<ResponseModel<ResponseDataModel<SearchTransactionOfficeModel[]>>> => {
        try {
            const districtsResp: ResponseModel<SearchTransactionOfficeModel[]> =
                await this.commonRepo.getSearchTransactionOffice(this.params)
            return districtsResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
