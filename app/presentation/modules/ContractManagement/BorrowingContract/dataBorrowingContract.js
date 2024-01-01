import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
export default dataBorrowingContract = [
    {
        id: 'HD000012312312312',
        titleHeader:'T99_Golf',
        title: getString('loanAmount'),
        value: '10450760',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15},
        currency: true,
    },
    {
        id: 'HD00001231299999',
        titleHeader:'T99_Golf',
        title: getString('Ngày đến hạn'),
        value: '12/12/2022',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15},
    },
    {
        id: 'HD000012312312312',
        titleHeader:'T99_Invest',
        title: getString('Số tiền cần thanh toán'),
        value: '170450760',
        currency: true,
    },
    {
        id: 'HD000012312312312',
        titleHeader:'T99_Invest',
        title: getString('status'),
        value: 'Nợ trong hạn',
    },
];
