import ValueInformationAccountModel from 'app/models/InformationAccount/ValueInformationModel';
import { getString } from 'app/presentation/localization';
import { Images } from 'app/presentation/theme';

export const settingArray = [
    {
        isPaddingBottom: true,
        title: getString('acc'),
        childrenValue: [
            {
                label: getString('informationAccount'),
                iconLeft: Images.Icons.CardImage,
                type: 'informationAccount',
                isShow: false,
            },
            {
                label: getString('changeAvatar'),
                iconLeft: Images.Icons.AvatarEdit,
                type: 'changeAvatar',
                isShow: false,
            },
            {
                label: getString('transactionHistory'),
                iconLeft: Images.Icons.Diagram,
                type: 'transactionHistory',
                isShow: false,
            },
        ],
    },
    {
        isPaddingBottom: true,
        title: getString('support'),
        childrenValue: [
            {
                label: getString('supportCenter'),
                iconLeft: Images.Icons.CenterSupport,
                type: 'supportCenter',
                isShow: false,
            },
            {
                label: getString('nearestTransactionOffice'),
                iconLeft: Images.Icons.location,
                type: 'nearestTransactionOffice',
                isShow: true,
            },
            {
                label: getString('interestCalculator'),
                iconLeft: Images.Icons.Calculator,
                type: 'interestCalculator',
                isShow: false,
            },
            {
                label: getString('policyAndPrivacy'),
                iconLeft: Images.Icons.Shield,
                type: 'policyAndPrivacy',
                isShow: false,
            },
            {
                label: getString('news'),
                iconLeft: Images.Icons.Internet,
                type: 'news',
                isShow: true,
            },
        ],
    },
    {
        isPaddingBottom: false,
        title: getString('setting'),
        childrenValue: [
            {
                label: getString('beneficiaryAccount'),
                iconLeft: Images.Icons.CardCoin,
                type: 'beneficiaryAccount',
                isShow: false,
            },
            {
                label: getString('changePassword'),
                iconLeft: Images.Icons.PasswordCheck,
                type: 'changePassword',
                isShow: false,
            },
            {
                label: getString('touchId'),
                iconLeft: Images.Icons.UserSquare,
                type: 'settingBiometric',
                isShow: false,
            },
            // {
            //     label: getString('requestDeleteAccount'),
            //     iconLeft: Images.Icons.Trash,
            //     type: 'requestDeleteAccount',
            // },
            {
                label: getString('logout'),
                iconLeft: Images.Icons.IconLogout,
                type: 'logout',
                isShow: false,
            },
        ],
    },
];
export const objKeyInformationAccount: {
    title: string;
    key: keyof ValueInformationAccountModel;
}[] = [
    { title: getString('phoneNumber'), key: 'phone' },
    { title: getString('email'), key: 'email' },
    { title: getString('permanentAddress'), key: 'permanentAddress' },
    { title: getString('addressContact'), key: 'addressContact' },
    { title: getString('cmnd'), key: 'cmnd' },
    { title: getString('dateOfBirth'), key: 'dateOfBirth' },
    { title: getString('dateRange'), key: 'dateRange' },
    { title: getString('gender'), key: 'gender' },
    { title: getString('expirationDate'), key: 'expirationDate' },
    { title: getString('grantedBy'), key: 'grantedBy' },
    {
        title: getString('authenticationStatus'),
        key: 'authenticationStatus',
    },
    {
        title: getString('authenticationChannel'),
        key: 'authenticationChannel',
    },
];
