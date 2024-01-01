import { StackNavigationProp } from '@react-navigation/stack';
import ContractRepository from 'app/data/repository/contract';
import { postContractInterestDurationUseCase } from 'app/domain/customer/contract/PostContractInterestDucationUseCase';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { getString } from 'app/presentation/localization';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React from 'react';
import {
    StyleSheet,
    TextInput, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import FormInput from './FormInput';

interface IProps {
    navigation: StackNavigationProp<
        ContractParamList,
        'RequestFeeWaiver'
    >;
    route: any;
}

const RequestFeeWaiverScreen = (props: IProps) => {
    const { navigation, route } = props
    const { itemId, code, itemTitleHeader, loanAmount } = route.params;

    const OnSubmit = (item: any) => {
        LoadingManager.setLoading(true);
        const body = {
            contractId: itemId,
            newInterestRate: item.newInterestRate,
            assetManagementFeeAmount: item.newQLTSFee,
            assetVerificationFeeAmount: item.newTDTSFee,
            insuranceFeeAmount: item.newPremium,
            paymentAmount: loanAmount,
            note: item.note,
        };
        new postContractInterestDurationUseCase(new ContractRepository(), body)
            .execute()
            .then((res) => {
                if (res?.status === 200 && res?.data?.success) {
                    navigation.replace('RequestSuccess');
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `${res?.data?.message}` || 'requestLoanFaild',
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={ styles.textHeader}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('infoFeeWaiver')}
                    </TextPrimary>
                </View>
                <View style={styles.colorBackgroundLine} />
                <CommonCard
                    disabled
                    customStyleHeaderCardContainer={styles.borderNone}
                    headerTitleTopHalf={itemTitleHeader}
                    headerTitleBottomHalf={code}
                    checkMode={CheckModeHeader?.TwoActive}
                />
                <View style={styles.colorBackground} />
                <View style={styles.formInfoLoan}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('infoFeeWaiver2')}
                    </TextPrimary>
                    <Formik
                        initialValues={{
                            newInterestRate: 0,
                            newQLTSFee: 0,
                            newTDTSFee: 0,
                            newPremium: 0,
                            note: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        onSubmit={OnSubmit}
                    >
                        {({ handleSubmit, setFieldValue }) => {
                            return (
                                <>
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Field
                                                name="newInterestRate"
                                                isRequire
                                                component={FormInput}
                                                titleLeft={getString(
                                                    'newInterestRate',
                                                )}
                                                keyboardType='numeric'
                                                iconRight={
                                                    <TextPrimary style={styles.iconRightField}>
                                                        %
                                                    </TextPrimary>
                                                }
                                                onChangeText={(values: any) => { setFieldValue('newInterestRate', values) }}
                                            />

                                            <Field
                                                name="newQLTSFee"
                                                isRequire
                                                component={FormInput}
                                                titleLeft={getString(
                                                    'newQLTSFee',
                                                )}
                                                keyboardType='numeric'
                                                iconRight={
                                                    <TextPrimary style={styles.iconRightField}>
                                                        %
                                                    </TextPrimary>
                                                }
                                                onChangeText={(values: any) => { setFieldValue('newQLTSFee', values) }}

                                            />
                                            <Field
                                                name="newTDTSFee"
                                                isRequire
                                                component={FormInput}
                                                titleLeft={getString(
                                                    'newTDTSFee',
                                                )}
                                                keyboardType='numeric'
                                                iconRight={
                                                    <TextPrimary style={styles.iconRightField}>
                                                        %
                                                    </TextPrimary>
                                                }
                                                onChangeText={(values: any) => { setFieldValue('newTDTSFee', values) }}

                                            />
                                            <Field
                                                name="newPremium"
                                                isRequire
                                                component={FormInput}
                                                titleLeft={getString(
                                                    'newPremium',
                                                )}
                                                keyboardType='numeric'
                                                iconRight={
                                                    <TextPrimary style={styles.iconRightField}>
                                                        %
                                                    </TextPrimary>
                                                }
                                                onChangeText={(values: any) => { setFieldValue('newPremium', values) }}

                                            />
                                        </View>
                                        <View style={styles.formNote}>
                                            <TextPrimary
                                                style={styles.styleText}
                                            >
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

export default RequestFeeWaiverScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
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
        fontSize: Dimensions.Spacing.medium,
        fontFamily: theme.font.Medium,
    },
    styleText: {
        fontSize: Dimensions.FontSize.large,
    },
    formNote: {
        paddingTop: Dimensions.moderateScale(47),
        paddingBottom: Dimensions.Spacing.large,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale,
        paddingVertical: Dimensions.Spacing.medium,
        paddingHorizontal: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.tiny,
        marginTop: Dimensions.Spacing.small,
        height: Dimensions.moderateScale(200),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorBackground: {
        height: 8,
        backgroundColor: Colors.neutral.grayScale,
    },
    colorBackgroundLine: {
        height: 1,
        backgroundColor: Colors.neutral.grayScale,
        marginHorizontal: Dimensions.Spacing.medium,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.Spacing.large,
    },
    borderNone: {
        borderBottomWidth: 0,
    },
});
