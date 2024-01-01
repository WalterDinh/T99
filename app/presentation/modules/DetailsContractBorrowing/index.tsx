import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    AssetType,
    CheckModeHeader,
    CheckStatusText,
    ContractDebtGroup,
    DisbursementMethod,
} from 'app/shared/constants';
import styled from 'styled-components';
import dayjs from 'dayjs';
import images from 'app/assets/images';
import FormFooter from './components/FormFooter';
import { RouteProp } from '@react-navigation/native';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { GetContractDetailUseCase } from 'app/domain/customer/contract/GetContractDetailUseCase';
import ContractRepository from 'app/data/repository/contract';
import { StatusToast } from 'app/shared/constants';
import Toast from 'react-native-toast-message';
import ContractDetailModel from 'app/models/contract/ContractDetailModel';
import LineItem from 'app/presentation/components/items/LineItem';
import { neutral } from 'app/presentation/theme/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';

interface IProps {
    navigation: StackNavigationProp<
        ContractParamList,
        'BorrowingContractDetails'
    >;
    route: RouteProp<ContractParamList, 'BorrowingContractDetails'>;
}

const DetailsContractBorrowing = (props: IProps) => {
    const { navigation, route } = props;
    const { id, code, assetType } = route.params;
    const [data, setData] = useState(new ContractDetailModel());
    const lendingDate = dayjs(data?.lendingDate).format('DD/MM/YYYY');
    //! Effect
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetContractDetailUseCase(new ContractRepository(), {
            contractId: id,
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
    }, [id]);

    const renderStatusTitle = (status: ContractDebtGroup) => {
        switch (status) {
            case ContractDebtGroup.HasEnded:
                return getString('HasEnded');
            case ContractDebtGroup.InPeriod:
                return getString('InPeriod');
            case ContractDebtGroup.Liquidation:
                return getString('Liquidation');
            case ContractDebtGroup.OverPeriod:
                return getString('Overdue');
            case ContractDebtGroup.WaitForLiquidation:
                return getString('WaitForLiquidation');
            default:
                return '';
        }
    };


    //! Function
    const renderItem = () => {
        let title = '';
        switch (assetType) {
            case AssetType.Golf:
                title = getString('t99Golfer');
                break;
            case AssetType.Pledge:
                title = getString('t99Pledge');
                break;
            case AssetType.RealEstate:
                title = getString('t99RealEstate');
                break;
            default:
                break;
        }

        let disbursementMethod = getString('transfer');
        if (data.disbursementMethodId === DisbursementMethod.Cash) {
            disbursementMethod = getString('cash');
        }
        return (
            <CommonCard
                disabled
                headerTitleTopHalf={title}
                headerTitleBottomHalf={code}
                checkMode={CheckModeHeader?.TwoActive}
                dataCard={[
                    {
                        title: getString('enterFullname2'),
                        value: data?.name,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: false,
                    },
                    {
                        title: getString('dateSuccess'),
                        value: lendingDate,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: false,
                    },
                    {
                        title: getString('termLimit'),
                        // value: `${data?.period} ${getString('month')}`,
                        value: data?.period,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: false,
                    },
                    {
                        title: getString('disbursementForm'),
                        value: disbursementMethod,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: false,
                    },
                    {
                        title: getString('statusContract'),
                        value: renderStatusTitle(data.debtGroupId),
                        styleValue: {
                            fontFamily: theme.font.Medium,
                            fontSize: Dimensions.moderateScale(15),
                        },
                        status: CheckStatusText.Error,
                        currency: false,
                    },
                    {
                        title: getString('amountBorrowing'),
                        value: data?.loanAmount,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: true,
                    },
                    {
                        title: getString('estimatedContract'),
                        value: data?.accumulationInterestAmount,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: true,
                    },
                    {
                        title: getString('estimatedContractAmount'),
                        value: data?.accumulationManagementFeeAmount,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: true,
                    },
                    {
                        title: getString('insurance'),
                        value: data?.insuranceAmount,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                        currency: true,
                    },
                    {
                        title: getString('salesStaffCode'),
                        value: data?.employeeCode,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                ]}
            />
        );
    };

    //! Data
    const borrowingStatus = [
        {
            status: CheckStatusText.NeutralBlack,
            styleTextInput: { borderTopWidth: 0 },
            styleValue: { fontFamily: theme.font.Bold },
            title: getString('allBorrowing'),
            value: data?.contractAmount,
            currency: true,
        },
        {
            status: CheckStatusText.Success,
            styleTextInput: { undefined },
            styleValue: { fontFamily: theme.font.Bold },
            title: getString('paid'),
            value: data?.paid,
            currency: true,
        },
        {
            status: CheckStatusText.Error,
            styleTextInput: { undefined },
            styleValue: { fontFamily: theme.font.Bold },
            title: getString('debt'),
            value: data?.contractAmount - data?.paid,
            currency: true,
        },
    ];

    return (
        <ScrollView>
            <View style={styles.formContent}>
                <View style={styles.formTitleInfoContract}>
                    <TextPrimary style={styles.textTitleInfoContract}>
                        {getString('borrowingStatus')}
                    </TextPrimary>
                </View>
            </View>
            <View style={styles.borrowingStatusStyle}>
                {borrowingStatus.map((el: any, index: any) => {
                    return (
                        <LineItem
                            key={index}
                            status={el?.status}
                            styleTextInput={el?.styleTextInput}
                            styleValue={el?.styleValue}
                            title={el?.title}
                            value={el?.value}
                            currency={el?.currency}
                        />
                    );
                })}
            </View>
            <View style={styles.formContent}>
                <View style={styles.formTitleInfoContract}>
                    <TextPrimary style={styles.textTitleInfoContract}>
                        {getString('contractInfo')}
                    </TextPrimary>
                </View>
            </View>
            <FlatList
                data={[1]}
                renderItem={renderItem}
                style={{ marginBottom: Dimensions.moderateScale(8) }}
            />
            <FormFooter disabled title={getString('details')} />
            <FormFooter
                title={getString('informationQuery')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('InformationQuery', {
                        id: id,
                        code: code,
                        assetType: assetType,
                    })
                }
            />
            <FormFooter
                title={getString('deal')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('Transaction', {
                        itemId: id,
                        code: code,
                        loanAmount: data?.loanAmount,
                        assetType: assetType,
                    })
                }
            />
        </ScrollView>
    );
};

export default DetailsContractBorrowing;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formTitleInfoContract: {
        marginHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.moderateScale(16),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
    textTitleInfoContract: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
    formContent: {
        backgroundColor: Colors.neutral.white,
    },
    borrowingStatusStyle: {
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(20),
    },
});
