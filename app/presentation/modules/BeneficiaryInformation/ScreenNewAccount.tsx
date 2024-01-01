import { StackNavigationProp } from '@react-navigation/stack';
import AccountBankRepository from 'app/data/repository/accoutbank';
import { GetListBankUseCase } from 'app/domain/customer/accountbank/GetListBankUseCase';
import ListBankModel from 'app/models/AccountBank/ListBankModel';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import { FormSwitch } from 'app/presentation/components/switch/FormSwitch';
import { getString } from 'app/presentation/localization';
import { BeneficiaryParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet, View
} from 'react-native';
import Toast from 'react-native-toast-message';

interface IProps {
    navigation: StackNavigationProp<
        BeneficiaryParamList,
        'AddNewBeneficiary'
    >;
}

const ScreenNewAccount = (props: IProps) => {
    const { navigation } = props
    const [dataList, setDataList] = useState<ListBankModel[]>([]);

    //! Function
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetListBankUseCase(new AccountBankRepository())
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    const dataListAccount = res?.data.data.map(e => ListBankModel.parseFromJson(e));
                    setDataList(dataListAccount);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
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

    }, []);

    const onSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const { numberAccount, accountHolder, bankName, branch, accountDefault } = values;
        new AccountBankRepository()
            .addAccountBank(
                {
                    numberAccount: numberAccount,
                    creatorText: accountHolder,
                    bankCategoryId: bankName.key,
                    isSetDefault: accountDefault,
                })
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('addToSuccessfulAccount'),
                    });
                    navigation.navigate('BeneficiaryScreen', { isUpdate: true })
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([`errors.${res?.data?.message}`, 'errorMessageCommon']),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([`errors.${err?.message}`, 'errorMessageCommon']),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    bankName: '',
                    branch: '',
                    numberAccount: '',
                    accountHolder: '',
                    accountDefault: false,
                }}
                onSubmit={onSubmit}
            >
                {({ handleBlur, handleSubmit, values, errors, isValid, setFieldValue }) => (
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        style={styles.formInput}
                    >
                        <View style={{ flex: 1 }}>
                            <Field
                                name="bankName"
                                label={getString('bankName2')}
                                isRequire
                                placeholder={'Ngân hàng'}
                                component={DropdownInput}
                                optionStyle={{alignItems:'flex-start'}}
                                style={{ paddingTop: 0 }}
                                data={dataList}
                            />
                            <Field
                                name="numberAccount"
                                label={getString('accountNumber2')}
                                isRequire
                                component={InputForm}
                                keyboardType='numeric'
                            />
                            <Field
                                name="accountHolder"
                                label={getString('accountHolder')}
                                isRequire
                                component={InputForm}
                            />
                            <Field
                                name="accountDefault"
                                component={FormSwitch}
                                label={getString('defaultAccount')}
                                onValueChange={(value: boolean) => setFieldValue('accountDefault', value)}
                                value={values.accountDefault}
                            />
                        </View>
                        <View style={styles.formButton}>
                            <AppButton
                                name={getString('addNew')}
                                type={
                                    !isValid ||
                                        !values.bankName ||
                                        !values.numberAccount ||
                                        !values.accountHolder
                                        ? ButtonType.CircleGray
                                        : undefined
                                }
                                onPress={handleSubmit}
                                disabled={!isValid ||
                                    !values.bankName ||
                                    !values.numberAccount ||
                                    !values.accountHolder}
                            />
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default ScreenNewAccount;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        flex: 1,
        justifyContent: 'space-between',
    },
    formInput: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.moderateScale(37),
    },
    formButton: {
        marginBottom: Dimensions.bottomPadding
    },
    formSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Dimensions.moderateScale(28),
        paddingBottom: Dimensions.moderateScale(10),
        borderColor: Colors.neutral.grayScale2,
    },
    textSwitch: {
        fontWeight: '700',
        color: Colors.neutral.s400,
    },
});
