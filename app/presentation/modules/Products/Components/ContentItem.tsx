import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { InvestStep } from 'app/shared/constants';

const dataPersonalInformation = (data: {
    fullName: string;
    documentType: string;
    documentNumber: string;
    phoneNumber: string;
    email: string;
    address: string;
}) => [
    {
        title: getString('fullname'),
        value: data?.fullName,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('documentType'),
        value: data?.documentType,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('cmndcccdNumber'),
        value: data?.documentNumber,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('phoneNumber'),
        value: data?.phoneNumber,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('email'),
        value: data?.email,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('address'),
        value: data?.address,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderBottomWidth: 1,
            borderColor: theme.color.borderColor,
        },
    },
];

const dataPropertyInformation = (data: {
    assetType: string;
    assetGroup: string;
    brand: string;
}) => [
    {
        title: getString('propertyType'),
        value: data?.assetType,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('assetGroup'),
        value: data?.assetGroup,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('brand'),
        value: data?.brand,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderBottomWidth: 1,
            borderColor: theme.color.borderColor,
        },
    },
];

const dataLoanInformationGolfer = (data: {
    loan: string;
    period: string;
    insuranceFees: string;
    otherFees: string;
}) => [
    {
        title: getString('registrationLimit'),
        value: data?.loan,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('period'),
        value: `${data?.period || ''}`,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('insuranceFees'),
        value: data?.insuranceFees,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('otherFees'),
        value: data?.otherFees,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('salesStaffCode'),
        value: 'HCM123123 - Trần Văn Minh',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderBottomWidth: 1,
            borderColor: theme.color.borderColor,
        },
    },
];

const dataLoanInformation = (data: {
    loan: string;
    period: string;
    insuranceFees: string;
    otherFees: string;
    totalInterestPayable: string;
    totalAmountToBePaid: string;
}) => [
    {
        title: getString('loan'),
        value: data?.loan,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('period'),
        value: `${data?.period || ''}`,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('totalInterestPayable'),
        value: data?.totalInterestPayable,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('insuranceFees'),
        value: data?.insuranceFees,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('otherFees'),
        value: data?.otherFees,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('totalAmountToBePaid'),
        value: data?.totalAmountToBePaid,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderBottomWidth: 1,
            borderColor: theme.color.borderColor,
        },
        currency: true,
    },
];

const dataTransactionOfficeInvest = (data: {
    province: string;
    transactionOffice: string;
    dayTransaction: string;
}) => [
    {
        title: getString('province'),
        value: data?.province,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('transactionOffice'),
        value: data?.transactionOffice,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('dayTransaction'),
        value: data?.dayTransaction,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        // date: true,
    },
];

const dataTransactionOffice = (data: {
    province: string;
    transactionOffice: string;
    dayTransaction: string;
}) => [
    {
        title: getString('province'),
        value: data?.province,
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('transactionOffice'),
        value: data?.transactionOffice,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('dayTransaction'),
        value: data?.dayTransaction,
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        // date: true,
    },
    // {
    //     title: getString('salesStaffCode'),
    //     value: 'HCM123123 - Trần Văn Minh',
    //     styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    //     styleTextInput: {
    //         fontFamily: theme.font.Regular,
    //         borderBottomWidth: 1,
    //         borderColor: theme.color.borderColor,
    //     },
    // },
];

interface IProps {
    type: InvestStep;
    data: {
        assetType: string;
        assetGroup: string;
        brand: string;
        loan: string;
        period: string;
        insuranceFees: string;
        otherFees: string;
        totalInterestPayable: string;
        totalAmountToBePaid: string;
        province: string;
        transactionOffice: string;
        dayTransaction: string;
        fullName: string;
        documentType: string;
        documentNumber: string;
        phoneNumber: string;
        email: string;
        address: string;
    };
    onPress: () => void;
}
const ContentItem = (props: IProps) => {
    const { type, data, onPress } = props;

    let sub = getString('personalInformation');
    let dataCard = dataPersonalInformation(data);
    const checkType = ((type: string) => {
        switch (type) {
            case InvestStep.PersonalInformation:
                sub = getString('personalInformation');
                dataCard = dataPersonalInformation(data);
                break;
            case InvestStep.PropertyInformation:
                sub = getString('propertyInformation');
                dataCard = dataPropertyInformation(data);
                break;
            case InvestStep.LoanInformation:
                sub = getString('loanInformation');
                dataCard = dataLoanInformation(data);
                break;
            case InvestStep.TransactionOffice:
                sub = getString('transactionOffice');
                dataCard = dataTransactionOffice(data);
                break;
            case InvestStep.TransactionOfficeInvest:
                sub = getString('transactionOffice');
                dataCard = dataTransactionOfficeInvest(data);
                break;
            case InvestStep.LoanInformationGolfer:
                sub = getString('loanInformation');
                dataCard = dataLoanInformationGolfer(data);
                break;
            default:
                break;
        }
    })(type);
    return (
        <View>
            <View style={styles.space}></View>
            <View style={styles.sub}>
                <TextPrimary style={styles.subTitle}>{sub}</TextPrimary>
                <TouchableOpacity onPress={onPress}>
                    <TextPrimary style={styles.textBtnSub}>
                        {getString('change')}
                    </TextPrimary>
                </TouchableOpacity>
            </View>
            <CommonCard
                disabled
                styleCommonCard={styles.commonCard}
                dataCard={dataCard}
            />
        </View>
    );
};

export default ContentItem;

const styles = StyleSheet.create({
    space: {
        height: 8,
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
    },
    sub: {
        flexDirection: 'row',
        backgroundColor: theme.color.backgroundColorVariant,
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.Spacing.large,
        alignItems: 'center',
    },
    subTitle: {
        fontSize: Dimensions.FontSize.small,
        fontFamily: theme.font.Medium,
        textTransform: 'uppercase',
    },
    textBtnSub: {
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Regular,
        color: theme.color.colorPrimary,
    },

    commonCard: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: Dimensions.moderateScale(22),
        paddingLeft: Dimensions.moderateScale(22),
        backgroundColor: theme.color.backgroundColorVariant,
        borderRadius: 0,
    },
});
