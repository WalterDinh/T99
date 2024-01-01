export class TransactionOfficeModel {
    id: string;
    transactionName: string;

    constructor() {
        this.id = '';
        this.transactionName = '';
    }

    static parseFromJson = (data: any): TransactionOfficeModel => {
        const obj = new TransactionOfficeModel();
        const { id, transactionName } = data;
        obj.id = id;
        obj.transactionName = transactionName;
        return obj;
    };
}
