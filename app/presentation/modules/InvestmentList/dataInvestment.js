import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
import { CheckStatusText } from 'app/shared/constants';
export default dataInvestment = [
    {
        id: 'A0123123',
        titleHeader: 'T99 Invest',
        title: getString('period'),
        value: '6 Tháng',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        id: 'HD000012312312312',
        titleHeader: 'T99_Golf',
        title: getString('innitiatedDate'),
        value: '30/06/2021',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
];
