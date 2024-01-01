export default class TransactionPointModel {
    listNear: List[];
    listFar: List[];
    constructor(listNear = [], listFar = []) {
        this.listNear = listNear;
        this.listFar = listFar;
    }
    static parseFromJson = (data: any): TransactionPointModel => {
        const obj = new TransactionPointModel();
        const { listNear, listFar } = data;
        obj.listNear = listNear;
        obj.listFar = listFar;
        return obj;
    };
}
export interface List {
    name: string;
    address: string;
    lat: number;
    lng: number;
    km: number;
}
