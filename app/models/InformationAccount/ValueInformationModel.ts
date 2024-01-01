import { CheckStatusActive, CheckStatusText } from 'app/shared/constants';
import { TextStyle } from 'react-native';

export default class ValueInformationAccountModel {
    phone?: number | string;
    email?: string;
    permanentAddress?: string;
    addressContact?: string;
    cmnd?: string | number;
    dateOfBirth?: string | Date;
    dateRange?: string | Date;
    gender?: string | number;
    expirationDate?: string | Date;
    grantedBy?: string;
    authenticationStatus?: string;
    authenticationChannel?: string;

    constructor() {
        this.phone = '';
        this.email = '';
        this.permanentAddress = '';
        this.addressContact = '';
        this.cmnd = '';
        this.dateOfBirth = '';
        this.dateRange = '';
        this.gender = '';
        this.expirationDate = '';
        this.grantedBy = '';
        this.authenticationStatus = '';
        this.authenticationChannel = '';
    }

    static parseFromJson = (data: any): ValueInformationAccountModel => {
        const obj = new ValueInformationAccountModel();
        const {
            phone = '',
            email = '',
            permanentAddress = '',
            addressContact = '',
            cmnd = '',
            dateOfBirth = '',
            dateRange = '',
            gender = '',
            expirationDate = '',
            grantedBy = '',
            authenticationStatus = '',
            authenticationChannel = '',
        } = data;
        obj.phone = phone;
        obj.email = email;
        obj.permanentAddress = permanentAddress;
        obj.addressContact = addressContact;
        obj.cmnd = cmnd;
        obj.dateOfBirth = dateOfBirth;
        obj.dateRange = dateRange;
        obj.gender = gender;
        obj.expirationDate = expirationDate;
        obj.grantedBy = grantedBy;
        obj.authenticationStatus = authenticationStatus;
        obj.authenticationChannel = authenticationChannel;
        return obj;
    };
}
