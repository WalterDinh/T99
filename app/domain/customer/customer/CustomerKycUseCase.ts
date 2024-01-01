import ResponseModel from 'app/models/common/ResponseModel';
import { CustomerKycRequestModel } from 'app/models/ekyc/CustomerKycRequestModel';
// import { resizeImage } from 'app/presentation/helper/ReduceImageSize';
// import { Platform } from 'react-native';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';
export default class CustomerKycUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    params: CustomerKycRequestModel;
    constructor(
        customerRepo: ICustomerRepository,
        params: CustomerKycRequestModel,
    ) {
        this.customerRepo = customerRepo;
        this.params = params;
    }

    execute = async (): Promise<ResponseModel<any>> => {
        try {
            const formData = new FormData();

            formData.append('Name', this.params.name);
            formData.append('Gender', this.params.gender);
            formData.append(
                'IsSameRegistration',
                this.params.isSameRegistration,
            );
            formData.append('IsKyc', this.params.isKyc);
            formData.append(
                'ValidDate',
                this.params.validDate.split('/').reverse().join('/'),
            );
            formData.append(
                'ExpiredDate',
                this.params.expiredDate.split('/').reverse().join('/'),
            );
            formData.append(
                'BirthOfDay',
                this.params.birthOfDay.split('/').reverse().join('/'),
            );
            formData.append('IssuedBy', this.params.issuedBy);
            formData.append('NumberIdentityDoc', this.params.numberIdentityDoc);
            formData.append(
                'AddressContact',
                this.params.apartmentNumberRegistration,
            );
            formData.append('TypeIdentityDoc', this.params.typeIdentityDoc);
            formData.append('OriginLocation', this.params.originLocation);
            // const resizeImagePath = await resizeImage(this.params.avatar);
            // const objImage = {
            //     uri:
            //         Platform.OS === 'ios'
            //             ? resizeImagePath?.path
            //             : resizeImagePath?.uri,
            //     type: 'image/jpg',
            //     name: `image${this.params.numberIdentityDoc}.jpg`,
            // };
            // formData.append('Avatar', objImage);
            // console.log('formData', formData.getParts(), formData);

            const response = await this.customerRepo.setCustomerKyc(formData);
            return response;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
