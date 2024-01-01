import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import FormTitle from './FormTitle';
import { getString } from 'app/presentation/localization';
import { Colors } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import Images from 'app/assets/images';
import FormLogin from './FormLogin';
import { Field, Formik } from 'formik';
import { ImageRenderer } from 'app/presentation/components';
import { ImageBackground } from 'react-native';
import InputForm from 'app/presentation/components/input/InputForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { AllRouteParamList } from 'app/presentation/navigation/routes/routeParams';
import ValidationSchema from './validation';
import LoadingManager from 'app/shared/helper/LoadingManager';
import CustomerRepository from 'app/data/repository/customer';
import { LoginUseCase } from 'app/domain/customer/auth/LoginUseCase';
import Toast from 'react-native-toast-message';
import { StatusToast, TokenType, User } from 'app/shared/constants';
import { useDispatch } from 'react-redux';
import { getProfileSuccess } from 'app/presentation/redux/actions/customer/user';
import UserModel from 'app/models/user/UserModel';
import { StorageGatewayFactory } from 'app/data/gateway/storage';
const height = Dimensions.screenHeight();
interface IProps {
    navigation: StackNavigationProp<AllRouteParamList, 'LoginScreen'>;
}
const ScreenLogin2 = (props: IProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const onLogin = async (values: {
        phoneNumber: string;
        password: string;
    }) => {
        LoadingManager.setLoading(true);

        const { phoneNumber, password } = values;
        new LoginUseCase(new CustomerRepository(), {
            username: phoneNumber,
            password: password,
            client_id: 'Mobile_App',
            grant_type: 'password',
        })
            .execute()
            .then((res) => {
                // Toast.show({
                //     type: StatusToast.Success,
                //     text2: getString('loginSuccess'),
                // });
                if (!!res?.data && res?.status === 200) {
                    const dataUser: UserModel = res?.data;
                    dispatch(getProfileSuccess(dataUser));
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.message}`,
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
                        'loginFalse',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };

    const handleLoginByBiometric = async () => {
        const storageClient = StorageGatewayFactory.createWithSecureClient();
        Promise.all([
            storageClient.doGet(User.PhoneNumber),
            storageClient.doGet(User.Password),
        ])
            .then((responses) => {
                const phone = responses[0].data || '';
                const password = responses[1].data || '';
                onLogin({ password: password, phoneNumber: phone });
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString('errorMessageCommon'),
                });
            });
    };

    return (
        <ScrollView
            // contentContainerStyle={{ flexGrow: 1 }}
            // keyboardShouldPersistTaps="handled"
            style={styles.container}
        >
            <View style={styles.imageHeader}>
                <ImageIconCircle
                    source={Images.Backgrounds.BackgroundHeader}
                    resizeMode="cover"
                />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageRenderer
                            style={styles.backIcon}
                            source={Images.Icons.Back}
                        />
                    </TouchableOpacity>
                    <ImageRenderer
                        style={styles.logoIcon}
                        source={Images.Icons.Logo}
                    />
                    <View style={styles.backIcon} />
                </View>
            </View>

            <ImageBackground
                source={Images.Backgrounds.Background}
                resizeMode="stretch"
                style={styles.imageBackground}
            >
                <View style={styles.formContent}>
                    <FormTitle
                        title={getString('login')}
                        subTitle={getString('pleaseProvideInformation')}
                    />
                    <Formik
                        initialValues={{ phoneNumber: '', password: '' }}
                        onSubmit={onLogin}
                        validationSchema={ValidationSchema}
                        // initialErrors={{ phoneNumber: '', password: '' }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                    >
                        {({ handleSubmit, isValid, values }) => {
                            return (
                                <View style={styles.formInput}>
                                    <Field
                                        name="phoneNumber"
                                        label={getString('phoneNumber')}
                                        isRequire
                                        placeholder={getString(
                                            'phoneNumberPlaceholder',
                                        )}
                                        component={InputForm}
                                        keyboardType="numeric"
                                    />
                                    <Field
                                        name="password"
                                        label={getString('password')}
                                        isRequire
                                        component={InputForm}
                                        secureTextEntry
                                    />
                                    <View>
                                        <FormLogin
                                            handlerTouchID={
                                                handleLoginByBiometric
                                            }
                                            disable={
                                                !(
                                                    values.phoneNumber &&
                                                    values.password
                                                )
                                            }
                                            handlerForgotPassWord={() =>
                                                navigation.navigate(
                                                    'ForgotPasswordStack',
                                                )
                                            }
                                            onSubmit={handleSubmit}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default ScreenLogin2;
const ImageIconCircle = styled.Image`
    height: 120;
`;
const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 18,
        right: 18,
        bottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: Colors.neutral.white,
    },
    logoIcon: {
        height: 36,
        width: 36,
    },
    backIcon: {
        height: 18,
        width: 18,
    },
    formIcon: {
        marginBottom: Dimensions.moderateScale(43),
        paddingLeft: Dimensions.moderateScale(20),
    },
    iconBack: {
        width: Dimensions.moderateScale(9.5),
        height: Dimensions.moderateScale(17.5),
    },
    textError: {
        color: Colors.primary.brand,
        paddingHorizontal: Dimensions.moderateScale(22),
        fontSize: Dimensions.moderateScale(12),
    },
    formContent: {
        paddingTop: Dimensions.moderateScale(124),
    },
    formInput: {
        marginHorizontal: Dimensions.moderateScale(22),
        marginTop: Dimensions.moderateScale(24),
    },
    imageBackground: {
        flex: 1,
        height: height,
    },
    imageHeader: {
        position: 'absolute',
        right: 0,
        left: 0,
        alignItems: 'center',
        zIndex: 2,
    },
});
