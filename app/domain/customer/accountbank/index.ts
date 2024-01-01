import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import ListBankModel from 'app/models/AccountBank/ListBankModel';

export interface IAccountBankRepository {
    getListAccountBank: ({
        accountBankCustomerType,
    }: {
        accountBankCustomerType: number;
    }) => Promise<
        ResponseModel<ResponseDataModel<ListAccountBankModel[]>>
    >;
    getListBank: () => Promise<ResponseModel<ResponseDataModel<ListBankModel[]>>>;
}
