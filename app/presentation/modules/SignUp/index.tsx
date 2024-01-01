import { StackNavigationProp } from '@react-navigation/stack';
import Image from 'app/assets/images/index';
import CustomerRepository from 'app/data/repository/customer';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import BackgroundImage from 'app/presentation/components/backgroundimage/BackgroundImage';
import FormCheckBox from 'app/presentation/components/checkBox/FormCheckBox';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { theme } from 'app/presentation/theme';
import { neutral, primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import Validators from 'app/shared/helper/validators';
import { Field, Formik, FormikProps } from 'formik';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

//! Validation Schema
const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required(getString('thisFieldRequired')),
    referralCode: Yup.number()
        .required(getString('thisFieldRequired'))
        .typeError(getString('referrerCodeWrongFormat')),
    phoneNumber: Yup.string()
        .matches(Validators.PHONE_REGEX, getString('isPhoneNumberValid'))
        .required(getString('thisFieldRequired')),
    email: Yup.string()
        .matches(Validators.EMAIL_REGEX, getString('isEmailValid')),
        // .required(getString('thisFieldRequired')),
    checkBoxAgree: Yup.boolean().required(getString('thisFieldRequired')),
});

interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUpScreen'>;
}
const SignUp = (props: IProps) => {
    const { navigation } = props;
    const refFormik = useRef<FormikProps<any>>(null);
    //! Function
    const onPressCheckBox = useCallback(() => {
        if (refFormik.current != null) {
            const { setFieldValue, values } = refFormik.current;
            setFieldValue('checkBoxAgree', !values.checkBoxAgree);
        }
    }, [refFormik.current?.values.checkBoxAgree]);

    const onSubmit = async (values: any) => {
        LoadingManager.setLoading(true);
        const body = {
            fullName: values.fullname,
            phoneNumber: values.phoneNumber,
            email: values.email,
            referralCode: values.referralCode,
            isAgreeTerms: values.checkBoxAgree,
        };
        new CustomerRepository()
            .registerApp({
                phoneNumber: values.phoneNumber,
                email: values.email,
            })
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    navigation.navigate('SendOtpSignup', body);
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
            .catch((error) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${error?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    //! Render
    return (
        <View style={styles.container}>
            <BackgroundImage source={Image.Backgrounds.Background}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    style={styles.signupContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <TextPrimary style={styles.signupTitle}>
                        {getString('openAccount')}
                    </TextPrimary>
                    <TextPrimary style={styles.signupSubtitle}>
                        {getString('pleaseProvideInformation')}
                    </TextPrimary>
                    <Formik
                        innerRef={refFormik}
                        initialValues={{
                            fullname: '',
                            phoneNumber: '',
                            email: '',
                            referralCode: '',
                            checkBoxAgree: false,
                        }}
                        onSubmit={onSubmit}
                        initialTouched={{
                            fullname: true,
                            phoneNumber: true,
                            email: true,
                            referralCode: true,
                        }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        validationSchema={SignupSchema}
                    >
                        {({ values, handleSubmit, isValid }) => {
                            return (
                                <>
                                    <Field
                                        name="fullname"
                                        label={getString('fullname')}
                                        isRequire
                                        placeholder={getString('enterFullNameByDocument')}
                                        component={InputForm}
                                    />
                                    <Field
                                        label={getString('phoneNumber')}
                                        isRequire
                                        placeholder={getString(
                                            'enterPhoneNumber',
                                        )}
                                        name="phoneNumber"
                                        component={InputForm}
                                        keyboardType="numeric"
                                    />
                                    <Field
                                        label={getString('email')}
                                        placeholder={getString('enterEmail')}
                                        name="email"
                                        component={InputForm}
                                    />
                                    <Field
                                        label={getString('referralCode')}
                                        placeholder={getString(
                                            'enterReferralCode',
                                        )}
                                        isRequire
                                        name="referralCode"
                                        component={InputForm}
                                        keyboardType="numeric"
                                    />
                                    <TextPrimary
                                        style={[
                                            styles.signupNoteBold,
                                            { color: theme.color.colorPrimary },
                                        ]}
                                    >
                                        {getString('mind')}:
                                        <TextPrimary
                                            style={[
                                                styles.signupNote,
                                                {
                                                    color: theme.color
                                                        .colorPrimary,
                                                },
                                            ]}
                                        >
                                            {' '}
                                            {getString('stringNoteSignup')}
                                        </TextPrimary>
                                    </TextPrimary>
                                    <View style={styles.signupCheckBox}>
                                        <FormCheckBox
                                            containerStyle={{ paddingTop: 4 }}
                                            onPress={onPressCheckBox}
                                        />
                                        <TextPrimary
                                            style={styles.signupCheckBoxAgree}
                                        >
                                            {getString('haveReadAndAgreeWith')}{' '}
                                            <TextPrimary
                                                style={
                                                    styles.signupCheckBoxColor
                                                }
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'PrivacyAndPolicy',
                                                    )
                                                }
                                            >
                                                {getString(
                                                    'termsPolicyAndPrivacy',
                                                )}
                                            </TextPrimary>
                                        </TextPrimary>
                                    </View>
                                    <AppButton
                                        onPress={handleSubmit}
                                        name={getString('signup')}
                                        disabled={!values.checkBoxAgree}
                                        type={
                                            !values.checkBoxAgree
                                                ? ButtonType.CircleGray
                                                : undefined
                                        }
                                    />
                                </>
                            );
                        }}
                    </Formik>
                    <TextPrimary style={styles.signupNoteBold}>
                        {getString('note')}
                        <TextPrimary style={styles.signupNote}>
                            {' '}
                            {getString('stringNote')}
                        </TextPrimary>
                    </TextPrimary>
                    <TextPrimary style={styles.haveAccount}>
                        {getString('youHaveAnAccount')}{' '}
                        <TextPrimary
                            onPress={() => {
                                navigation.navigate('LoginScreen');
                            }}
                            style={styles.textSignIn}
                        >
                            {getString('signin')}
                        </TextPrimary>
                    </TextPrimary>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
    },
    signupCheckBoxColor: {
        color: secondary.brand,
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Medium,
    },

    signupCheckBoxAgree: {
        color: neutral.s400,
        flex: 1,
        fontFamily: theme.font.Regular,
    },
    signupCheckBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.Spacing.extraLarge,
    },
    signupContainer: {
        // flex: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    haveAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: Dimensions.FontSize.large,
        color: neutral.black,
        marginBottom: Dimensions.bottomPadding,
    },
    textSignIn: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.large,
        color: primary.brand,
    },
    signupTitle: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        letterSpacing: 0.35,
        color: neutral.black,
        marginBottom: Dimensions.Spacing.medium,
        marginTop: Dimensions.Spacing.extraLarge,
    },
    signupSubtitle: {
        fontSize: Dimensions.FontSize.large,
        color: neutral.s400,
        marginBottom: Dimensions.Spacing.extraLarge,
    },
    sectionContainer: {
        marginTop: Dimensions.Spacing.extraHuge,
        paddingHorizontal: Dimensions.Spacing.extraLarge,
    },
    signupNoteBold: {
        display: 'flex',
        flexDirection: 'row',
        color: neutral.s400,
        fontFamily: theme.font.Bold,
        marginTop: Dimensions.Spacing.large,
        marginBottom: Dimensions.Spacing.large,
        fontSize: Dimensions.Spacing.medium,
    },
    signupNote: {
        display: 'flex',
        flexDirection: 'row',
        color: neutral.s400,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.Spacing.medium,
    },
    signupAnnotate: {
        fontFamily: theme.font.Bold,
        fontSize: 13,
        lineHeight: 15,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.28,
        color: primary.brand,
    },
    signupAnnotateColor: {
        fontFamily: theme.font.Regular,
        fontSize: 13,
        lineHeight: 15,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.28,
        color: primary.brand,
    },
});
export default SignUp;
