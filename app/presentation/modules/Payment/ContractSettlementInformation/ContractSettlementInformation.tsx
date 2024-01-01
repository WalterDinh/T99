import { StackNavigationProp } from '@react-navigation/stack';
import ContractRepository from 'app/data/repository/contract';
import { GetPaymentContractDetailUseCase } from 'app/domain/customer/contract/GetPaymentContractDetailUseCase';
import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import CopyCommon from 'app/presentation/components/copyCommon';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, ChoosePayments, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
// import { dataValue } from '../../InformationVerification/constant';
import { stylesInformation } from './style';
import Toast from 'react-native-toast-message';

export type ParamsGetPaymentContractDetail = {
    contractId: string;
    transactionType?: string | null | undefined;
};
interface IProps {
    navigation: StackNavigationProp<
        HomeStackParamList,
        'ContractSettlementInformation'
    >;
    route: any,
}
const ContractSettlementInformation = (props: IProps) => {
    const { navigation, route } = props;
    const { contractId, code, transactionType } = route.params;

    const [data, setData] = useState<any>(null);

    const dataValue = [
        {
            title: getString('amountPaid'),
            value: data?.periodPaid,
            styleValue: {},
            currency: false,
        },
        {
            title: getString('principalDebt'),
            value: data?.principalAmount,
            styleValue: {},
            currency: true,
        },
        {
            title: getString('totalAmountPaid'),
            value: data?.totalPaidAmount,
            styleValue: {},
            currency: true,
        },
        {
            title: getString('remainingBalance'),
            value: data?.remainingBalance,
            styleValue: {},
            currency: true,
        },
        {
            title: getString('penaltyFeeSettlement'),
            value: data?.overDueFeeAmount,
            styleValue: {},
            currency: true,
        },
        {
            title: getString('sumSettlement'),
            value: data?.totalPaymentRemainAmount,
            styleValue: { color: theme.color.textColorSecondaryVariant, fontFamily: theme.font.Bold },
            currency: true,
        },
    ];

    //! Effect
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetPaymentContractDetailUseCase(new ContractRepository(), {
            contractId: contractId,
            transactionType: transactionType,
        })
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data
                ) {
                    setData(res?.data?.data);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    }, [contractId]);
    
    return (
        <View style={stylesInformation.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={stylesInformation.title}>
                    <TextPrimary style={stylesInformation.text}>
                        {getString('contractSettlementInformation')}
                    </TextPrimary>
                </View>

                <CommonCard
                    checkMode={CheckModeHeader.Outline}
                    headerTitleTopHalf={getString('contractCode')}
                    headerTitleBottomHalf={code}
                    dataCard={dataValue}
                    disabled
                    customTextTitle={stylesInformation.customTextTitle}
                    customStyleTitleBottomHalf={
                        stylesInformation.customStyleTitleBottomHalf
                    }
                    stylesTitle={stylesInformation.stylesTitle}
                    styleCommonCard={stylesInformation.styleCommonCard}
                />

                <CopyCommon value={`Tất toán hợp đồng_${code}`} />
            </ScrollView>
            <View style={stylesInformation.btn}>
                <AppButton
                    onPress={() => navigation.navigate('SelectMethodPay', {
                        type: ChoosePayments.Settlement,
                        body: {
                            contractId: contractId,
                        }

                    })}
                    name={getString('pay')}
                />
            </View>
        </View>
    );
};
export default ContractSettlementInformation;
