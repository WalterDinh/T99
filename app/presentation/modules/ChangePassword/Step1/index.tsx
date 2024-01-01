import { Alert, ScrollView, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Img from '../../../../assets/images'
import { Dimensions, theme } from 'app/presentation/theme'
import { BackgroundImage, Input, TextPrimary } from 'app/presentation/components'
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton'
import { getString } from 'app/presentation/localization'
import Validators from 'app/shared/helper/validators'
import { changePasswordStyle } from '../styles'
import InputForm from 'app/presentation/components/input/InputForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList, AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import LoadingManager from 'app/shared/helper/LoadingManager';
import CustomerRepository from 'app/data/repository/customer';
import Toast from 'react-native-toast-message';
import { StatusToast } from 'app/shared/constants';
import { ChangePasswordUseCase } from 'app/domain/customer/auth/ChangePasswordUseCase';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .matches(Validators.PASSWORD_REGEX, getString('isPasswordValid'))
        .required(getString('thisFieldRequired')),

    newPassword: Yup.string()
        .matches(Validators.PASSWORD_REGEX, getString('isPasswordValid'))
        .required(getString('thisFieldRequired'))
        .notOneOf([Yup.ref('oldPassword'), null], getString('matchTheOldPassword')),

    confirmNewPassword: Yup.string()
        .required(getString('thisFieldRequired'))
        .oneOf([Yup.ref('newPassword'), null], getString('passwordsMustMatch')),
});

interface IProps {
    navigation: StackNavigationProp<
        AppStackParamList & AuthStackParamList,
        'ChangePassword'
    >;
}
const ChangePassword = (props: IProps) => {
    const { navigation } = props;
    const onSubmit = (values: any) => {
        LoadingManager.setLoading(true);
        const { oldPassword, newPassword, confirmNewPassword } = values;
        new ChangePasswordUseCase(new CustomerRepository(),
            {
                currentPassWord: oldPassword,
                newPassWord: newPassword,
                reNewPassWord: confirmNewPassword
            }
        )
            .execute()
            .then((res) => {
                if (res?.status === 200 && res?.data?.success === true) {
                    navigation.replace('DonePassword', {
                        id: '123',
                        title: getString('passwordChanged'),
                        titleContent: getString('passwordChangedDescription'),
                        titleContent2: getString('pleaseLoginToUse'),
                    })
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
        <View style={changePasswordStyle.container}>
            <BackgroundImage
                source={Img.Backgrounds.Background}
            >
                <KeyboardAwareScrollView
                    enableOnAndroid
                    style={changePasswordStyle.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <TextPrimary style={changePasswordStyle.title}>
                        {getString('changePassword')}
                    </TextPrimary>

                    <TextPrimary style={changePasswordStyle.description}>
                        {getString('pleaseEnterInfoPassword')}
                    </TextPrimary>

                    <TextPrimary
                        style={[changePasswordStyle.description, { paddingBottom: Dimensions.Spacing.large }]}
                    >
                        <TextPrimary
                            style={[changePasswordStyle.description, { fontFamily: theme.font.Bold }]}
                        >
                            {getString('notice')}
                        </TextPrimary>
                        {getString('passwordConditions')}
                    </TextPrimary>

                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        validationSchema={ValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, handleSubmit }) => {
                            return (
                                <View style={{ flex: 1, flexGrow: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Field
                                            name="oldPassword"
                                            label={getString('oldPassword')}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString('oldPassword')}
                                            component={InputForm}
                                            inputContainerStyle={{ backgroundColor: 'transparent' }}
                                            containerStyle={{ backgroundColor: 'transparent' }}
                                        />
                                        <Field
                                            name="newPassword"
                                            label={getString('newPassword')}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString('newPassword')}
                                            component={InputForm}
                                            inputContainerStyle={{ backgroundColor: 'transparent' }}
                                            containerStyle={{ backgroundColor: 'transparent' }}

                                        />
                                        <Field
                                            name="confirmNewPassword"
                                            label={getString('confirmNewPassword')}
                                            isRequire
                                            secureTextEntry
                                            placeholder={getString('confirmNewPassword')}
                                            component={InputForm}
                                            inputContainerStyle={{ backgroundColor: 'transparent' }}
                                            containerStyle={{ backgroundColor: 'transparent' }}

                                        />
                                    </View>
                                    <View style={changePasswordStyle.btn}>
                                        <AppButton
                                            name={getString('submit')}
                                            type={(!values.confirmNewPassword)
                                                ? ButtonType.CircleGray
                                                : undefined}
                                            onPress={handleSubmit}
                                            disabled={!values.confirmNewPassword}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        </View >

    )
}

export default ChangePassword
