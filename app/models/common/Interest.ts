export class Interest {
    id: number;
    name: string;
    imageUrl?: string;

    constructor() {
        this.id = 0;
        this.name = '';
    }

    static parseFromJson = (data: any): Interest => {
        const obj = new Interest();
        const {id, name, image} = data;
        obj.id = id;
        obj.name = name;
        obj.imageUrl = image && image.length > 0 ? image : undefined;
        return obj;
    }
}