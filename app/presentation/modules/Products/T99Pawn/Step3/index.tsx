import LoanRepository from 'app/data/repository/loan';
import { GetLoanFeeUseCase } from 'app/domain/customer/loan/GetLoanFeeUseCase';
import LoanFeeModel from 'app/models/loan/LoanFee';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { T99PawnContext } from 'app/presentation/navigation/routes/app/T99PawnStack';
import { Dimensions, theme } from 'app/presentation/theme';
import { ProductsType, StatusToast } from 'app/shared/constants';
import CurrencyHelper from 'app/shared/helper/CurrencyHelper';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import LoanInformation, { dataUnit } from '../../Components/LoanInformation';

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { dataAssetInfo, setLoanFee } = useContext(T99PawnContext);
    const [loanFeeData, setLoanFeeData] = useState<LoanFeeModel | null>(null);
    const indexLabel = dataAssetInfo.assetName?.productName.indexOf('Lãi');
    const paymentMethodLabel =
        dataAssetInfo.assetName?.productName.slice(indexLabel);
    const paymentWays = dataAssetInfo.assetName.paymentWays;

    const [initialValues, setInitialValues] = useState({
        loan: '',
        unit: paymentWays == 1 ? dataUnit[0] : dataUnit[1],
        period: '',
        paymentMethod: paymentMethodLabel,
        promoCode: '',
    });

    useLayoutEffect(() => {
        setLoanFeeData(null);
        setInitialValues({
            loan: '',
            unit: paymentWays == 1 ? dataUnit[0] : dataUnit[1],
            period: '',
            paymentMethod: paymentMethodLabel,
            promoCode: '',
        });
    }, [dataAssetInfo]);
    const dataPeridod = (dataAssetInfo.assetName?.dataPeridod || []).map(
        (item) => {
            return {
                key: item,
                label: item,
            };
        },
    );
    const minLendingMoneyParse = CurrencyHelper.getFormattedPriceVnd(
        Number(dataAssetInfo.assetName?.minLendingMoney || 0),
    );

    const maxLendingMoneyParse = CurrencyHelper.getFormattedPriceVnd(
        Number(dataAssetInfo.assetName?.maxLendingMoney || 0),
    );

    //! Validation Schema
    const ValidationSchema = Yup.object().shape({
        loan: Yup.number()
            .required(getString('thisFieldRequired'))
            .min(
                dataAssetInfo.assetName?.minLendingMoney,
                getString('minLendingMoney', {
                    minLendingMoney: minLendingMoneyParse,
                }),
            )
            .max(
                dataAssetInfo.assetName?.maxLendingMoney,
                getString('maxLendingMoney', {
                    maxLendingMoney: maxLendingMoneyParse,
                }),
            ),
        unit: Yup.object().required(getString('thisFieldRequired')),
        period: Yup.object().required(getString('thisFieldRequired')),
        // paymentMethod: Yup.string()
        //   .required(getString('thisFieldRequired')),
    });

    const onSubmit = (values: any) => {
        if (!!loanFeeData) {
            setLoanFee({
                discountCode: values.promoCode,
                insuranceFee: loanFeeData.insuranceFee,
                loan: values.loan,
                otherFee: loanFeeData.otherFee,
                periodMoneyAmount: loanFeeData.periodMoneyAmount,
                sumInterest: loanFeeData.sumInterest,
                totalAmountMoney: loanFeeData.totalAmountMoney,
                period: values?.unit?.label,
                loanTime: values?.period?.key,
            });
            changeCurrentIndexTab(3);
            return;
        }
        LoadingManager.setLoading(true);
        new GetLoanFeeUseCase(new LoanRepository(), {
            ProductId: dataAssetInfo.assetName.id,
            LoanAmount: values?.loan,
            DayLoan: values?.unit?.key == '2' ? values?.period?.key : '0',
            LoanTime: values?.unit?.key == '1' ? values?.period?.key : '0',
            PaymentWay: values?.unit?.key,
        })
            .execute()
            .then((res) => {
                setLoanFeeData({
                    ...res,
                    loan: values?.loan,
                    unit: values?.unit?.key,
                    period: values?.period?.key,
                });
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
    };
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.content}>
                <LoanInformation
                    onSubmit={onSubmit}
                    resetLoanFeeData={() => setLoanFeeData(null)}
                    note={
                        <TextPrimary style={styles.textNote}>
                            {getString('notice')}
                            {getString('loanAmountMustBeAtLeastFrom')}
                            <TextPrimary
                                style={[styles.textNote, styles.textNoteBold]}
                            >
                                {' '}
                                {minLendingMoneyParse}{' '}
                            </TextPrimary>
                            {getString('andMustNotExceed')}
                            <TextPrimary
                                style={[styles.textNote, styles.textNoteBold]}
                            >
                                {' '}
                                {maxLendingMoneyParse}{' '}
                            </TextPrimary>
                        </TextPrimary>
                    }
                    noteStyle={{ marginTop: -6 }}
                    initValues={initialValues}
                    loanFeeData={loanFeeData}
                    dataPeridod={dataPeridod}
                    type={ProductsType.Pawn}
                    // isPromoCode
                    validationSchema={ValidationSchema}
                    // children={
                    //   <>
                    //     <View style={styles.line} />
                    //     <EstimatedLoan type={ProductsType.Invest} />
                    //   </>
                    // }
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    content: {
        flex: 1,
        marginHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.small,
    },
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    textNote: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        paddingBottom: Dimensions.Spacing.small,
    },
    textNoteBold: {
        fontFamily: theme.font.Bold,
    },
    line: {
        backgroundColor: theme.color.backgroundColorSecondary,
        height: 8,
        width: '100%',
        marginBottom: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.small,
    },
});
