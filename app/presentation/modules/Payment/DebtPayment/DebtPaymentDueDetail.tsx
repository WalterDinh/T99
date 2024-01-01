import { StackNavigationProp } from '@react-navigation/stack';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import CopyCommon from 'app/presentation/components/copyCommon';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { CheckModeHeader } from 'app/shared/constants';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    dataDebtPaymentDueDetailValue
} from '../../InformationVerification/constant';
import { stylesDebtDetail } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'DebtPaymentDueDetail'>;
}
const DebtPaymentDueDetail = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={stylesDebtDetail.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CommonCard
                    checkMode={CheckModeHeader.Outline}
                    headerTitleTopHalf="Mã hợp đồng"
                    headerTitleBottomHalf="A3004563"
                    dataCard={dataDebtPaymentDueDetailValue}
                    disabled
                    customTextTitle={stylesDebtDetail.customTextTitle}
                    customStyleTitleBottomHalf={
                        stylesDebtDetail.customStyleTitleBottomHalf
                    }
                    stylesTitle={stylesDebtDetail.stylesTitle}
                    styleCommonCard={stylesDebtDetail.styleCommonCard}
                />
                <CopyCommon
                    style={stylesDebtDetail.copyCommon}
                    value="Thanh toán nợ đến hạn_kỳ 3_A3004563"
                />
            </ScrollView>
            <View style={stylesDebtDetail.btn}>
                <AppButton
                    onPress={() => navigation.navigate('SelectMethodPay')}
                    name={getString('pay')}
                />
            </View>
        </View>
    );
};
export default DebtPaymentDueDetail;
