export default class ContractDetailModel {
    contractAmount: number;
    paid: number;
    code: string;
    name: string;
    lendingDate: Date;
    period: string;
    disbursementMethod: string;
    disbursementMethodId: number;
    debtGroupName: string;
    debtGroupId: number;
    loanAmount: number;
    accumulationManagementFeeAmount: number;
    accumulationInterestAmount: number;
    employeeCode?: string;
    insuranceAmount?: number;
    constructor(
        contractAmount = 0,
        paid = 0,
        code = '',
        name = '',
        lendingDate = new Date,
        period = '',
        disbursementMethod = '',
        disbursementMethodId = 0,
        debtGroupName = '',
        debtGroupId = 0,
        loanAmount = 0,
        accumulationManagementFeeAmount = 0,
        accumulationInterestAmount = 0,
        insuranceAmount= 0,
        employeeCode = '',
    ) {
        this.contractAmount = contractAmount;
        this.paid = paid;
        this.code = code;
        this.name = name;
        this.lendingDate = lendingDate;
        this.period = period;
        this.disbursementMethod = disbursementMethod;
        this.disbursementMethodId = disbursementMethodId;
        this.debtGroupName = debtGroupName;
        this.debtGroupId = debtGroupId;
        this.loanAmount = loanAmount;
        this.accumulationManagementFeeAmount = accumulationManagementFeeAmount;
        this.accumulationInterestAmount = accumulationInterestAmount;
        this.insuranceAmount = insuranceAmount;
        this.employeeCode = employeeCode;
    }
    static parseFromJson = (data: any): ContractDetailModel => {
        const obj = new ContractDetailModel();
        const {
            contractAmount,
            paid,
            code,
            name,
            lendingDate,
            period,
            disbursementMethod,
            disbursementMethodId,
            debtGroupName,
            debtGroupId,
            loanAmount,
            accumulationManagementFeeAmount,
            accumulationInterestAmount,
            insuranceAmount,
            employeeCode,
        } = data;
        obj.contractAmount = contractAmount;
        obj.paid = paid;
        obj.code = code;
        obj.name = name;
        obj.lendingDate = lendingDate;
        obj.period = period;
        obj.disbursementMethod = disbursementMethod;
        obj.disbursementMethodId = disbursementMethodId;
        obj.debtGroupName = debtGroupName;
        obj.debtGroupId = debtGroupId;
        obj.loanAmount = loanAmount;
        obj.accumulationManagementFeeAmount = accumulationManagementFeeAmount;
        obj.accumulationInterestAmount = accumulationInterestAmount;
        obj.insuranceAmount = insuranceAmount;
        obj.employeeCode = employeeCode;
        return obj;
    };
}
