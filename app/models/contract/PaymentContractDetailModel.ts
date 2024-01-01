export default class PaymentContractDetailModel {
    periodPaid: string;
    contractCode: string;
    principalAmount: number;
    paymentAmount: number;
    totalPaidAmount: number;
    remainingBalance: number;
    overDueFeeAmount: number;
    totalPaymentRemainAmount: number;
    interestAmount: number;
    fee: number;
    constructor(
        periodPaid = '',
        contractCode = '',
        principalAmount = 0,
        paymentAmount = 0,
        totalPaidAmount = 0,
        remainingBalance = 0,
        overDueFeeAmount = 0,
        totalPaymentRemainAmount = 0,
        interestAmount = 0,
        fee = 0,
    ) {
        this.periodPaid = periodPaid;
        this.contractCode = contractCode;
        this.principalAmount = principalAmount;
        this.paymentAmount = paymentAmount;
        this.totalPaidAmount = totalPaidAmount;
        this.remainingBalance = remainingBalance;
        this.overDueFeeAmount = overDueFeeAmount;
        this.totalPaymentRemainAmount = totalPaymentRemainAmount;
        this.interestAmount = interestAmount;
        this.fee = fee;
    }
    static parseFromJson = (data: any): PaymentContractDetailModel => {
        const obj = new PaymentContractDetailModel();
        const {
            periodPaid,
            contractCode,
            principalAmount,
            paymentAmount,
            totalPaidAmount,
            remainingBalance,
            overDueFeeAmount,
            totalPaymentRemainAmount,
            interestAmount,
            fee,
        } = data;
        obj.periodPaid = periodPaid;
        obj.contractCode = contractCode;
        obj.principalAmount = principalAmount;
        obj.paymentAmount = paymentAmount;
        obj.totalPaidAmount = totalPaidAmount;
        obj.remainingBalance = remainingBalance;
        obj.overDueFeeAmount = overDueFeeAmount;
        obj.totalPaymentRemainAmount = totalPaymentRemainAmount;
        obj.interestAmount = interestAmount;
        obj.fee = fee;
        return obj;
    };
}
