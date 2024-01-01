import LoanFeeModel from 'app/models/loan/LoanFee';
import { getString } from 'app/presentation/localization';
import { StatusToast } from 'app/shared/constants';
import Toast from 'react-native-toast-message';
import { ILoanRepository } from '.';
import { IUseCase } from '../../index';

export class GetLoanFeeUseCase implements IUseCase {
    loanRepo: ILoanRepository;
    data: {
        ProductId: string;
        PaymentWay: number;
        LoanAmount: number;
        LoanTime: number;
        DayLoan: number;
    };
    constructor(
        loanRepo: ILoanRepository,
        data: {
            ProductId: string;
            PaymentWay: number;
            LoanAmount: number;
            LoanTime: number;
            DayLoan: number;
        },
    ) {
        this.loanRepo = loanRepo;
        this.data = data;
    }
    execute = async () => {
        try {
            const resp = await this.loanRepo.getLoanFee(this.data);
            if (resp.data?.success && !!resp.data.data) {
                return LoanFeeModel.parseFromJson(resp.data.data);
            }
            Toast.show({
                type: StatusToast.Error,
                text2: getString([
                    `errors.${resp?.message}`,
                    'errorMessageCommon',
                ]),
            });
            return new LoanFeeModel();
        } catch (_error) {
            const error = _error as any;
            throw error;
        }
    };
}
