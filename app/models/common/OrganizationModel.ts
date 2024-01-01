export class OrganizationModel {
    id: string;
    code: string;
    name: string;

    constructor() {
        this.id = '';
        this.code = '';
        this.name = '';
    }

    static parseFromJson = (data: any): OrganizationModel => {
        const obj = new OrganizationModel();
        const { id, name, code } = data;
        obj.id = id;
        obj.name = name;
        obj.code = code;
        return obj;
    };
}
