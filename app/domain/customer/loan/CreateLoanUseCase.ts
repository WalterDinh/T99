import ResponseDataModel from 'app/models/common/ResponseDataModel';
import ResponseModel from 'app/models/common/ResponseModel';
import { Platform } from 'react-native';
import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class CreateLoanUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    data: any;
    constructor(loanRepo: ILoanRepository, data: any) {
        this.loanRepo = loanRepo;
        this.data = data;
    }
    execute = async (): Promise<
        ResponseModel<ResponseDataModel<{ applicationCode: string }>>
    > => {
        try {
            const body = new FormData();
            body.append('GroupAssetType', this.data?.GroupAssetType);
            body.append('AssetGroupId', this.data?.AssetGroupId);
            body.append('AssetDistrictId', this.data?.AssetDistrictId);
            body.append('AssetProvinceId', this.data?.AssetProvinceId);
            body.append('DiscountCode', this.data?.DiscountCode);
            body.append('LendingProductId', this.data?.LendingProductId);
            body.append('LoanAmount', this.data?.LoanAmount);
            body.append('LoanTime', this.data?.LoanTime);
            body.append('LoanPeriod', this.data?.LoanPeriod);
            body.append('DisbursementWay', this.data?.DisbursementWay);
            body.append('PaymentWay', this.data?.PaymentWay);
            body.append('CustomerInformation.Name', this.data?.Name);
            body.append('CustomerInformation.Email', this.data?.Email);
            body.append(
                'CustomerInformation.BirthOfDay',
                this.data?.BirthOfDay,
            );
            body.append('CustomerInformation.Gender', this.data?.Gender);
            body.append(
                'CustomerInformation.ApartmentNumberRegistration',
                this.data?.ApartmentNumberRegistration,
            );
            body.append(
                'CustomerInformation.WardsRegistrationId',
                this.data?.WardsRegistrationId,
            );
            body.append(
                'CustomerInformation.DistrictRegistrationId',
                this.data?.DistrictRegistrationId,
            );
            body.append(
                'CustomerInformation.ProvinceRegistrationId',
                this.data?.ProvinceRegistrationId,
            );
            body.append(
                'CustomerInformation.NumberIdentityDoc',
                this.data?.NumberIdentityDoc,
            );
            body.append(
                'CustomerInformation.TypeIdentityDoc',
                this.data?.TypeIdentityDoc,
            );
            body.append(
                'CustomerInformation.NumberPhone',
                this.data?.NumberPhone,
            );
            body.append('TransactionOfficeId', this.data?.TransactionOfficeId);

            if (this.data?.GroupDataMasterIds?.length > 0) {
                for (
                    let index = 0;
                    index < this.data?.GroupDataMasterIds.length;
                    index++
                ) {
                    const element = this.data?.GroupDataMasterIds[index];

                    body.append('GroupDataMasterIds', element);
                }
            }

            if (this.data?.Files?.length > 0) {
                for (let index = 0; index < this.data?.Files.length; index++) {
                    const element = this.data?.Files[index];

                    const objImage = {
                        uri:
                            Platform.OS === 'ios'
                                ? element.toString().replace('file://', '')
                                : element,
                        type: 'image/jpg',
                        name: `image${new Date().getMilliseconds}.jpg`,
                    };
                    body.append('Files', objImage);
                }
            }
            const resp = await this.loanRepo.createLoan(body);
            return resp;
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
