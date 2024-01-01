export default class ListBankModel {
    label: string;
    key: string;
    constructor(
        label= '',
        key= '',
    ) 
    {
        this.label = label;
        this.key = key;
    }
    static parseFromJson = (data: any): ListBankModel => {
        const obj = new ListBankModel();
        const {
            name,
            id,
        } = data;
        
        obj.label = name;
        obj.key = id;
        return obj;
    };
}