import { resizeImage } from 'app/presentation/helper/ReduceImageSize';
import { Platform } from 'react-native';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class PostVerificationIncomeUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    data: any;
    constructor(customerRepo: ICustomerRepository, data: any) {
        this.customerRepo = customerRepo;
        this.data = data;
    }

    execute = async () => {
        try {
            const body = new FormData();
            body.append('CIF', this.data?.earnings);
            body.append('IncomeAmount', this.data?.earnings);
            body.append('CompanyName', this.data?.companyName);
            body.append('Position', this.data?.position);
            body.append('District', this.data?.district.key);
            body.append('Province', this.data?.province.key);
            body.append('CompanyAddress', this.data?.address);
            body.append('Job', this.data?.career?.label);
            if (this.data?.identityDocuments?.length > 0) {
                for (
                    let index = 0;
                    index < this.data?.identityDocuments.length;
                    index++
                ) {
                    const element = this.data?.identityDocuments[index];
                    const resizeImagePath = await resizeImage(
                        Platform.OS === 'ios'
                            ? element?.sourceURL
                            : element?.path,
                    );

                    const objImage = {
                        uri:
                            Platform.OS === 'ios'
                                ? resizeImagePath?.path
                                : resizeImagePath?.uri,
                        type: element.mime || 'image/jpg',
                        name: resizeImagePath?.name || `image${index}.jpg`,
                    };
                    body.append('File', objImage);
                }
            }
            const listContractBorrowingResp =
                await this.customerRepo.postVerificationIncome(body);
            return listContractBorrowingResp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
