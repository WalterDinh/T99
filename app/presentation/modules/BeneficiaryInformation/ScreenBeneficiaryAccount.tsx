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
import { ConfirmModal } from 'app/presentation/components/modal/ModalConfirm';
import { FormSwitch } from 'app/presentation/components/switch/FormSwitch';
import { getString } from 'app/presentation/localization';
import { BeneficiaryParamList } from 'app/presentation/navigation/routes/routeParams';
import { getAccountBenefitRequest } from 'app/presentation/redux/actions/accountBenefits';
import { Colors } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

interface IProps {
    navigation: StackNavigationProp<
        BeneficiaryParamList,
        'BeneficiaryAccountScreen'
    >,
    route?: any;
}
const ScreenBeneficiaryAccount = (props: IProps) => {
    const { navigation, route } = props
    const { id, nameBank, numberAccount, creatorText, isSetDefault } = route.params;
    const dispatch = useDispatch();

    const [isShowModal, setIsShowModal] = useState(false);
    const [dataList, setDataList] = useState<ListBankModel[]>([]);
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
                    const dataListBank = res?.data.data.map(e => ListBankModel.parseFromJson(e));
                    setDataList(dataListBank);
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

    const handleDelete = () => {
        LoadingManager.setLoading(true);
        new AccountBankRepository()
            .deleteAccountBank({
                accountBankCustomerId: id,
            })
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    dispatch(
                        getAccountBenefitRequest(),
                    );
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('accountDeletedSuccessful'),
                    });

                    navigation.navigate('BeneficiaryScreen', { isUpdate: true })
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([`errors.${res?.data?.message}`, 'errorMessageCommon']),
                    });
                }
            })
            .catch((error) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([`errors.${error?.message}`, 'errorMessageCommon']),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });

    }

    const handleUpdate = (values: any) => {
        LoadingManager.setLoading(true);
        const { numberAccount, accountHolder, bankName, accountDefault } = values;

        if (bankName.key === '1') {
            const dataBank = dataList.find(e => e.label === bankName.label)
            bankName.key = dataBank?.key
        }

        new AccountBankRepository()
            .editAccountBank(
                {
                    id: id,
                    numberAccount: numberAccount,
                    creatorText: accountHolder,
                    bankCategoryId: bankName.key,
                    isSetDefault: accountDefault,
                })
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {

                    // EventEmitter.emit(EventNames.updateListAccountBank, {});
                    dispatch(
                        getAccountBenefitRequest(),
                    );
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('accountUpdateSuccessful'),
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
    }

    return (
        <Formik
            initialValues={{
                bankName: { key: '1', label: nameBank },
                numberAccount: numberAccount,
                accountHolder: creatorText,
                accountDefault: isSetDefault,
            }}
            onSubmit={handleUpdate}
        // validationSchema={ValidationSchema}
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
                            placeholder={getString('bankName2')}
                            component={DropdownInput}
                            style={{ paddingTop: 0 }}
                            optionStyle={{ alignItems: 'flex-start' }}
                            data={dataList}
                            value={values.bankName}
                        />
                        <Field
                            name="numberAccount"
                            label={getString('accountNumber2')}
                            isRequire
                            component={InputForm}
                        />
                        <Field
                            name="accountHolder"
                            label={getString('accountHolder')}
                            isRequire
                            component={InputForm}
                            value={values.accountHolder}
                        />
                        <Field
                            name="accountDefault"
                            component={FormSwitch}
                            label={getString('defaultAccount')}
                            onValueChange={(value: boolean) => setFieldValue('accountDefault', value)}
                            value={values.accountDefault}
                        />
                    </View>
                    <ConfirmModal
                        isVisible={isShowModal}
                        onHideModal={() => setIsShowModal(false)}
                        onPressRight={() => { setIsShowModal(false), handleDelete() }}
                        onPressLeft={() => setIsShowModal(false)}
                        title={getString('submit')}
                        content={getString('deleteAccountConfirm')}
                    />
                    <View style={styles.button}>
                        <AppButton
                            name={getString('delete')}
                            type={ButtonType.CircleBorderRed}
                            styleBtn={{
                                marginBottom: Dimensions.moderateScale(16),
                            }}
                            onPress={() => setIsShowModal(true)}
                        />
                        <AppButton name={getString('update')} onPress={handleSubmit} />
                    </View>
                </ScrollView >
            )}
        </Formik>
    );
};

export default ScreenBeneficiaryAccount;

const styles = StyleSheet.create({
    container: {},
    formInput: {
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: Colors.neutral.white,
        paddingTop: Dimensions.moderateScale(46),
        flex: 1,
    },
    button: {
        marginBottom: Dimensions.bottomPadding,
    },
    formSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Dimensions.moderateScale(28),
        paddingBottom: Dimensions.moderateScale(10),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
    textSwitch: {
        fontWeight: '700',
        color: Colors.neutral.s400,
    },
});
