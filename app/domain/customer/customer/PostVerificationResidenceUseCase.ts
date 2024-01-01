import CustomerRepository from 'app/data/repository/customer';
import { resizeImage } from 'app/presentation/helper/ReduceImageSize';
import { Platform } from 'react-native';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';
export class PostVerificationResidenceUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    data: any;
    constructor(customerRepo: ICustomerRepository, data: any) {
        this.customerRepo = new CustomerRepository();
        this.data = data;
    }
    execute = async () => {
        const body: any = new FormData();
        if (this.data?.familyRegisterInformation.length > 0) {
            for (
                let index = 0;
                index < this.data?.familyRegisterInformation.length;
                index++
            ) {
                const element = this.data?.familyRegisterInformation[index];
                const resizeImagePath = await resizeImage(
                    Platform.OS === 'ios' ? element?.sourceURL : element?.path,
                );
                const objImage = {
                    uri:
                        Platform.OS === 'ios'
                            ? resizeImagePath?.path
                            : resizeImagePath?.uri,
                    type: element.mime || 'image/jpg',
                    name: resizeImagePath?.name || `image${index}.jpg`,
                };
                body.append('familyRegisterInformation', objImage);
            }
        }
        if (this.data?.temporaryResidenceInformation.length > 0) {
            for (
                let index = 0;
                index < this.data?.temporaryResidenceInformation.length;
                index++
            ) {
                const element = this.data?.temporaryResidenceInformation[index];
                const resizeImagePath = await resizeImage(
                    Platform.OS === 'ios' ? element?.sourceURL : element?.path,
                );
                const objImage = {
                    uri:
                        Platform.OS === 'ios'
                            ? resizeImagePath?.path
                            : resizeImagePath?.uri,
                    type: element.mime || 'image/jpg',
                    name: resizeImagePath?.name || `image${index}.jpg`,
                };
                body.append('temporaryResidenceInformation', objImage);
            }
        }

        try {
            const uploadAvtResp =
                await this.customerRepo.postVerificationResidence(body);

            return uploadAvtResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
