import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';

export interface ITransactionRepository {
    postRequestDisbursement: (
        body: any,
    ) => Promise<
        ResponseModel<
            ResponseDataModel<{
                accountBankCustomerId: string;
                contractId: string;
                disbursementAmount: number | string;
                amountToPayPeriodical: number | string;
            }>
        >
    >;
}
