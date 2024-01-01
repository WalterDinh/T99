import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { Dimensions, theme } from 'app/presentation/theme';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import { Field, Formik } from 'formik';
import { TextPrimary } from 'app/presentation/components';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import Images from 'app/assets/images'

interface IProps {
    initValues: object,
    onSubmit: (values: object) => void,
    note?: string | React.ReactElement<View>,
    noteStyle?: StyleProp<ViewStyle>,
    isPromoCode?: boolean,
    children?: React.ReactElement<View>,
    validationSchema?: object,
}

const DisbursementRequest = (props: IProps) => {
    const { onSubmit, initValues, note, noteStyle, isPromoCode, children, validationSchema } = props;
    return (
        <Formik
            initialValues={
                !!initValues ? { ...initValues } : {
                    amountToBeDisbursed: '',
                    disbursementDate: '',
                    disbursementPurpose: '',
                    methodPay: '',
                    promoCode: '',
                }
            }
            initialTouched={{
                amountToBeDisbursed: true,
                disbursementPurpose: true,
                promoCode: true,
            }}

            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, setFieldValue }) => {
                return (
                    <>
                        <View style={{flex: 1}}>
                            <TextPrimary style={[styles.title, { paddingBottom: 8 }]}>{getString('amountToBeDisbursed')}<TextPrimary style={{ color: 'red' }}> *</TextPrimary></TextPrimary>
                            <Field
                                name="amountToBeDisbursed"
                                isRequire
                                placeholder={getString('enterMoneyPlaceholder')}
                                component={InputForm}
                                iconRight={
                                    <TextPrimary style={styles.iconRightField}>{getString('vnd')}</TextPrimary>
                                }
                                keyboardType='numeric'
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <View style={{ backgroundColor: theme.color.backgroundColorSecondary, height: 8, width: '100%', marginBottom: Dimensions.Spacing.large, marginTop: Dimensions.Spacing.small }} />

                            <TextPrimary style={styles.title}>{getString('requestDisbursement')}</TextPrimary>
                            <Field
                                name="disbursementDate"
                                label={getString('disbursementDate')}
                                isRequire
                                placeholder={getString('disbursementDate')}
                                component={InputDatePicker}
                                onPress={(date: Date) => { setFieldValue('disbursementDate', date) }}
                                value={values.disbursementDate}
                                inputContainerStyle={{ paddingBottom: 0 }}
                            />

                            <Field
                                name="disbursementPurpose"
                                label={getString('disbursementPurpose')}
                                isRequire
                                placeholder={getString('cashConsumptionLoan')}
                                component={InputForm}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                setFieldValue={() => { setFieldValue('disbursementPurpose', getString('cashConsumptionLoan')) }}
                                value={values.disbursementPurpose}
                                disabled={true}
                            />
                            <Field
                                name="methodPay"
                                label={getString(
                                    'methodPay',
                                )}
                                isRequire
                                placeholder={getString(
                                    'methodPay',
                                )}
                                component={DropdownInput}
                                value={''}
                                style={{ flex: 1, paddingBottom: 0, paddingTop: 0 }}
                            />
                            <Field
                                name="promoCode"
                                label={getString(
                                    'promoCode',
                                )}
                                placeholder={getString('enterPromoCode')}
                                component={InputForm}
                                inputContainerStyle={{ paddingBottom: 0 }}
                            />
                            {children}
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <AppButton
                                styleBtn={styles.btnStyle}
                                name={getString('disbursementNow')}
                                iconRight={Images.Icons.RightIconWhite}
                                iconStyle={styles.iconStyle}
                                onPress={handleSubmit} />
                        </View>
                    </>
                );
            }}
        </Formik >
    )
}

export default DisbursementRequest

const styles = StyleSheet.create({
    process: {
        marginTop: -8,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    title: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        // paddingVertical: Dimensions.Spacing.small,
        textTransform: 'uppercase',
    },
    titleGender: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingTop: Dimensions.Spacing.small,
    },
    viewDropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
})