import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import {
    neutral,
    primary,
    secondary,
    success,
} from 'app/presentation/theme/Colors';

export const valueVerification = [
    {
        id: 1,
        title: getString('electronicIdentityVerification'),
        icon: Images.Icons.FingerScan,
        iconHaveStep: Images.Icons.FingerScanRed,
        type: 'electronicIdentityVerification',
    },
    {
        id: 2,
        title: getString('authenticGolfer'),
        icon: Images.Icons.ChartVerify,
        iconHaveStep: Images.Icons.Golf,
        type: 'authenticGolfer',
    },
    {
        id: 3,
        title: getString('confirmationOfResidence'),
        icon: Images.Icons.Map,
        iconHaveStep: Images.Icons.MapRed,
        type: 'confirmationOfResidence',
    },
    {
        id: 4,
        title: getString('assetVerification'),
        icon: Images.Icons.DollarCircle,
        iconHaveStep: Images.Icons.UsdCoin,
        type: 'assetVerification',
    },
    {
        id: 5,
        title: getString('incomeVerification'),
        icon: Images.Icons.IconCardCoin,
        iconHaveStep: Images.Icons.CardCoin,
        type: 'incomeVerification',
    },
];
export const renderType = (loyalty: string) => {
    switch (loyalty) {
        case 'pro':
            return { backgroundColor: success.brand, color: neutral.white };
        case 'golfer':
            return { backgroundColor: primary.brand, color: neutral.white };
        default:
            return { backgroundColor: '#C4C4C4', color: secondary.brand };
    }
};
export const dataValue = [
    {
        title: getString('amountPaid'),
        value: '4 Kỳ',
        styleValue: {},
        currency: false,
    },
    {
        title: getString('principalDebt'),
        value: 10100000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('totalAmountPaid'),
        value: 4505000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('remainingBalance'),
        value: 5995000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('penaltyFeeSettlement'),
        value: 2900000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('sumSettlement'),
        value: 8895000,
        styleValue: { color: primary.brand, fontFamily: theme.font.Bold },
        currency: true,
    },
];
export const dataInterestFeeValue = [
    {
        title: getString('totalAmountpaid'),
        value: 45673000,
        styleValue: {
            color: neutral.s400
        },
        currency: true,
    },
    {
        title: getString('principalDebt'),
        value: 10100000,
        styleValue: {
            color: neutral.s400
        },
        currency: true,
    },
    {
        title: getString('interestPayment'),
        value: 4505000,
        styleValue: {
            color: neutral.black
        },
        currency: true,
    },
    {
        title: getString('payingFee'),
        value: 1902000,
        styleValue: {
            color: neutral.black
        },
        currency: true,
    },
    {
        title: getString('remainingBalance'),
        value: 5995000,
        styleValue: {
            color: neutral.s400
        },
        currency: true,
    },
    {
        title: getString('totalAmountNeedToPay'),
        value: 8895000,
        styleValue: { color: primary.brand, fontFamily: theme.font.Bold },
        currency: true,
    },
];

export const dataPartialRepaymentDetailValue = [
    {
        title: getString('amountPaid'),
        value: '4 Kỳ',
        styleValue: {},
        currency: false,
    },
    {
        title: getString('totalAmountPaid'),
        value: 4505000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('principalDebt'),
        value: 10100000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('amountRequestedForReduction'),
        value: 10100000,
        styleValue: {
            color: neutral.black
        },
        angleDown: true,
        currency: true,
    },
    {
        title: getString('interest'),
        value: 4505000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('fee'),
        value: 5995000,
        styleValue: {},
        currency: true,
    },

    {
        title: getString('remainingBalance'),
        value: 5995000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('totalAmountNeedToPay'),
        value: 8895000,
        styleValue: { color: primary.brand, fontFamily: theme.font.Bold },
        currency: true,
    },
];
export const dataDebtPaymentDueDetailValue = [
    {
        title: getString('moneyPaid'),
        value: 100000000,
        styleValue: { color: primary.brand, fontFamily: theme.font.Bold },
        currency: true,
    },
    {
        title: getString('origin'),
        value: 10100000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('profit'),
        value: 4505000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('fee'),
        value: 5995000,
        styleValue: {},
        currency: true,
    },
    {
        title: getString('paymentTerm'),
        value: '03/08/2022',
        styleValue: {},
        currency: false,
    },
];
export const datamock = [
    {
        id: 1,
        source: Images.Icons.imageBank1,
        bankName: 'Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng (VPBank)',
        accountNameValue: 'Công ty CPTĐ Tài chính T99',
        branch: 'TP Hà Nội',
        numberCopy: 12764523,
    },
    {
        id: 2,
        source: Images.Icons.imageBank2,
        bankName: 'Ngân hàng TMCP Công Thương Việt Nam (Vietinbank)',
        accountNameValue: 'Hoàng Khánh C',
        branch: 'TP Hà Nội',
        numberCopy: 7659964523,
    },
    {
        id: 3,
        source: Images.Icons.Techcombank,
        bankName: 'Ngân hàng TMCP Thương kỹ Việt Nam (Techcombank)',
        accountNameValue: 'Hoàng Khánh C',
        branch: 'TP Hà Nội',
        numberCopy: 7659964523,
    },
    {
        id: 4,
        source: Images.Icons.Vietcombank,
        bankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        accountNameValue: 'Hoàng Khánh C',
        branch: 'TP Hà Nội',
        numberCopy: 7659964523,
    },
];
export const listOnlinePayment = [
    {
        type: 'momo',
        title: getString('momo'),
        icon: Images.Icons.MomoWallet,
    },
    {
        type: 'viettelPay',
        title: getString('viettelPay'),
        icon: Images.Icons.ViettelpayWallet,
    },
    {
        type: 'vnpt',
        title: getString('vnpt'),
        icon: Images.Icons.VnptpayWallet,
    },
];
export const listButtonPaymentMethod = [
    {
        type: 'settlement',
        title: getString('settlement'),
        icon: Images.Icons.OutlinedSquare,
    },
    {
        type: 'debtPaymentDue',
        title: getString('debtPaymentDue'),
        icon: Images.Icons.CalendarOutlined,
    },
    {
        type: 'partialRepaymentOfPrincipal',
        title: getString('partialRepaymentOfPrincipal'),
        icon: Images.Icons.TabOutlined,
    },
    {
        type: 'paymentOfInterestAndFees',
        title: getString('paymentOfInterestAndFees'),
        icon: Images.Icons.UsdCoin,
    },
];
export const listButtonSelectMethodPay = [
    {
        type: 'onlinePayment',
        title: getString('onlinePayment'),
        icon: Images.Icons.OnlinePayMent,
    },
    {
        type: 'payCashStore',
        title: getString('payCashStore'),
        icon: Images.Icons.Cash,
    },
    {
        type: 'payTransfer',
        title: getString('payTransfer'),
        icon: Images.Icons.TransferOutlined,
    },
];
export const dataCareer = [
    {
        label: 'Tài chính',
        key: 'finance'
    },
    {
        label: 'Công nghệ thông tin  ',
        key: 'informationTechnology'
    },
    {
        label: 'Giáo viên',
        key: 'teacher'
    },
    {
        label: 'Ngành y',
        key: 'medicalIndustry'
    },
    {
        label: 'Công an',
        key: 'police'
    },
    {
        label: 'Cơ quan nhà nước',
        key: 'stateAgencies'
    },
    {
        label: 'Lao động tự do',
        key: 'freelanceWorkers'
    },
    {
        label: 'Nhân viên văn phòng',
        key: 'officeStaff'
    },
    {
        label: 'Khác',
        key: 'other'
    },
]