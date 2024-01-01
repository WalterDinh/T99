import { useNavigation } from '@react-navigation/native';
import images from 'app/assets/images';
import TransactionRepository from 'app/data/repository/transaction';
import { Input, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import { getString } from 'app/presentation/localization';
import BankSelectors from 'app/presentation/redux/selectors/bank';
import { Colors, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { IReducer } from 'app/shared/interfaces/common';
import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ItemAccount from '../BeneficiaryInformation/ItemAccount';
import Toast from 'react-native-toast-message';
import { DateTimeFormat, StatusToast } from 'app/shared/constants';
import InputForm from 'app/presentation/components/input/InputForm';
import TimeUtils from 'app/shared/helper/TimeUtils';
import dayjs from 'dayjs';


// const height = Dimensions.screenHeight();
const RequestDisbursement = ({ route }: any) => {
    const navigation = useNavigation();
    const { itemId, itemTitleHeader, code, loanAmount } = route.params;
    const accountBenefitSelectors: IReducer<any> = useSelector(
        BankSelectors.selectAccountBenefitReducer,
    )?.accountBenefitReducer || {};

    const accountDefault = accountBenefitSelectors.data?.accountDefault;

    //! Function
    const onSubmit = (values: any) => {
        navigation.navigate('RequestSuccess')

        // LoadingManager.setLoading(true);
        // const { disbursementAmount } = values;

        // new TransactionRepository()
        //     .postRequestDisbursement(
        //         {
        //             accountBankCustomerId: accountDefault?.accountBankCustomerId,
        //             contractId: code,
        //             disbursementAmount: disbursementAmount,
        //             amountToPayPeriodical: 0,
        //         })
        //     .then((res) => {
        //         if (res?.status === 200 && res?.data?.success === true) {
        //             Toast.show({
        //                 type: StatusToast.Success,
        //                 text2: getString('addToSuccessfulAccount'),
        //             });
        //             navigation.navigate('RequestSuccess')
        //         } else {
        //             Toast.show({
        //                 type: StatusToast.Error,
        //                 text2: getString([`errors.${res?.data?.message}`, 'errorMessageCommon']),
        //             });
        //         }
        //     })
        //     .catch((err) => {
        //         Toast.show({
        //             type: StatusToast.Error,
        //             text2: getString([`errors.${err?.message}`, 'errorMessageCommon']),
        //         });
        //     })
        //     .finally(() => {
        //         LoadingManager.setLoading(false);
        //     });
    };

    return (
        <View style={{ flex: 1, backgroundColor: neutral.white }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.formInfoLoan}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('informationLoanAmount')}
                    </TextPrimary>
                </View>
                <CommonCard
                    disabled
                    headerTitleTopHalf={itemTitleHeader}
                    headerTitleBottomHalf={code}
                    // styleCommonCard={{ marginBottom: 8 }}
                    dataCard={[
                        {
                            title: getString('amountBorrowing'),
                            value: loanAmount,
                            currency: true,
                        },
                        {
                            title: getString('disbursementLimit'),
                            value: 300000000,
                            currency: true,
                        },
                    ]}
                />
                <Formik
                    initialValues={{
                        date: '',
                        disbursementAmount: ''
                    }}
                    initialTouched={{
                        disbursementAmount: true,
                    }}
                    // validationSchema={validateSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validateOnMount={false}
                    onSubmit={onSubmit}
                >
                    {({ values, handleSubmit, setFieldValue, errors }) => {
                        return (
                            <>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.line} />
                                    <View style={styles.formRequest}>
                                        <TextPrimary style={styles.textInfoLoan}>
                                            {getString('requestDisbursement2')}
                                        </TextPrimary>
                                        <Field
                                            name="date"
                                            label={getString('disbursementDate')}
                                            placeholder={getString('chooseDate')}
                                            isRequire
                                            minimumDate={new Date()}
                                            component={InputDatePicker}
                                            onPress={(date: Date) => {
                                                setFieldValue(
                                                    'date',
                                                    dayjs(date).format(
                                                        DateTimeFormat.APIFormat,
                                                    ),
                                                );
                                            }}
                                            value={
                                                dayjs(values.date).isValid()
                                                    ? TimeUtils.formatForwardSlashDate(
                                                        dayjs(values.date),
                                                    )
                                                    : values.date
                                            }
                                        />
                                        <Field
                                            name="disbursementAmount"
                                            label={getString('disbursementAmount')}
                                            isRequire
                                            placeholder={getString('enterMoneyPlaceholder')}
                                            component={InputForm}
                                            iconRight={
                                                <TextPrimary style={styles.iconRightField}>
                                                    {'|'} {getString('vnd')}
                                                </TextPrimary>
                                            }
                                            keyboardType="numeric"
                                            currency
                                            inputContainerStyle={{ paddingBottom: 0 }}
                                        />
                                    </View>
                                    <View style={styles.line} />
                                    <View style={styles.formAccount}>
                                        <View style={styles.account}>
                                            <TextPrimary style={styles.textAccount}>
                                                {getString('accountBenefits')}
                                            </TextPrimary>
                                            <TouchableOpacity
                                                style={styles.formChange}
                                                onPress={() =>
                                                    navigation.navigate('BeneficiaryStack')
                                                }
                                            >
                                                <TextPrimary
                                                    style={{
                                                        color: Colors.primary.brand,
                                                        fontFamily: theme.font.Medium,
                                                    }}
                                                >
                                                    {getString('change')}
                                                </TextPrimary>
                                                <ImageIconCircle
                                                    source={images.Icons.arrowRight}
                                                    style={styles.iconChange}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <ItemAccount
                                            styleContainer={styles.styleItemAccount}
                                            disabled
                                            bankName={accountDefault?.name}
                                            source={{ uri: accountDefault?.logo }}
                                            accountNameValue={accountDefault?.creatorText}
                                            accountNumberValue={accountDefault?.numberAccount}
                                            fontFamily={theme.font.Bold}
                                            color={Colors.secondary.brand}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    marginHorizontal: Dimensions.moderateScale(22),
                                }}>
                                    <AppButton
                                        name={getString('confirm')}
                                        textStyle={{
                                            fontSize: 17,
                                            fontFamily: theme.font.Medium,
                                        }}
                                        styleBtn={{
                                            marginBottom: Dimensions.bottomPadding
                                        }}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </>
                        );
                    }}
                </Formik>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RequestDisbursement;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formInfoLoan: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.moderateScale(16),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale,
    },
    textInfoLoan: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
    formRequest: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    formAccount: {
        backgroundColor: Colors.neutral.white,
        paddingBottom: Dimensions.Spacing.large,
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Dimensions.moderateScale(22),
    },
    textAccount: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.moderateScale(12),
    },
    formChange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconChange: {
        width: 16,
        height: 16,
        tintColor: Colors.primary.brand,
    },
    styleItemAccount: {
        borderWidth: 0,
    },
    line: {
        backgroundColor: theme.color.backgroundColorSecondary,
        height: 8,
        width: '100%',
        marginBottom: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.small,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
});
