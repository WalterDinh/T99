import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { BackgroundImage, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { ForgotPasswordStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { OtpType, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { forgotPasswordStyle } from '../styles';

interface IProps {
    navigation: StackNavigationProp<
        ForgotPasswordStackParamList,
        'ForgotPasswordHaveEkyc'
    >;
    route: RouteProp<ForgotPasswordStackParamList, 'ForgotPasswordHaveEkyc'>;
}
const ForgotPasswordHaveEkycSchema = Yup.object().shape({
    fullname: Yup.string().required(getString('thisFieldRequired')),
    cmndCccdRegistered: Yup.string().required(getString('thisFieldRequired')),
});
const ForgotPasswordHaveEkyc = (props: IProps) => {
    const { navigation, route } = props;

    const handleSubmit = (value: any) => {
        LoadingManager.setLoading(true);
        new CustomerRepository()
            .sendOTP({
                otpType: OtpType.ForgotPassword,
                phoneNumber: route.params.phoneNumber,
            })
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    navigation.navigate('ForgotPasswordStep2', {
                        phoneNumber: route.params.phoneNumber,
                        fullName: value?.fullname || '',
                        identityNumber: value?.cmndCccdRegistered || '',
                    });
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
    };
    return (
        <View style={forgotPasswordStyle.container}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <KeyboardAwareScrollView
                    style={forgotPasswordStyle.content}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <TextPrimary style={forgotPasswordStyle.title}>
                        {getString('forgotPassword')}
                    </TextPrimary>

                    <TextPrimary style={forgotPasswordStyle.description}>
                        {getString('pleaseVerificationInformation')}
                    </TextPrimary>

                    <Formik
                        // innerRef={refFormik}
                        initialValues={{
                            fullname: '',
                            cmndCccdRegistered: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        onSubmit={handleSubmit}
                        validationSchema={ForgotPasswordHaveEkycSchema}
                    >
                        {({ values, handleSubmit, isValid }) => {
                            return (
                                <View style={styles.contentField}>
                                    <View>
                                        <View style={styles.inputField}>
                                            <Field
                                                name="fullname"
                                                isRequire
                                                label={getString('fullname')}
                                                placeholder={getString(
                                                    'enterFullname',
                                                )}
                                                component={InputForm}
                                            />
                                        </View>
                                        <View style={styles.inputField}>
                                            <Field
                                                isRequire
                                                label={getString(
                                                    'cmndCccdRegistered',
                                                )}
                                                placeholder={getString(
                                                    'cmndCccdRegisteredLabel'
                                                )}
                                                name="cmndCccdRegistered"
                                                component={InputForm}
                                            />
                                        </View>
                                    </View>

                                    <AppButton
                                        onPress={handleSubmit}
                                        name={getString('submit')}
                                        // disabled={!isValid}
                                        disabled={(!values.fullname && !values.cmndCccdRegistered)}
                                        type={(!values.fullname && !values.cmndCccdRegistered)
                                            ? ButtonType.CircleGray
                                            : undefined}
                                    />
                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        </View>
    );
};
const styles = StyleSheet.create({
    contentField: {
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: Dimensions.moderateScale(60),
    },
    inputField: {
        paddingTop: Dimensions.Spacing.extraLarge,
    },
});
export default ForgotPasswordHaveEkyc;
