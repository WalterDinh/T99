import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useRef } from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import {
    Field,
    Formik,
} from 'formik';
import { TextPrimary } from 'app/presentation/components';
import { ProductsType } from 'app/shared/constants';
import EstimatedLoan from './EstimatedLoan';
import LoanFeeModel from 'app/models/loan/LoanFee';

export const dataUnit = [
    { key: '1', label: 'Tháng' },
    { key: '2', label: 'Ngày' },
];

interface IProps {
    type: ProductsType;
    initValues: object;
    onSubmit: (values: object) => void;
    note?: string | React.ReactElement<View>;
    noteStyle?: StyleProp<ViewStyle>;
    isPromoCode?: boolean;
    children?: React.ReactElement<View>;
    validationSchema?: object;
    loanFeeData?: LoanFeeModel | null;
    resetLoanFeeData?: () => void;
    dataPeridod?: any;
}

const LoanInformation = (props: IProps) => {
    const {
        type,
        onSubmit,
        initValues,
        note,
        noteStyle,
        isPromoCode,
        loanFeeData,
        validationSchema,
        resetLoanFeeData,
        dataPeridod,
    } = props;

    const ref = useRef<any>(null);
    const handleSubmit = (values: object) => {
        onSubmit({ ...values, dirty: ref.current?.dirty });
    };

    React.useEffect(() => {
        if (!!loanFeeData) {
            resetLoanFeeData && resetLoanFeeData();
        }
    }, []);

    return (
        <Formik
            innerRef={ref}
            initialValues={
                !!initValues
                    ? { ...initValues }
                    : {
                        loan: '',
                        unit: '',
                        period: '',
                        paymentMethod: '',
                        promoCode: '',
                    }
            }
            initialTouched={{
                loan: true,
                promoCode: true,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => {
                if (
                    !!loanFeeData &&
                    (loanFeeData?.unit != values?.unit?.key ||
                        loanFeeData?.loan != values?.loan ||
                        loanFeeData?.period != values?.period?.key)
                ) {
                    resetLoanFeeData && resetLoanFeeData();
                }
                return (
                    <>
                        <View style={{ flex: 1 }}>
                            <TextPrimary style={styles.title}>
                                {getString('loanInformation')}
                            </TextPrimary>
                            <Field
                                name="loan"
                                label={
                                    type != ProductsType.Golfer
                                        ? getString('loan')
                                        : getString('registrationLimit')
                                }
                                isRequire
                                placeholder={getString('enterMoneyPlaceholder')}
                                component={InputForm}
                                iconRight={
                                    <TextPrimary style={styles.iconRightField}>
                                        {getString('vnd')}
                                    </TextPrimary>
                                }
                                keyboardType="numeric"
                                currency
                                inputContainerStyle={{ paddingBottom: 0 }}
                            />
                            {!!note && typeof note === 'string' ? (
                                <View style={noteStyle}>
                                    <TextPrimary>{note}</TextPrimary>
                                </View>
                            ) : (
                                <View style={noteStyle}>{note}</View>
                            )}

                            <View style={styles.viewDropdown}>
                                <Field
                                    name="unit"
                                    label={getString('unit')}
                                    isRequire
                                    placeholder={getString('monthPlaceholder')}
                                    component={DropdownInput}
                                    style={styles.itemDropdown}
                                    data={dataUnit}
                                    disabled
                                />
                                <View style={{
                                    paddingHorizontal:
                                        Dimensions.Spacing.large,
                                    justifyContent: 'center',
                                }}>
                                    <TextPrimary style={styles.dash}>-</TextPrimary>
                                </View>
                                <Field
                                    name="period"
                                    label={getString('period')}
                                    isRequire
                                    placeholder={'12'}
                                    component={DropdownInput}
                                    data={dataPeridod}
                                    style={styles.itemDropdown}
                                />
                            </View>
                            {type !== ProductsType.Golfer && (
                                <Field
                                    name="paymentMethod"
                                    label={getString('paymentMethod')}
                                    isRequire
                                    placeholder={getString('paymentMethod')}
                                    component={InputForm}
                                    disabled
                                />
                            )}
                            {isPromoCode && (
                                <Field
                                    name="promoCode"
                                    label={getString('promoCode')}
                                    placeholder={getString('enterPromoCode')}
                                    component={InputForm}
                                    inputContainerStyle={{ paddingBottom: 0 }}
                                />
                            )}
                            {/* {children} */}
                            {!!loanFeeData && (
                                <>
                                    <View style={styles.line} />
                                    <EstimatedLoan
                                        loan={values.loan || 0}
                                        type={ProductsType.Invest}
                                        totalInterestPayable={
                                            loanFeeData.sumInterest
                                        }
                                        otherFees={loanFeeData.otherFee}
                                        insuranceFees={loanFeeData.insuranceFee}
                                        periodicalPaymentAmount={
                                            loanFeeData.periodMoneyAmount
                                        }
                                        totalAmountToBePaid={
                                            loanFeeData.totalAmountMoney
                                        }
                                    />
                                </>
                            )}
                        </View>
                        <View style={styles.btnStyle}>
                            <AppButton
                                onPress={handleSubmit}
                                name={getString('continue')}
                            />
                        </View>
                    </>
                );
            }}
        </Formik>
    );
};

export default LoanInformation;

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
        paddingVertical: Dimensions.Spacing.small,
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
        flexDirection: 'row',
        // alignItems: 'center',
    },
    itemDropdown: {
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
    },
    dash: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
    line: {
        backgroundColor: theme.color.backgroundColorSecondary,
        height: 8,
        width: '100%',
        marginBottom: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.small,
    },

});
