import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect } from 'react';
import { TextPrimary } from 'app/presentation/components';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { getString } from 'app/presentation/localization';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { useNavigation } from '@react-navigation/native';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { CheckModeHeader, StatusToast } from 'app/shared/constants';
import Toast from 'react-native-toast-message';
import ContractRepository from 'app/data/repository/contract';
import { Field, Formik } from 'formik';
import { postContractLoanExtensionUseCase } from 'app/domain/customer/contract/PostContractLoanExtension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoanExtensionScreen = ({ route }: any) => {
    const { itemId, itemTitleHeader, code } = route.params;

    const navigation = useNavigation();

    const onSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const body = {
            note: values.note,
            timeUnit: values.timeUnit,
            contracId: values.contractId,
            period: values.period,
            newPeriod: values.newPeriod,
            originAmount: values.originAmount,
            interestAmount: values.interestAmount,
            overduePenaltyFee: values.overduePenaltyFee,
        };
        new postContractLoanExtensionUseCase(new ContractRepository(), {
            originAmount: values.originAmount,
            timeUnit: values.timeUnit,
            note: values.note,
        })
            .execute()
            .then((res) => {
                if (res?.status === 200) {
                    navigation.navigate('RequestSuccess', { body });
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `${res?.data?.message}`,
                            'requestLoanFaild',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([`errors.${err?.message}`]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.styleContent}>
                    <View style={styles.formInfoLoan}>
                        <TextPrimary style={styles.textInfoLoan}>
                            {getString('loanInformationExtension')}
                        </TextPrimary>
                    </View>
                    <CommonCard
                    customStyleHeaderCardContainer={styles.borderNone}
                    headerTitleTopHalf={itemTitleHeader}
                    headerTitleBottomHalf={code}
                    checkMode={CheckModeHeader?.TwoActive}
                    onPress={() =>
                        navigation.navigate('DetailsLoanExtension', {
                            itemId: itemId,
                            itemTitleHeader: itemTitleHeader,
                        })
                    }
                />
                    <View style={styles.colorBackground}></View>
                    <Formik
                        initialValues={{
                            contracId: '',
                            period: 0,
                            timeUnit: 1,
                            note: '',
                            newPeriod: '',
                            originAmount: 0,
                            interestAmount: 0,
                            overduePenaltyFee: 0,
                            totalPayment: 0,
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        onSubmit={onSubmit}
                    >
                        {({ values, handleSubmit, handleChange }) => {
                            return (
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <View>
                                        <View style={styles.formInput}>
                                            <Field
                                                name="originAmount"
                                                label={getString('amount2')}
                                                isRequire
                                                secureTextEntry
                                                component={DropdownInput}
                                                style={{ flex: 1 }}
                                                placeholder={1}
                                            />
                                            <View
                                                style={{
                                                    marginHorizontal:
                                                        Dimensions.moderateScale(
                                                            12,
                                                        ),
                                                }}
                                            >
                                                <TextPrimary
                                                    style={{
                                                        color: Colors.neutral
                                                            .s400,
                                                    }}
                                                >
                                                    {'-'}
                                                </TextPrimary>
                                            </View>
                                            <Field
                                                name="timeUnit"
                                                label={getString('unit')}
                                                isRequire
                                                secureTextEntry
                                                style={{ flex: 1 }}
                                                placeholder={'Tháng'}
                                                component={DropdownInput}
                                            />
                                        </View>
                                        <View style={styles.formNote}>
                                            <TextPrimary
                                                style={styles.styleText}
                                            >
                                                {getString('note')}
                                            </TextPrimary>
                                            <View style={styles.textInput}>
                                                <TextInput
                                                    placeholder={getString(
                                                        'importContent',
                                                    )}
                                                    onChangeText={handleChange(
                                                        'note',
                                                    )}
                                                    value={values.note}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            paddingHorizontal:
                                                Dimensions.moderateScale(22),
                                            marginBottom: Dimensions.bottomPadding
                                        }}
                                    >
                                        <AppButton
                                            type={ButtonType.CircleBorderRed}
                                            name={getString('request')}
                                            styleBtn={{
                                                borderRadius:
                                                    Dimensions.moderateScale(
                                                        22,
                                                    ),
                                            }}
                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default LoanExtensionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    styleContent: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: Colors.neutral.white,
    },
    colorBackground: {
        height: 8,
        backgroundColor: Colors.neutral.grayScale,
    },
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
    formInfoLoanEx: {
        backgroundColor: Colors.neutral.white,
    },
    styleText: {
        fontSize: Dimensions.moderateScale(15),
    },
    formInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(22),
        alignItems: 'center',
        paddingBottom: Dimensions.moderateScale(28),
    },
    formNote: {
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale,
        paddingVertical: Dimensions.moderateScale(12),
        paddingHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(4),
        marginTop: Dimensions.moderateScale(8),
        height: Dimensions.moderateScale(200),
        marginBottom: Dimensions.moderateScale(80),
    },
    borderNone: {
        borderBottomWidth: 0,
    },
});
