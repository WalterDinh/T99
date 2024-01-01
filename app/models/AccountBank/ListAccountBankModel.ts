export default class ListAccountBankModel {
    id: string;
    name: string;
    isSetDefault: boolean;
    numberAccount: string;
    creatorText: string;
    logo: string;
    constructor(
        id= '',
        name= '',
        isSetDefault= false,
        numberAccount= '',
        creatorText= '',
        logo= '',
    ) {
        this.id = id;
        this.name = name;
        this.isSetDefault = isSetDefault;
        this.numberAccount = numberAccount;
        this.creatorText = creatorText;
        this.logo = logo;
    }
    static parseFromJson = (data: any): ListAccountBankModel => {
        const obj = new ListAccountBankModel();
        const { id, name, isSetDefault, numberAccount, creatorText, logo } =
            data;
            obj.id = id;
            obj.name = name;
            obj.isSetDefault = isSetDefault;
            obj.numberAccount = numberAccount;
            obj.creatorText = creatorText;
            obj.logo = logo;
        return obj;
    };
}
