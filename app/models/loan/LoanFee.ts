export default class LoanFeeModel {
    insuranceFee: number;
    otherFee: number;
    periodMoneyAmount: number;
    sumInterest: number;
    totalAmountMoney: number;
    constructor(
        insuranceFee = 0,
        otherFee = 0,
        periodMoneyAmount = 0,
        sumInterest = 0,
        totalAmountMoney = 0,
    ) {
        this.insuranceFee = insuranceFee;
        this.otherFee = otherFee;
        this.insuranceFee = insuranceFee;
        this.periodMoneyAmount = periodMoneyAmount;
        this.sumInterest = sumInterest;
        this.totalAmountMoney = totalAmountMoney;
    }
    static parseFromJson = (data: any): LoanFeeModel => {
        const obj = new LoanFeeModel();
        const {
            insuranceFee,
            otherFee,
            periodMoneyAmount,
            sumInterest,
            totalAmountMoney,
        } = data;
        obj.insuranceFee = insuranceFee;
        obj.otherFee = otherFee;
        obj.insuranceFee = insuranceFee;
        obj.periodMoneyAmount = periodMoneyAmount;
        obj.sumInterest = sumInterest;
        obj.totalAmountMoney = totalAmountMoney;
        return obj;
    };
}
