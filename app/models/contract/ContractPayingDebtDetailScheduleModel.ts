export default class ContractPayingDebtDetailScheduleModel {
    id: string;
    totalPaymentAmount: number;
    totalPaymentRemainAmount: number;
    remainOriginAmount: number;
    remainInterestAmount: number;
    totalPenaltyFee: number;
    insuranceFeeRemainAmount: number;
    constructor(
        id = '',
        totalPaymentAmount = 0,
        totalPaymentRemainAmount = 0,
        remainOriginAmount = 0,
        remainInterestAmount = 0,
        totalPenaltyFee = 0,
        insuranceFeeRemainAmount = 0,
    ) {
        this.id = id;
        this.totalPaymentAmount = totalPaymentAmount;
        this.totalPaymentRemainAmount = totalPaymentRemainAmount;
        this.remainOriginAmount = remainOriginAmount;
        this.remainInterestAmount = remainInterestAmount;
        this.totalPenaltyFee = totalPenaltyFee;
        this.insuranceFeeRemainAmount = insuranceFeeRemainAmount;
    }
    static parseFromJson = (
        data: any,
    ): ContractPayingDebtDetailScheduleModel => {
        const obj = new ContractPayingDebtDetailScheduleModel();
        const {
            id,
            totalPaymentAmount,
            totalPaymentRemainAmount,
            remainOriginAmount,
            remainInterestAmount,
            totalPenaltyFee,
            insuranceFeeRemainAmount,
        } = data;
        obj.id = id;
        obj.totalPaymentAmount = totalPaymentAmount;
        obj.totalPaymentRemainAmount = totalPaymentRemainAmount;
        obj.remainOriginAmount = remainOriginAmount;
        obj.remainInterestAmount = remainInterestAmount;
        obj.totalPenaltyFee = totalPenaltyFee;
        obj.insuranceFeeRemainAmount = insuranceFeeRemainAmount;
        return obj;
    };
}
