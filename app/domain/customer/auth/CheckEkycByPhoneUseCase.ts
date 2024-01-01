import { getString } from 'app/presentation/localization';
import { OtpType, StatusToast } from 'app/shared/constants';
import Toast from 'react-native-toast-message';
import { ICustomerRepository } from '..';
import { IUseCase } from '../../index';

export class CheckEkycByPhoneUseCase implements IUseCase {
    customerRepo: ICustomerRepository;
    params: { phoneNumber: string };
    constructor(
        customerRepo: ICustomerRepository,
        params: { phoneNumber: string },
    ) {
        this.customerRepo = customerRepo;
        this.params = params;
    }

    execute = async () => {
        try {
            const response = await this.customerRepo.checkEkycByPhone(
                this.params,
            );
            if (
                response.data?.httpStatusCode == 200 &&
                response?.data?.success === true &&
                response?.data?.data?.isEkyc
            ) {
                return 1;
            } else {
                const res = await this.customerRepo.sendOTP({
                    otpType: OtpType.ForgotPassword,
                    phoneNumber: this.params.phoneNumber,
                });
                if (res?.data?.message == 'MSG046') {
                    return 0;
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            }
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
