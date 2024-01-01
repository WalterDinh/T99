import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ContractRepository from 'app/data/repository/contract';
import { GetContractPayingDebtScheduleDetailUseCase } from 'app/domain/customer/contract/GetContractPayingDebtScheduleDetailUseCase';
import ContractPayingDebtDetailScheduleModel from 'app/models/contract/ContractPayingDebtDetailScheduleModel';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import FormNoti, {
    NotiType,
} from 'app/presentation/components/notification/FormNoti';
import { getString } from 'app/presentation/localization';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
interface IProps {
    navigation: StackNavigationProp<ContractParamList, 'TimePayment'>;
    route: RouteProp<ContractParamList, 'TimePayment'>;
}

const TimePayment = (props: IProps) => {
    const { navigation, route } = props;
    const [data, setData] = useState(
        new ContractPayingDebtDetailScheduleModel(),
    );

    useEffect(() => {
        navigation.setOptions({ title: route.params.title });
    }, []);

    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetContractPayingDebtScheduleDetailUseCase(
            new ContractRepository(),
            {
                id: route.params.id,
            },
        )
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
    }, [route.params.id]);
    const getRemainDay = (): number => {
        if (typeof route?.params?.title === 'string') {
            let finishDay = route.params.title.split(':')[1].toString() ?? '';
            const date: number[] = finishDay.split('/') ?? [];
            const remainDay =
                dayjs(new Date(date[2], date[1], date[0])).diff(
                    dayjs(),
                    'days',
                ) || 100;
            return remainDay;
        }
        return 1000;
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {getRemainDay() <= 15 && (
                    <FormNoti
                        notiType={NotiType.Error}
                        title={
                            getRemainDay() > 0
                                ? getString('youHaveSomeDays', {
                                      val: getRemainDay(),
                                  })
                                : getString('paymentOverdue')
                        }
                        styleTitle={styles.formNotiTitle}
                        styleContainer={styles.formNotiContainer}
                    />
                )}

                <CommonCard
                    disabled
                    styleCommonCard={styles.cardDetail}
                    dataCard={[
                        {
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(12),
                                lineHeight: Dimensions.moderateScale(22),
                                fontFamily: theme.font.Medium,
                            },
                            fixTitle: getString('details'),
                        },
                        {
                            title: getString('allAmountPayment'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value: data.totalPaymentAmount,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Bold,
                                color: Colors.primary.s600,
                            },
                        },
                        {
                            title: getString('principal'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value: data.remainOriginAmount,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                        },
                        {
                            title: getString('interest'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value: data.remainInterestAmount,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                        },
                        {
                            title: getString('insuranceFees'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value: data.totalPenaltyFee,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                        },
                    ]}
                />
                <View
                    style={{
                        height: 8,
                        backgroundColor:
                            theme.color.backgroundColorSecondaryVariant,
                    }}
                ></View>
                <CommonCard
                    styleCommonCard={styles.cardStatus}
                    disabled
                    dataCard={[
                        {
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(12),
                                lineHeight: Dimensions.moderateScale(22),
                                fontFamily: theme.font.Medium,
                            },
                            fixTitle: getString('paymentStatus'),
                        },
                        {
                            title: getString('paymentSuccess'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value:
                                data.totalPaymentAmount -
                                data.totalPaymentRemainAmount,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Bold,
                                color: Colors.success.brand,
                            },
                        },
                        {
                            title: getString('remainingAmount'),
                            styleTitle: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Regular,
                            },
                            value: data.totalPaymentRemainAmount,
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                fontFamily: theme.font.Bold,
                                color: Colors.primary.s600,
                            },
                        },
                    ]}
                />
            </ScrollView>
            <View style={styles.btn}>
                <AppButton name={getString('payNow')} />
            </View>
            {/* </ScrollView> */}
        </View>
    );
};

export default TimePayment;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.moderateScale(60),
    },
    formNotiTitle: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Medium,
    },
    formNotiContainer: {
        marginHorizontal: Dimensions.moderateScale(22),
        marginVertical: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.small,
    },
    cardDetail: {
        borderRadius: 0,
        marginBottom: Dimensions.Spacing.large,
    },
    cardStatus: {
        borderRadius: 0,
    },
    btn: {
        marginHorizontal: Dimensions.moderateScale(22),
    },
});
