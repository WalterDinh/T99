import { StackNavigationProp } from '@react-navigation/stack';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, CheckStatusActive } from 'app/shared/constants';
import React from 'react';
import { FlatList } from 'react-native';
import { stylesDebt } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'DebtPaymentDue'>;
}
const DebtPaymentDue = (props:IProps) => {
    const {navigation} = props;

    const renderItem = ({ item, index }: any) => {
        return (
            <CommonCard
                onPress={() =>
                    navigation.navigate('DebtPaymentDueDetail')
                }
                styleCommonCard={stylesDebt.formItem}
                key={index}
                checkMode={CheckModeHeader?.TwoActive}
                dataCard={[
                    {
                        styleTitle: {
                            color: Colors.secondary.brand,
                            fontSize: Dimensions.moderateScale(17),
                            lineHeight: Dimensions.moderateScale(22),
                            fontFamily: theme.font.Medium,
                        },
                        fixTitle: index % 2 ? 'Kỳ 2: T99_Invest' : 'Kỳ 3: T99_Pawn' ,
                        statusTitle:
                            index % 2
                                ? undefined
                                : CheckStatusActive.Error,
                        contentRight: index % 2 ? 'Đến hạn' : 'Quá hạn' ,
                    },
                    {
                        title: getString('contractCode'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: 'HD000012312312312',
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                    {
                        title: getString('dateDue'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: '25/06/2022',
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                ]}
            />
        );
    };
    return <FlatList data={[1, 2]} renderItem={renderItem} />;
};
export default DebtPaymentDue;
