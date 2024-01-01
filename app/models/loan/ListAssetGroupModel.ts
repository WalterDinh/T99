export default class ListAssetGroupModel {
    label: string;
    key: string;
    labelImageProperties: Array<object>;
    constructor(
        label= '',
        key= '',
        labelImageProperties= [],
    ) 
    {
        this.label = label;
        this.key = key;
        this.labelImageProperties = labelImageProperties;
    }
    static parseFromJson = (data: any): ListAssetGroupModel => {
        const obj = new ListAssetGroupModel();
        const {
            name,
            id,
            labelImageProperties,
        } = data;
        
        obj.label = name;
        obj.key = id;
        obj.labelImageProperties = labelImageProperties;
        return obj;
    };
}