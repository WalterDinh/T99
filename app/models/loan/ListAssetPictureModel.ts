export default class ListAssetPictureModel {
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
    static parseFromJson = (data: any): ListAssetPictureModel => {
        const obj = new ListAssetPictureModel();
        const {
            labelName,
            id,
        } = data;
        
        obj.label = labelName;
        obj.key = id;
        return obj;
    };
}