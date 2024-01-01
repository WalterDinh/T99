import ValueInformationAccountModel from 'app/models/InformationAccount/ValueInformationModel';
import AlertSetting from 'app/presentation/components/alert/alertSetting';
import LineItem from 'app/presentation/components/items/LineItem';
import { useGetUser } from 'app/presentation/hooks/useGetUser';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckStatusText } from 'app/shared/constants';
import TimeUtils from 'app/shared/helper/TimeUtils';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { HeadImage } from '..';
import { objKeyInformationAccount } from '../dataSetting';
import dayjs from 'dayjs';
import { useCheckVerify } from 'app/presentation/hooks/useCheckVerify';

const InformationAccount = () => {
    //! State
    const { isEkyc } = useCheckVerify();
    const userData = useGetUser()?.user;
    const valueObj = ValueInformationAccountModel.parseFromJson({
        phone: userData?.phoneNumber || '',
        email: userData.email || '',
        permanentAddress: !isEkyc ? '' : userData?.address || '',
        addressContact: !isEkyc ? '' : userData?.addressContact  || '',
        cmnd: !isEkyc ? '' : userData.noDoc || '',
        dateOfBirth: !isEkyc
            ? ''
            : dayjs(userData.birthOfDay).isValid()
            ? TimeUtils.formatForwardSlashDate(dayjs(userData.birthOfDay))
            : userData.birthOfDay,
        dateRange: !isEkyc
            ? ''
            : dayjs(userData.validDate).isValid()
            ? TimeUtils.formatForwardSlashDate(dayjs(userData.validDate))
            : userData.validDate,
        gender: !isEkyc
            ? ''
            : userData.gender == 1 || userData.gender == 0
            ? getString(userData.gender == 1 ? 'male' : 'female')
            : '',
        expirationDate: !isEkyc
            ? ''
            : dayjs(userData.expiredDate).isValid()
            ? TimeUtils.formatForwardSlashDate(dayjs(userData.expiredDate))
            : userData.expiredDate,
        grantedBy: !isEkyc ? '' : userData.issuedBy || '',
        authenticationStatus: getString(isEkyc ? 'verified' : 'notVerify'),
        authenticationChannel: !isEkyc
            ? ''
            : userData.authenticationChannel || '',
    });

    return (
        <SafeAreaView style={styles.container}>
            <HeadImage />
            <ScrollView
                contentContainerStyle={styles.containerContent}
                showsVerticalScrollIndicator={false}
            >
                {isEkyc && <AlertSetting />}

                <View style={styles.lineItem}>
                    {objKeyInformationAccount?.map((elm, idx) => {
                        const checkColor = !isEkyc
                            ? CheckStatusText.Error
                            : CheckStatusText.Success;
                        const isLastItem =
                            objKeyInformationAccount.length - 1 === idx;
                        return (
                            <LineItem
                                styleValue={
                                    elm?.key === 'authenticationStatus'
                                        ? { fontFamily: theme.font.Bold }
                                        : undefined
                                }
                                status={
                                    elm?.key === 'authenticationStatus'
                                        ? checkColor
                                        : undefined
                                }
                                title={elm?.title}
                                value={valueObj[elm?.key]}
                                styleTextInput={
                                    isLastItem
                                        ? {
                                              borderBottomWidth: 1,
                                              borderColor: Colors.neutral.s190,
                                          }
                                        : {}
                                }
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
    },
    containerContent: {
        paddingVertical: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: neutral.white,
        borderTopLeftRadius: Dimensions.Spacing.small,
        borderTopRightRadius: Dimensions.Spacing.small,
    },
    lineItem: {
        paddingTop: Dimensions.Spacing.large,
    },
});
export default InformationAccount;
