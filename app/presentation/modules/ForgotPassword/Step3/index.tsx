import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { ForgotPasswordUseCase } from 'app/domain/customer/auth/ForgotPasswordUseCase';
import { BackgroundImage, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { ForgotPasswordStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Dimensions, theme } from 'app/presentation/theme';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import Validators from 'app/shared/helper/validators';
import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import Img from '../../../../assets/images';
import { newPasswordStyle } from '../styles';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .matches(Validators.PASSWORD_REGEX, getString('isPasswordValid'))
        .required(getString('thisFieldRequired')),
    confirmNewPassword: Yup.string()
        .required(getString('thisFieldRequired'))
        .oneOf([Yup.ref('newPassword'), null], getString('passwordsMustMatch')),
});
interface IProps {
    navigation: StackNavigationProp<
        ForgotPasswordStackParamList,
        'ForgotPasswordStep3'
    >;
    route: RouteProp<ForgotPasswordStackParamList, 'ForgotPasswordStep3'>;
}
const NewPassword = (props: IProps) => {
    const { navigation, route } = props;
    const onSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const { newPassword, confirmNewPassword } = values;
        new ForgotPasswordUseCase(new CustomerRepository(), {
            fullName: route.params?.fullName || '',
            identityNumber: route.params?.identityNumber || '',
            phoneNumber: route.params.phoneNumber,
            newPassWord: newPassword,
            reNewPassWord: confirmNewPassword,
        })
            .execute()
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    navigation.popToTop();
                    navigation.replace('ForgotPasswordStep4');
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
        <View style={newPasswordStyle.container}>
            <BackgroundImage source={Img.Backgrounds.Background}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    style={newPasswordStyle.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <TextPrimary style={newPasswordStyle.title}>
                        {getString('createNewPassword')}
                    </TextPrimary>

                    <TextPrimary style={newPasswordStyle.description}>
                        {getString('pleaseEnterNewPassword')}
                    </TextPrimary>

                    <TextPrimary
                        style={[
                            newPasswordStyle.description,
                            { paddingBottom: Dimensions.Spacing.large },
                        ]}
                    >
                        <TextPrimary
                            style={[
                                newPasswordStyle.description,
                                { fontFamily: theme.font.Bold },
                            ]}
                        >
                            {getString('notice')}
                        </TextPrimary>
                        {getString('passwordConditions')}
                    </TextPrimary>

                    <Formik
                        initialValues={{
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        validationSchema={ValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, handleSubmit, isValid }) => {
                            return (
                                <>
                                    <View style={{ flex: 1, flexGrow: 1 }}>
                                        <Field
                                            name="newPassword"
                                            label={getString('newPassword')}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString(
                                                'newPassword',
                                            )}
                                            component={InputForm}
                                        />
                                        <Field
                                            name="confirmNewPassword"
                                            label={getString(
                                                'confirmNewPassword',
                                            )}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString(
                                                'confirmNewPassword',
                                            )}
                                            component={InputForm}
                                        />
                                    </View>
                                    <AppButton
                                        name={getString('submit')}
                                        disabled={
                                            !values.confirmNewPassword ||
                                            !values.newPassword
                                        }
                                        type={
                                            !values.confirmNewPassword ||
                                            !values.newPassword
                                                ? ButtonType.CircleGray
                                                : undefined
                                        }
                                        onPress={handleSubmit}
                                        styleBtn={newPasswordStyle.btn}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        </View>
    );
};

export default NewPassword;
