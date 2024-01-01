import { AssetType, ContractDebtGroup } from 'app/shared/constants';

export default class ContractInterestDurationModel {
    contractId: string;
    newInterestRate: number;
    assetManagementFeeAmount: number;
    assetVerificationFeeAmount: number;
    insuranceFeeAmount: number;
    constructor(
        contractId = '',
        newInterestRate = 0,
        assetManagementFeeAmount = 0,
        assetVerificationFeeAmount = 0,
        insuranceFeeAmount = 0,
    ) {
        this.contractId = contractId;
        this.newInterestRate = newInterestRate;
        this.assetManagementFeeAmount = assetManagementFeeAmount;
        this.assetVerificationFeeAmount = assetVerificationFeeAmount;
        this.insuranceFeeAmount = insuranceFeeAmount;
    }

    static parseFromJson = (data: any): ContractInterestDurationModel => {
        const {
            contractId,
            newInterestRate,
            assetManagementFeeAmount,
            assetVerificationFeeAmount,
            insuranceFeeAmount,
        } = data;

        const obj = new ContractInterestDurationModel();
        obj.contractId = contractId;
        obj.newInterestRate = newInterestRate;
        obj.assetManagementFeeAmount = assetManagementFeeAmount;
        obj.assetVerificationFeeAmount = assetVerificationFeeAmount;
        obj.insuranceFeeAmount = insuranceFeeAmount;
        return obj;
    };
}
