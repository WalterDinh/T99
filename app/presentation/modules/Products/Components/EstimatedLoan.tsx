import { StyleSheet, View } from 'react-native';
import React from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { Dimensions, theme } from 'app/presentation/theme';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { ProductsType } from 'app/shared/constants';

interface IProps {
    type: ProductsType;
    loan: number|string;
    totalInterestPayable: number|string;
    otherFees: number|string;
    insuranceFees: number|string;
    periodicalPaymentAmount: number|string;
    totalAmountToBePaid: number|string;
}

const EstimatedLoan = (props: IProps) => {
    const {
        type,
        loan,
        totalInterestPayable,
        otherFees,
        insuranceFees,
        periodicalPaymentAmount,
        totalAmountToBePaid,
    } = props;

    const dataCommonCardInvest = [
        {
            title: getString('loan'),
            value: loan,
            styleTextInput: {
                fontFamily: theme.font.Regular,
            },
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('totalInterestPayable'),
            value: totalInterestPayable,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        // {
        //     title: getString('interestRate'),
        //     value: '45%',
        //     styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        // },
        {
            title: getString('otherFees'),
            value: otherFees,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('insuranceFees'),
            value: insuranceFees,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('periodicalPaymentAmount'),
            value: periodicalPaymentAmount,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('totalAmountToBePaid'),
            value: totalAmountToBePaid,
            styleValue: {
                fontFamily: theme.font.Medium,
                fontSize: 15,
                color: theme.color.colorPrimary,
            },
            currency: true,
        },
    ];

    const dataCommonCardPawn = [
        {
            title: getString('loan'),
            value: loan,
            styleTextInput: {
                fontFamily: theme.font.Regular,
            },
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('totalInterestPayable'),
            value: totalInterestPayable,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('otherFees'),
            value: otherFees,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('insuranceFees'),
            value: insuranceFees,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('periodicalPaymentAmount'),
            value: periodicalPaymentAmount,
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('totalAmountToBePaid'),
            value: totalAmountToBePaid,
            styleValue: {
                fontFamily: theme.font.Medium,
                fontSize: 15,
                color: theme.color.colorPrimary,
            },
            currency: true,
        },
    ];
    const dataCommonCardGolfer = [
        {
            title: getString('loan'),
            value: '900000000',
            styleTextInput: {
                fontFamily: theme.font.Regular,
            },
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
        {
            title: getString('period'),
            value: '12 tháng',
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        },
        {
            title: getString('insuranceFees'),
            value: '5000000',
            styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
            currency: true,
        },
    ];

    const checkType = (type: ProductsType) => {
        switch (type) {
            case ProductsType.Invest:
                return dataCommonCardInvest.filter((elm)=>elm.value!=0);
            case ProductsType.Pawn:
                return dataCommonCardPawn.filter((elm)=>elm.value!=0);
            case ProductsType.Golfer:
                return dataCommonCardGolfer;
            default:
                return dataCommonCardInvest.filter((elm)=>elm.value!=0);
        }
    };

    return (
        <View>
            <TextPrimary style={styles.titleLoan}>
                {getString('estimatedLoan')}
            </TextPrimary>
            <CommonCard
                disabled
                styleCommonCard={styles.commonCard}
                dataCard={checkType(type)}
            />
        </View>
    );
};

export default EstimatedLoan;

const styles = StyleSheet.create({
    commonCard: {
        paddingTop: Dimensions.moderateScale(11),
        paddingBottom: Dimensions.moderateScale(11),
        paddingRight: Dimensions.moderateScale(12),
        paddingLeft: Dimensions.moderateScale(12),
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
        borderRadius: 8,
        marginBottom: Dimensions.Spacing.large,
    },
    titleLoan: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        marginBottom: Dimensions.Spacing.large,
        textTransform: 'uppercase',
    },
});
