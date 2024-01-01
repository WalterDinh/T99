export default class ListTransactionModel {
    periodName: string;
    date: string;
    paymentAmount: number;
    constructor(
        periodName: string,
        date: string,
        paymentAmount: number,
    ) {
        this.periodName = periodName;
        this.date = date;
        this.paymentAmount = paymentAmount;
    }
}
