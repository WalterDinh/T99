import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { PostVerificationIncomeUseCase } from 'app/domain/customer/customer/PostVerificationIncomeUseCase';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import InputPickerImage from 'app/presentation/components/input/InputPickerImage';
import OrganizationInput from 'app/presentation/components/organization';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { getUserDataRequest } from 'app/presentation/redux/actions/customer/user';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import numeral from 'numeral';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { dataCareer } from './constant';

const AddIncomeInformationSchema = Yup.object().shape({
    companyName: Yup.string().required(getString('thisFieldRequired')),
    career: Yup.object().required(getString('thisFieldRequired')),
    position: Yup.string().required(getString('thisFieldRequired')),
    province: Yup.object().required(getString('thisFieldRequired')),
    district: Yup.object().required(getString('thisFieldRequired')),
    address: Yup.string().required(getString('thisFieldRequired')),
    earnings: Yup.number().typeError(getString('thisFieldRequired')),
    identityDocuments: Yup.array().test({
        message: getString('thisFieldRequired'),
        test: (val) => val?.filter((i) => i).length !== 0,
    }),
});
interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'AddIncomeInformation'>;
}
const AddIncomeInformation = (props: IProps) => {
    //! State

    const { navigation } = props;
    const dispatch = useDispatch();

    //! Function
    const handleSubmit = async (value: any) => {
        LoadingManager.setLoading(true);
        new PostVerificationIncomeUseCase(new CustomerRepository(), value)
            .execute()
            .then((res) => {
                if (res?.data?.httpStatusCode === 200) {
                    navigation.goBack();
                    dispatch(getUserDataRequest());
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
            .catch((error: any) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: error?.data?.message?.includes('MSG')
                        ? getString([
                              `errors.${error?.data?.message}`,
                              'errorMessageCommon',
                          ])
                        : error?.data?.message,
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    const handleDocumentPiker = async (setFieldValue: any) => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            });
            setFieldValue('identityDocuments', pickerResult?.name);
        } catch (e) {
            handleError(e);
        }
    };
    const handleError = (err: unknown) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled');
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn(
                'multiple pickers were opened, only the last will be considered',
            );
        } else {
            throw err;
        }
    };
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                companyName: '',
                career: '',
                position: '',
                province: '',
                district: '',
                address: '',
                earnings: numeral,
                identityDocuments: [],
            }}
            validationSchema={AddIncomeInformationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid, setFieldValue }) => {
                return (
                    <View style={styles.container}>
                        <KeyboardAwareScrollView
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps
                        >
                            <View style={styles.content}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={styles.scroll}>
                                        <Field
                                            name="companyName"
                                            label={getString('companyName')}
                                            isRequire
                                            placeholder={getString(
                                                'enterCompanyName',
                                            )}
                                            component={InputForm}
                                        />
                                        <Field
                                            name="career"
                                            label={getString('career')}
                                            isRequire
                                            placeholder={getString(
                                                'selectCareer',
                                            )}
                                            component={DropdownInput}
                                            data={dataCareer}
                                        />
                                        <Field
                                            name="position"
                                            label={getString('position')}
                                            isRequire
                                            placeholder={getString(
                                                'enterPosition',
                                            )}
                                            component={InputForm}
                                        />
                                        <OrganizationInput
                                            provinceKey="province"
                                            districtKey="district"
                                        />
                                        <Field
                                            name="address"
                                            label={getString('address')}
                                            isRequire
                                            placeholder={getString(
                                                'enterAddress',
                                            )}
                                            component={InputForm}
                                        />
                                        <Field
                                            keyboardType="numeric"
                                            name="earnings"
                                            label={getString('earnings')}
                                            isRequire
                                            placeholder={getString(
                                                'enterEarnings',
                                            )}
                                            component={InputForm}
                                            // value={item.earnings}
                                        />
                                        <View
                                            style={{
                                                marginTop:
                                                    Dimensions.Spacing.large,
                                            }}
                                        >
                                            <Field
                                                name="identityDocuments"
                                                label={getString(
                                                    'identityDocuments',
                                                )}
                                                disabled
                                                isRequire
                                                component={InputPickerImage}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </KeyboardAwareScrollView>
                        <AppButton
                            onPress={handleSubmit}
                            name={getString('confirm')}
                            disabled={
                                !values.companyName &&
                                !values.address &&
                                !values.earnings
                            }
                            type={
                                !values.companyName &&
                                !values.address &&
                                !values.earnings
                                    ? ButtonType.CircleGray
                                    : undefined
                            }
                        />
                    </View>
                );
            }}
        </Formik>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.moderateScale(48),
        paddingTop: Dimensions.Spacing.large,
    },
    content: { marginBottom: Dimensions.Spacing.large, flex: 1 },
    title: {
        color: neutral.black,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.moderateScale(14),
    },
    scroll: {
        marginBottom: Dimensions.Spacing.large,
    },
});
export default AddIncomeInformation;
