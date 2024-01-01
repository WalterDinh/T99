import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import {
    CheckModeHeader,
    CheckStatusActive,
    DebtRepaymentPlanStatus,
    StatusToast,
} from 'app/shared/constants';
import { getString } from 'app/presentation/localization';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors, theme } from 'app/presentation/theme';
import LoadingManager from 'app/shared/helper/LoadingManager';
import ContractRepository from 'app/data/repository/contract';
import Toast from 'react-native-toast-message';
import { GetContractPayingDebtScheduleUseCase } from 'app/domain/customer/contract/GetContractPayingDebtScheduleUseCase';
import ContractPayingDebtSchedule from 'app/models/contract/ContractPayingDebtScheduleModel';
import { MyFlatList } from 'app/presentation/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';
import { RouteProp } from '@react-navigation/native';

interface IProps {
    navigation: StackNavigationProp<ContractParamList, 'PaymentPlan'>;
    route: RouteProp<ContractParamList, 'PaymentPlan'>;

}
export const renderTextStatus = (status: DebtRepaymentPlanStatus) => {
    switch (status) {
        case DebtRepaymentPlanStatus.Done:
            return getString('done');
        case DebtRepaymentPlanStatus.OutOfDate:
            return getString('outOfDate');
        case DebtRepaymentPlanStatus.PayAPart:
            return getString('payAPart');
        case DebtRepaymentPlanStatus.Undue:
            return getString('undue');
        default:
            return getString('done');
    }
};
const PaymentPlan = (props: IProps) => {
    const { navigation, route } = props;
    const contractId = route.params.id;
    const [dataList, setDataList] = useState<ContractPayingDebtSchedule[]>([]);
    //! Function
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetContractPayingDebtScheduleUseCase(new ContractRepository(), {
            contractId: contractId,
        })
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    let dataListDebt;
                    dataListDebt = res?.data.data;
                    setDataList(dataListDebt);
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

    

    const renderStatusTitle = (status: DebtRepaymentPlanStatus) => {
        switch (status) {
            case DebtRepaymentPlanStatus.Done:
                return CheckStatusActive.GreenBackgroundWhite;
            case DebtRepaymentPlanStatus.OutOfDate:
                return CheckStatusActive.Error;
            case DebtRepaymentPlanStatus.PayAPart:
                return CheckStatusActive.HalfGray;
            case DebtRepaymentPlanStatus.Undue:
                return CheckStatusActive.Warning;
            default:
                return CheckStatusActive.GreenBackgroundWhite;
        }
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: ContractPayingDebtSchedule;
        index: number;
    }) => {
        return (
            <CommonCard
                onPress={() =>
                    navigation.navigate('TimePayment', {
                        id: item.id,
                        title: item.periodName,
                    })
                }
                styleCommonCard={styles.formItem}
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
                        fixTitle: item?.periodName || '',
                        styleTextInput: {
                            paddingBottom: Dimensions.Spacing.small,
                        },
                        statusTitle: renderStatusTitle(item.statusId),
                        contentRight: renderTextStatus(item.statusId),
                        currency: false,
                    },
                    {
                        title: getString('amountPayment'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: item?.totalPaymentAmount || 0,
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                        currency: true,
                    },
                ]}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <MyFlatList
                contentContainerStyle={{
                    width: '100%',
                    paddingBottom: Dimensions.bottomPadding,
                }}
                showsVerticalScrollIndicator={false}
                data={dataList}
                renderItem={renderItem}
            />
        </View>
    );
};

export default PaymentPlan;

const styles = StyleSheet.create({
    formItem: {
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(8),
        marginTop: Dimensions.moderateScale(16),
    },
});
