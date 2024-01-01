export class CustomerKycRequestModel {
    name: string;
    birthOfDay: string;
    gender: number;
    apartmentNumberRegistration: string;
    wardsRegistrationId: string;
    districtRegistrationId: string;
    provinceRegistrationId: string;
    isSameRegistration: boolean;
    isKyc: boolean;
    validDate: string;
    expiredDate: string;
    issuedBy: string;
    numberIdentityDoc: string;
    typeIdentityDoc: string;
    originLocation: string;
    avatar: string;
    nationality: string;
    constructor() {
        this.gender = 0;
        this.apartmentNumberRegistration = '';
        this.wardsRegistrationId = '';
        this.districtRegistrationId = '';
        this.provinceRegistrationId = '';
        this.isSameRegistration = true;
        this.isKyc = false;
        this.validDate = '';
        this.expiredDate = '';
        this.issuedBy = '';
        this.numberIdentityDoc = '';
        this.typeIdentityDoc = '';
        this.birthOfDay = '';
        this.name = '';
        this.originLocation = ''
        this.avatar = ''
        this.nationality= ''
    }

    static parseFromJson = (
        data: CustomerKycRequestModel,
    ): CustomerKycRequestModel => {
        const {
            birthOfDay,
            name,
            gender,
            apartmentNumberRegistration,
            wardsRegistrationId,
            districtRegistrationId,
            provinceRegistrationId,
            isSameRegistration,
            isKyc,
            validDate,
            expiredDate,
            issuedBy,
            numberIdentityDoc,
            typeIdentityDoc,
            originLocation,
            avatar,
            nationality
        } = data;
        const obj = new CustomerKycRequestModel();
        obj.birthOfDay = birthOfDay;
        obj.name = name;
        obj.gender = gender;
        obj.apartmentNumberRegistration = apartmentNumberRegistration;
        obj.wardsRegistrationId = wardsRegistrationId;
        obj.districtRegistrationId = districtRegistrationId;
        obj.provinceRegistrationId = provinceRegistrationId;
        obj.isSameRegistration = isSameRegistration;
        obj.isKyc = isKyc;
        obj.validDate = validDate;
        obj.expiredDate = expiredDate;
        obj.issuedBy = issuedBy;
        obj.numberIdentityDoc = numberIdentityDoc;
        obj.typeIdentityDoc = typeIdentityDoc;
        obj.originLocation = originLocation;
        obj.avatar = avatar;
        obj.nationality = nationality;

        return obj;
    };
}
