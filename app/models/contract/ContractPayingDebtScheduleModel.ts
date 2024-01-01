import { DebtRepaymentPlanStatus } from 'app/shared/constants';

export default class ContractPayingDebtScheduleModel {
    id: string;
    periodName: string;
    totalPaymentAmount: number;
    statusName: string;
    statusId: DebtRepaymentPlanStatus;
    constructor(
        id = '',
        periodName = '',
        totalPaymentAmount = 0,
        statusName = '',
        statusId = 0,
    ) {
        this.id = id;
        this.periodName = periodName;
        this.totalPaymentAmount = totalPaymentAmount;
        this.statusName = statusName;
        this.statusId = statusId;
    }
    static parseFromJson = (data: any): ContractPayingDebtScheduleModel => {
        const obj = new ContractPayingDebtScheduleModel();
        const { id, periodName, totalPaymentAmount, statusName, statusId } =
            data;
        obj.id = id;
        obj.periodName = periodName;
        obj.totalPaymentAmount = totalPaymentAmount;
        obj.statusName = statusName;
        obj.statusId = statusId;
        return obj;
    };
}
