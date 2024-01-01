import { AssetType, ContractDebtGroup } from 'app/shared/constants';

export default class ContractBorrowingModel {
    id: string;
    code: string;
    contractAmount: string;
    endDate: string;
    debtRemainAmount: string;
    debtGroupName: string;
    debtGroup: number;
    assetType: AssetType;
    assetTypeName: string;
    constructor(
        id = '',
        code = '',
        contractAmount = '',
        endDate = '',
        debtRemainAmount = '',
        debtGroupName = '',
        debtGroup = ContractDebtGroup.InPeriod,
        assetType = AssetType.Pledge,
        assetTypeName = '',
    ) {
        this.id = id;
        this.code = code;
        this.contractAmount = contractAmount;
        this.endDate = endDate;
        this.debtRemainAmount = debtRemainAmount;
        this.debtGroupName = debtGroupName;
        this.debtGroup = debtGroup;
        this.assetType = assetType;
        this.assetTypeName = assetTypeName;
    }

    static parseFromJson = (data: any): ContractBorrowingModel => {
        const {
            id,
            code,
            contractAmount,
            endDate,
            debtRemainAmount,
            debtGroupName,
            debtGroup,
            assetType,
            assetTypeName,
        } = data;

        const obj = new ContractBorrowingModel();
        obj.id = id;
        obj.code = code;
        obj.contractAmount = contractAmount;
        obj.endDate = endDate;
        obj.debtRemainAmount = debtRemainAmount;
        obj.debtGroupName = debtGroupName;
        obj.debtGroup = debtGroup;
        obj.assetType = assetType;
        obj.assetTypeName = assetTypeName;
        return obj;
    };
}
