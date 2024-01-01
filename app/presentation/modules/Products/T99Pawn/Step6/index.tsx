import { StackNavigationProp } from '@react-navigation/stack';
import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { T99PawnContext } from 'app/presentation/navigation/routes/app/T99PawnStack';
import { Dimensions, theme } from 'app/presentation/theme';
import {
    AssetType,
    DateTimeFormat,
    DisbursementMethod,
    HOTLINE,
    InvestStep,
    StatusToast,
} from 'app/shared/constants';
import React, { useContext } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import ContentItem from '../../Components/ContentItem';
import dayjs from 'dayjs';
import { CreateLoanUseCase } from 'app/domain/customer/loan/CreateLoanUseCase';
import LoanRepository from 'app/data/repository/loan';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { T99pawnParamList } from 'app/presentation/navigation/routes/routeParams';
import Toast from 'react-native-toast-message';
import { getLoanContractOnlineRequest } from 'app/presentation/redux/actions/loan';
import { useDispatch } from 'react-redux';
import { LinkingHelper } from 'app/shared/helper';

interface IProps {
    navigation: StackNavigationProp<T99pawnParamList, 'T99Pawn'>;
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { navigation, changeCurrentIndexTab } = props;
    const {
        dataAssetInfo,
        dataLoanFee,
        dataUser,
        dataAssetInfoPictures,
        additionalInformation,
    } = useContext(T99PawnContext);
    const dispatch = useDispatch();
    const indexLabel = dataAssetInfo.assetName?.productName.indexOf(' - ');

    const data = {
        assetType: getString(
            dataAssetInfo?.propertyType === 1
                ? 'fixedAssets'
                : 'registrationPapers',
        ),
        assetGroup: dataAssetInfo?.assetGroup?.label,
        brand: dataAssetInfo.assetName?.productName.slice(0, indexLabel),
        loan: dataLoanFee?.loan,
        period: `${dataLoanFee?.loanTime} ${dataLoanFee.period}`,
        insuranceFees: dataLoanFee?.insuranceFee,
        otherFees: dataLoanFee?.otherFee,
        totalInterestPayable: dataLoanFee?.sumInterest,
        totalAmountToBePaid: dataLoanFee?.totalAmountMoney,
        province: additionalInformation?.province?.label,
        transactionOffice: additionalInformation?.transactionOffice?.label,
        dayTransaction: dayjs(additionalInformation?.dayTransaction).isValid()
            ? dayjs(additionalInformation?.dayTransaction)?.format(
                  DateTimeFormat?.FullDateForwardSlash,
              )
            : '',
        fullName: dataUser?.fullName,
        documentType: dataUser.documentType.label,
        documentNumber: dataUser?.documentCode,
        phoneNumber: dataUser?.phoneNumber,
        email: dataUser?.email,
        address: `${dataUser?.district?.label},${dataUser?.province?.label}`,
    };
    const handleSubmit = () => {
        LoadingManager.setLoading(true);
        const body = {
            GroupAssetType: AssetType.Pledge,
            AssetGroupId: dataAssetInfo.assetGroup.key,
            AssetDistrictId: dataAssetInfoPictures.assetDistrictId || '',
            AssetProvinceId: dataAssetInfoPictures.assetProvinceId || '',
            DiscountCode: dataLoanFee.discountCode,
            GroupDataMasterIds: dataAssetInfoPictures.groupDataMasterIds,
            Files: dataAssetInfoPictures.files,
            LendingProductId: dataAssetInfo.assetName.id,
            PaymentWay: dataAssetInfo.assetName.paymentWays,
            LoanAmount: dataLoanFee.loan,
            LoanTime: dataLoanFee.loanTime,
            LoanPeriod: dataLoanFee.period.toLocaleLowerCase(),
            DisbursementWay: DisbursementMethod.Cash,
            Name: dataUser.fullName,
            Email: dataUser.email,
            BirthOfDay: dataUser.dateOfBirth,
            Gender: dataUser.gender,
            ApartmentNumberRegistration: dataUser.detailedAddress,
            WardsRegistrationId: dataUser.ward.key,
            DistrictRegistrationId: dataUser.district.key,
            ProvinceRegistrationId: dataUser.province.key,
            NumberIdentityDoc: dataUser.documentCode,
            TypeIdentityDoc: dataUser.documentType.code,
            NumberPhone: dataUser.phoneNumber,
            TransactionOfficeId: additionalInformation?.transactionOffice?.key,
            DisbursementAmount: dataLoanFee?.totalAmountMoney,
        };
        new CreateLoanUseCase(new LoanRepository(), body)
            .execute()
            .then((res) => {
                if (res.data?.success && res.data?.httpStatusCode == 200) {
                    const dataCard = [
                        {
                            title: getString('profileCode'),
                            value: res.data.data?.applicationCode || '',
                            styleTextInput: {
                                fontFamily: theme.font.Regular,
                                borderTopWidth: 1,
                            },
                            styleValue: {
                                fontFamily: theme.font.Regular,
                                fontSize: 15,
                            },
                        },
                        {
                            title: getString('pledgedProperty'),
                            value: dataAssetInfo?.assetGroup?.label,
                            styleValue: {
                                fontFamily: theme.font.Regular,
                                fontSize: 15,
                            },
                        },
                        {
                            title: getString('innitiatedDate'),
                            value: dayjs().format(
                                DateTimeFormat.FullDateForwardSlash,
                            ),
                            styleValue: {
                                fontFamily: theme.font.Regular,
                                fontSize: 15,
                            },
                            styleTextInput: {
                                fontFamily: theme.font.Regular,
                                borderBottomWidth: 1,
                                borderColor: theme.color.borderColor,
                            },
                        },
                    ];
                    dispatch(getLoanContractOnlineRequest());
                    navigation.replace('T99doneProduct', {
                        id: res.data.data?.applicationCode || '',
                        title: getString('successfulLoanRegistration'),
                        titleContent: (
                            <TextPrimary style={styles.titleContent}>
                                {getString(
                                    'yourLoanApplicationIsBeingReceived',
                                )}{' '}
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
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: res?.data?.message?.includes('MSG')
                            ? getString([
                                  `errors.${res?.data?.message}`,
                                  'errorMessageCommon',
                              ])
                            : res?.data?.message,
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: err?.data?.message?.includes('MSG')
                        ? getString([
                              `errors.${err?.data?.message}`,
                              'errorMessageCommon',
                          ])
                        : err?.data?.message,
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
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
                data={data}
                type={InvestStep.PersonalInformation}
                onPress={() => {
                    changeCurrentIndexTab(3);
                }}
            />
            <ContentItem
                data={data}
                type={InvestStep.PropertyInformation}
                onPress={() => {
                    changeCurrentIndexTab(0);
                }}
            />
            <ContentItem
                data={data}
                type={InvestStep.LoanInformation}
                onPress={() => {
                    changeCurrentIndexTab(2);
                }}
            />
            <ContentItem
                data={data}
                type={InvestStep.TransactionOfficeInvest}
                onPress={() => {
                    changeCurrentIndexTab(4);
                }}
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
