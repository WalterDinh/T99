import { StackNavigationProp } from '@react-navigation/stack';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import CopyCommon from 'app/presentation/components/copyCommon';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { CheckModeHeader } from 'app/shared/constants';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { dataInterestFeeValue } from '../../InformationVerification/constant';
import { stylesInterestFeeDetail } from './style';
interface IProps {
    navigation: StackNavigationProp<
        HomeStackParamList,
        'InterestFeeDetail'
    >;
}
const InterestFeeDetail = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={stylesInterestFeeDetail.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CommonCard
                    checkMode={CheckModeHeader.Outline}
                    headerTitleTopHalf="Mã hợp đồng"
                    headerTitleBottomHalf="A3004563"
                    dataCard={dataInterestFeeValue}
                    disabled
                    customTextTitle={stylesInterestFeeDetail.customTextTitle}
                    customStyleTitleBottomHalf={
                        stylesInterestFeeDetail.customStyleTitleBottomHalf
                    }
                    stylesTitle={stylesInterestFeeDetail.stylesTitle}
                    styleCommonCard={stylesInterestFeeDetail.styleCommonCard}
                />

                <CopyCommon
                    style={stylesInterestFeeDetail.copyCommon}
                    value="Thanh toán lãi phí _A3004563"
                />
            </ScrollView>
            <View style={stylesInterestFeeDetail.btn}>
                <AppButton
                    onPress={() => navigation.navigate('SelectMethodPay')}
                    name={getString('pay')}
                />
            </View>
        </View>
    );
};
export default InterestFeeDetail;
