import { DebtRepaymentPlanStatus } from 'app/shared/constants';

export default class ContractRepaymentModel {
    contractId: string;
        newPayOriginDate: string;
        newPayInterestDate: string;
        note: string
      
    constructor(
        contractId = '',
        newPayOriginDate = '',
         newPayInterestDate= '',
        note = '',
         
    ) {
        this.contractId = contractId
        this.newPayOriginDate = newPayOriginDate;
        this.newPayInterestDate = newPayInterestDate;
        this.note = note;
    }
    static parseFromJson = (data: any): ContractRepaymentModel => {
        const obj = new ContractRepaymentModel();
        const { contractId, newPayOriginDate, newPayInterestDate, note } =
            data;
        obj.contractId = contractId;
        obj.newPayOriginDate = newPayOriginDate;
        obj.newPayInterestDate = newPayInterestDate;
        obj.note = note;
        return obj;
    };
}
