import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { BackgroundImage, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Dimensions, Images, theme } from 'app/presentation/theme';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import Validators from 'app/shared/helper/validators';
import { Field, Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { newPasswordStyle } from '../ForgotPassword/styles';
interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'SetPassword'>;
    route: RouteProp<AuthStackParamList, 'SetPassword'>;
}
//! Validation Schema
const ValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .matches(Validators.PASSWORD_REGEX, getString('isPasswordValid'))
        .required(getString('thisFieldRequired')),
    confirmNewPassword: Yup.string()
        .required(getString('thisFieldRequired'))
        .oneOf([Yup.ref('newPassword'), null], getString('passwordsMustMatch')),
});

const SetPassword = (props: IProps) => {
    const { navigation, route } = props;
    const onSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const body = {
            phoneNumber: route.params.phoneNumber,
            newPassWord: values.newPassword,
            reNewPassWord: values.confirmNewPassword,
        };
        new CustomerRepository()
            .setPasswordUser(body)
            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        type: StatusToast.Success,
                        text2: getString('createPasswordSuccess'),
                    });
                    navigation.popToTop()
                    navigation.navigate('SignupSuccess');
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
                    text2: getString('errorMessageCommon'),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    return (
        <View style={newPasswordStyle.container}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    style={newPasswordStyle.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
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
                        validationSchema={ValidationSchema}
                        onSubmit={onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                    >
                        {({ values, handleSubmit, isValid }) => {
                            return (
                                <>
                                    <View style={{ flex: 1 }}>
                                        <Field
                                            name="newPassword"
                                            label={getString('enterPassword')}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString(
                                                'newPassword',
                                            )}
                                            component={InputForm}
                                        />
                                        <Field
                                            name="confirmNewPassword"
                                            label={getString('reenterPassword')}
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
                                        type={
                                            !values.confirmNewPassword &&
                                            !values.newPassword
                                                ? ButtonType.CircleGray
                                                : undefined
                                        }
                                        onPress={handleSubmit}
                                        styleBtn={newPasswordStyle.btn}
                                        disabled={
                                            !values.confirmNewPassword &&
                                            !values.newPassword
                                        }
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

export default SetPassword;
