import { StackNavigationProp } from '@react-navigation/stack';
import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { T99golfParamList } from 'app/presentation/navigation/routes/routeParams';
import { Dimensions, theme } from 'app/presentation/theme';
import { HOTLINE, InvestStep } from 'app/shared/constants';
import { LinkingHelper } from 'app/shared/helper';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ContentItem from '../../Components/ContentItem';

const dataCard = [
    {
        title: getString('profileCode'),
        value: 'HD0000012312312',
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderTopWidth: 1,
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    },
    {
        title: getString('registrationAmount'),
        value: '900000000',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
    },
    {
        title: getString('innitiatedDate'),
        value: '29/06/2022',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        styleTextInput: {
            fontFamily: theme.font.Regular,
            borderBottomWidth: 1,
            borderColor: theme.color.borderColor,
        },
    },
];

const dataLoan = {
    assetType: '',
    assetGroup: '',
    brand: '123',
    loan: '900000000',
    period: '12 Tháng',
    insuranceFees: '5000000',
    otherFees: '5000000',
    totalInterestPayable: '123',
    totalAmountToBePaid: '123',
    province: '123',
    transactionOffice: '123',
    dayTransaction: '123',
    fullName: 'Nguyễn Thị Ánh',
    documentType: 'Căn cước công dân',
    documentNumber: '123123123123',
    phoneNumber: '091231245251',
    email: 'maia@gmail.com',
    address: 'Cầu Giấy, Hà Nội',
};
interface IProps {
    navigation: StackNavigationProp<T99golfParamList, 'T99GolferStep5'>;
}

const index = (props: IProps) => {
    const { navigation } = props;

    const handleSubmit = () => {
        navigation.replace('T99doneProduct', {
            id: 'HD0000012312312',
            title: getString('successfulLoanRegistration'),
            titleContent: (
                <TextPrimary style={styles.titleContent}>
                    {getString('yourLoanApplicationIsBeingReceived')}{' '}
                    <TextPrimary
                        onPress={() => {
                            LinkingHelper.phoneCall(HOTLINE);
                        }}
                        style={styles.hotlineStyle}
                    >
                        {getString('hotline')}
                    </TextPrimary>{' '}
                    {getString('forAdviceAndSupport')}
                </TextPrimary>
            ),
            dataCard: dataCard,
        });
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TextPrimary style={styles.titleHeader}>
                    {getString('confirmInformation')}
                </TextPrimary>
            </View>
            <ContentItem
                type={InvestStep.PersonalInformation}
                onPress={() => {
                    navigation.navigate('T99GolferStep3');
                }}
                data={dataLoan}
            />
            <ContentItem
                type={InvestStep.LoanInformationGolfer}
                onPress={() => {
                    navigation.navigate('T99GolferStep2');
                }}
                data={dataLoan}
            />
            <View style={styles.btnArea}>
                <AppButton
                    onPress={handleSubmit}
                    styleBtn={styles.btnStyle}
                    name={getString('continue')}
                />
            </View>
        </ScrollView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    header: {
        alignItems: 'center',
        paddingVertical: Dimensions.Spacing.large,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    titleHeader: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        color: theme.color.textColor,
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
    btnArea: {
        paddingTop: Dimensions.Spacing.extraHuge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },

    titleContent: {
        marginTop: Dimensions.Spacing.large,
        fontFamily: theme.font.Regular,
        color: theme.color.labelColor,
        fontSize: Dimensions.FontSize.extraLarge,
        textAlign: 'center',
    },
    hotlineStyle: {
        color: theme.color.textColorSecondaryVariant,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.extraLarge,
    },
});
