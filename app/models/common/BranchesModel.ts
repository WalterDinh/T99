  export class BranchesModel {
    id: string;
    branchCode: string;
    branchName: string;

    constructor() {
        this.id = '';
        this.branchCode = '';
        this.branchName = '';
    }

    static parseFromJson = (data: any): BranchesModel => {
        const obj = new BranchesModel();
        const { id, branchName, branchCode } = data;
        obj.id = id;
        obj.branchName = branchName;
        obj.branchCode = branchCode;
        return obj;
    };
}
