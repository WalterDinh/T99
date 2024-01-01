import { SignType } from 'app/shared/constants';

export default class LoanItemModel {
    applicationCode: string;
    status: number;
    statusName: string;
    loanAmount: number;
    creationTime: Date;
    creationDate: string;
    signType: SignType;
    signTypeName: string;
    typeName: string;
    type: any;

    constructor() {
        this.applicationCode = '';
        this.status = 1;
        this.statusName = '';
        this.loanAmount = 0;
        this.creationTime = new Date();
        this.creationDate = '';
        this.signType = SignType.Online;
        this.signTypeName = '';
        this.typeName = '';
        this.type = null;
    }
    static parseFromJson = (data: any): LoanItemModel => {
        const obj = new LoanItemModel();
        const {
            applicationCode,
            status,
            statusName,
            loanAmount,
            creationTime,
            creationDate,
            signType,
            signTypeName,
            typeName,
            type,
        } = data;
        obj.applicationCode = applicationCode;
        obj.status = status;
        obj.statusName = statusName;
        obj.loanAmount = loanAmount;
        obj.creationTime = creationTime;
        obj.creationDate = creationDate;
        obj.signType = signType;
        obj.signTypeName = signTypeName;
        obj.typeName = typeName;
        obj.type = type;
        return obj;
    };
}
