import { DefinedStringSchema } from 'yup/lib/string';

export default class UserModel {
    fullName: string;
    phoneNumber: string;
    email: string;
    apartmentNumberAddressContact: number | null;
    address: string;
    isCheck: boolean;
    authenCheck: string;
    gender: number;
    birthOfDay: string;
    typeDoc: string;
    noDoc: string;
    issuedBy: string;
    validDate: string;
    expiredDate: string;
    avatar: string;
    addressContact: string;
    authenticationChannel: string;
    provinceAddressContactId: string;
    provinceAddressContactName: string;
    wardsAddressContactId: string;
    wardsAddressContactName: string;
    districtAddressContactId: string;
    districtAddressContactName: string;
    cif: string;
    constructor() {
        this.fullName = '';
        this.phoneNumber = '';
        this.email = '';
        this.apartmentNumberAddressContact = null;
        this.address = '';
        this.authenCheck = '';
        this.isCheck = true;
        this.typeDoc = '';
        this.noDoc = '';
        this.issuedBy = '';
        this.validDate = '';
        this.expiredDate = '';
        this.gender = 1;
        this.birthOfDay = '';
        this.avatar = '';
        this.addressContact = '';
        this.authenticationChannel = '';
        this.provinceAddressContactId = '';
        this.provinceAddressContactName = '';
        this.wardsAddressContactId = '';
        this.wardsAddressContactName = '';
        this.districtAddressContactId = '';
        this.districtAddressContactName = '';
        this.cif = '';
    }

    static parseFromJson = (data: any): UserModel => {
        const obj = new UserModel();
        const {
            fulllName,
            phoneNumber,
            email,
            apartmentNumberAddressContact,
            address,
            procedureInfomations,
            isCheck,
            authenCheck,
            gender,
            birthOfDay,
            avatar,
            addressContact,
            authenticationChannel,
            provinceAddressContactId,
            provinceAddressContactName,
            wardsAddressContactId,
            wardsAddressContactName,
            districtAddressContactId,
            districtAddressContactName,
            cif,
        } = data;
        const procedureInformation =
            procedureInfomations.length > 0
                ? procedureInfomations[0]
                : {
                      typeDoc: '',
                      noDoc: '',
                      issuedBy: '',
                      validDate: '',
                      expiredDate: '',
                  };
        obj.fullName = fulllName;
        obj.phoneNumber = phoneNumber;
        obj.email = email;
        obj.apartmentNumberAddressContact = apartmentNumberAddressContact;
        obj.address = address;
        obj.authenCheck = authenCheck;
        obj.isCheck = isCheck;
        obj.gender = gender;
        obj.birthOfDay = birthOfDay;
        obj.typeDoc = procedureInformation?.typeDoc ?? '';
        obj.noDoc = procedureInformation?.noDoc ?? '';
        obj.issuedBy = procedureInformation?.issuedBy ?? '';
        obj.validDate = procedureInformation?.validDate ?? '';
        obj.expiredDate = procedureInformation?.expiredDate ?? '';
        obj.avatar = avatar ?? '';
        obj.addressContact = addressContact ?? '';
        obj.authenticationChannel = authenticationChannel ?? '';
        obj.provinceAddressContactId = provinceAddressContactId ?? '';
        obj.provinceAddressContactName = provinceAddressContactName ?? '';
        obj.wardsAddressContactId = wardsAddressContactId ?? '';
        obj.wardsAddressContactName = wardsAddressContactName ?? '';
        obj.districtAddressContactId = districtAddressContactId ?? '';
        obj.districtAddressContactName = districtAddressContactName ?? '';
        obj.cif = cif ?? '';
        return obj;
    };
}
