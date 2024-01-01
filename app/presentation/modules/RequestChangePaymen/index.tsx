import { useNavigation } from '@react-navigation/native';
import ContractRepository from 'app/data/repository/contract';
import { postContractRepaymentUseCase } from 'app/domain/customer/contract/PostContractRepayment';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, DateTimeFormat, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import TimeUtils from 'app/shared/helper/TimeUtils';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React from 'react';
import {
    StyleSheet,
    TextInput, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

const RequestChangePaymentScreen = ({ route }: any) => {
    const { itemId, code, itemTitleHeader } = route.params;

    const navigation = useNavigation();

    const OnSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const body = {
            contractId: itemId,
            newPayOriginDate: values.newPayOriginDate,
            newPayInterestDate: values.newPayInterestDate,
            note: values.note,
        };
        new postContractRepaymentUseCase(new ContractRepository(), body)
            .execute()
            .then((res) => {
                if (res?.status === 200 && res?.data?.success) {
                    navigation.replace('RequestSuccess', {});
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `${res?.data?.message}`, 'requestLoanFaild',
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
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.textHeader}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('infoChangeTheRepayment')}
                    </TextPrimary>
                </View>
                <CommonCard
                    disabled
                    customStyleHeaderCardContainer={styles.borderTop}
                    headerTitleTopHalf={itemTitleHeader}
                    headerTitleBottomHalf={code}
                    checkMode={CheckModeHeader?.TwoActive}
                />
                <View style={styles.colorBackground} />
                <View style={styles.formInfoLoan}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString(
                            'requestChangeTheRepayment2',
                        )}
                    </TextPrimary>
                    <Formik
                        initialValues={{
                            newPayOriginDate: '',
                            newPayInterestDate: '',
                            note: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        onSubmit={OnSubmit}
                    >
                        {({ values, handleSubmit, setFieldValue }) => {
                            return (
                                <>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.formInput}>
                                            <Field
                                                name="newPayOriginDate"
                                                label={getString('newPrincipalPaymentDate')}
                                                placeholder={getString('selectDay')}
                                                isRequire
                                                minimumDate={new Date()}
                                                component={InputDatePicker}
                                                onPress={(date: Date) => {
                                                    setFieldValue(
                                                        'newPayOriginDate',
                                                        dayjs(date).format(
                                                            DateTimeFormat.APIFormat,
                                                        ),
                                                    );
                                                }}
                                                value={
                                                    dayjs(values.newPayOriginDate).isValid()
                                                        ? TimeUtils.formatForwardSlashDate(
                                                            dayjs(values.newPayOriginDate),
                                                        )
                                                        : values.newPayOriginDate
                                                }
                                                style={{
                                                    flex: 1,
                                                    marginRight: Dimensions.moderateScale(35),
                                                }}
                                            />

                                            <Field
                                                name="newPayInterestDate"
                                                label={getString('newInterestPaymentDate')}
                                                placeholder={getString('selectDay')}
                                                isRequire
                                                minimumDate={new Date()}
                                                component={InputDatePicker}
                                                onPress={(date: Date) => {
                                                    setFieldValue(
                                                        'newPayInterestDate',
                                                        dayjs(date).format(
                                                            DateTimeFormat.APIFormat,
                                                        ),
                                                    );
                                                }}
                                                value={
                                                    dayjs(values.newPayInterestDate).isValid()
                                                        ? TimeUtils.formatForwardSlashDate(
                                                            dayjs(values.newPayInterestDate),
                                                        )
                                                        : values.newPayInterestDate
                                                }
                                                style={{ flex: 1 }}
                                            />
                                        </View>
                                        <View style={styles.formNote}>
                                            <TextPrimary style={styles.styleText}>
                                                {getString('note')}
                                            </TextPrimary>
                                            <View style={styles.textInput}>
                                                <Field
                                                    name="note"
                                                    component={TextInput}
                                                    placeholder={getString(
                                                        'importContent',
                                                    )}
                                                    onChangeText={(values: any) => {
                                                        setFieldValue(
                                                            'note', values
                                                        )
                                                    }}
                                                    multiline={true}
                                                    numberOfLines={4}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <AppButton
                                        type={ButtonType.CircleBorderRed}
                                        name={getString('request')}
                                        styleBtn={{ marginBottom: Dimensions.bottomPadding }}
                                        onPress={handleSubmit}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RequestChangePaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    textHeader: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.Spacing.large,
    },
    formInfoLoan: {
        flex: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.large,
    },
    textInfoLoan: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
    styleText: {
        fontSize: Dimensions.moderateScale(15),
    },
    formNote: {
        paddingTop: Dimensions.moderateScale(47),
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale,
        paddingVertical: Dimensions.moderateScale(12),
        paddingHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(4),
        marginTop: Dimensions.moderateScale(8),
        height: Dimensions.moderateScale(200),
        marginBottom: Dimensions.Spacing.large,
    },
    formInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(8),
        paddingTop: Dimensions.moderateScale(20),
    },
    colorBackground: {
        height: 8,
        backgroundColor: Colors.neutral.grayScale,
    },
    borderTop: {
        borderTopColor: theme.color.borderColor,
        borderTopWidth: 1,
        paddingTop: Dimensions.moderateScale(16),
        borderBottomWidth: 0,
    },
});
