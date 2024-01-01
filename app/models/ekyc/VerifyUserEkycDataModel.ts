export default class VerifyUserEkycDataModel {
    isEkyc: boolean;
    verifyGolfer: boolean;
    verifyAsset: boolean;
    verifyResidence: boolean;
    verifyIncome: boolean;

    constructor() {
        this.isEkyc = false;
        this.verifyGolfer = false;
        this.verifyAsset = false;
        this.verifyResidence = false;
        this.verifyIncome = false;
    }
    static parseFromJson = (data: any): VerifyUserEkycDataModel => {
        const obj = new VerifyUserEkycDataModel();
        const {
            isEkyc,
            verifyGolfer,
            verifyAsset,
            verifyResidence,
            verifyIncome,
        } = data;
        obj.isEkyc = isEkyc;
        obj.verifyGolfer = verifyGolfer;
        obj.verifyAsset = verifyAsset;
        obj.verifyResidence = verifyResidence;
        obj.verifyIncome = verifyIncome;

        return obj;
    };
}
