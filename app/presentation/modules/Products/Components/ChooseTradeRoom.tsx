import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import InputForm from 'app/presentation/components/input/InputForm';
import { Field, Formik } from 'formik';
import { TextPrimary } from 'app/presentation/components';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import Alert from '../../../components/alert/Alert';
import SelectTransactionOffices from 'app/presentation/components/selectTransactionOffices';
import dayjs from 'dayjs';
import { DateTimeFormat } from 'app/shared/constants';

interface IProps {
    initValues: {
        province: string;
        transactionOffice: string;
        dayTransaction: string;
    };
    onSubmit: (values: {
        province: string;
        transactionOffice: string;
        dayTransaction: string;
    }) => void;
    validationSchema?: object;
}

const ChooseTradeRoom = (props: IProps) => {
    const { onSubmit, initValues, validationSchema } = props;
    return (
        <Formik
            initialValues={
                !!initValues
                    ? { ...initValues }
                    : {
                          province: '',
                          transactionOffice: '',
                          dayTransaction: '',
                      }
            }
            initialTouched={{
                salesStaffCode: true,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, setFieldValue, errors }) => {
                return (
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <TextPrimary style={styles.title}>
                                {getString('chooseTradeRoom')}
                            </TextPrimary>
                            <SelectTransactionOffices
                                branchesKey="province"
                                transactionOfficeKey="transactionOffice"
                            />
                            <Field
                                name="dayTransaction"
                                label={getString('dayTransaction')}
                                placeholder={getString('dayTransaction')}
                                component={InputDatePicker}
                                minimumDate={new Date()}
                                onPress={(date: Date) => {
                                    setFieldValue('dayTransaction', date);
                                }}
                                value={
                                    dayjs(values.dayTransaction).isValid()
                                        ? dayjs(values.dayTransaction).format(
                                              DateTimeFormat.FullDateForwardSlash,
                                          )
                                        : values.dayTransaction
                                }
                            />
                            {/* <Field
                                name="salesStaffCode"
                                label={getString('salesStaffCode')}
                                placeholder={getString('salesStaffCode')}
                                component={InputForm}
                            /> */}
                            <Alert
                                note={
                                    getString('mind') +
                                    ':' +
                                    getString('whenYouGetToTheTradingRoom') +
                                    ':'
                                }
                                notice={
                                    <>
                                        <TextPrimary style={[styles.notice]}>
                                            • {getString('cmtcccdpassport')}.
                                        </TextPrimary>
                                        <TextPrimary style={styles.notice}>
                                            • {getString('pledgedProperty')}.
                                        </TextPrimary>
                                        <TextPrimary style={styles.notice}>
                                            •{' '}
                                            {getString(
                                                'registrationPapersPropertyOwnership',
                                            )}
                                            .
                                        </TextPrimary>
                                    </>
                                }
                            />
                        </View>
                        <View style={styles.btnArea}>
                            <AppButton
                                onPress={handleSubmit}
                                styleBtn={styles.btnStyle}
                                name={getString('continue')}
                            />
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
};

export default ChooseTradeRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    process: {
        marginTop: -8,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    title: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        paddingVertical: Dimensions.Spacing.small,
        textTransform: 'uppercase',
    },
    titleGender: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingVertical: Dimensions.Spacing.small,
    },
    errorGender: {
        marginHorizontal: 5,
        width: '100%',
        color: theme.color.errorColor,
        backgroundColor: 'white',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
    },
    viewDropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Dimensions.Spacing.small,
    },
    btnArea: {
        paddingTop: Dimensions.Spacing.huge,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
    note: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        color: theme.color.warningColor,
        lineHeight: Dimensions.moderateScale(22),
        marginBottom: Dimensions.Spacing.tiny,
    },
    notice: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        color: theme.color.labelColor,
    },
});
