import { StackNavigationProp } from '@react-navigation/stack';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import CopyCommon from 'app/presentation/components/copyCommon';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { CheckModeHeader } from 'app/shared/constants';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { dataPartialRepaymentDetailValue } from '../../InformationVerification/constant';
import { stylesPartialRepaymentDetail } from './style';
interface IProps {
    navigation: StackNavigationProp<
        HomeStackParamList,
        'PartialRepaymentDetail'
    >;
}
const PartialRepaymentDetail = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={stylesPartialRepaymentDetail.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CommonCard
                    checkMode={CheckModeHeader.Outline}
                    headerTitleTopHalf="Mã hợp đồng"
                    headerTitleBottomHalf="A3004563"
                    dataCard={dataPartialRepaymentDetailValue}
                    disabled
                    customTextTitle={stylesPartialRepaymentDetail.customTextTitle}
                    customStyleTitleBottomHalf={
                        stylesPartialRepaymentDetail.customStyleTitleBottomHalf
                    }
                    stylesTitle={stylesPartialRepaymentDetail.stylesTitle}
                    styleCommonCard={stylesPartialRepaymentDetail.styleCommonCard}
                />

                <CopyCommon
                    style={stylesPartialRepaymentDetail.copyCommon}
                    value="Trả nợ gốc 1 phần_A3004563"
                />
            </ScrollView>
            <View style={stylesPartialRepaymentDetail.btn}>
                <AppButton
                    onPress={() => navigation.navigate('SelectMethodPay')}
                    name={getString('pay')}
                />
            </View>
        </View>
    );
};
export default PartialRepaymentDetail;
