export default class ListAssetAsyncModel {
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
    static parseFromJson = (data: any): ListAssetAsyncModel => {
        const obj = new ListAssetAsyncModel();
        const {
            productName,
            id,
        } = data;
        
        obj.label = productName;
        obj.key = id;
        return obj;
    };
}