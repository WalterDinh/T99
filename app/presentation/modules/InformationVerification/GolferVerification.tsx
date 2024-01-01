import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { getUserDataRequest } from 'app/presentation/redux/actions/customer/user';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

//! Validation Schema
const GolferVerificationSchema = Yup.object().shape({
    vgaCode: Yup.string().required(getString('thisFieldRequired')),
    golferAccountHolder: Yup.string().required(getString('thisFieldRequired')),
});

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'GolferVerification'>;
}

const GolferVerification = (props: IProps) => {
    const dispatch = useDispatch();
    const { navigation } = props;
    const onSubmit = async (values: any) => {
        LoadingManager.setLoading(true);
        try {
            const body = {
                accoutHolder: values.golferAccountHolder,
                vgaCode: values.vgaCode,
            };
            const res = await new CustomerRepository().verificationGolferApp(
                body,
            );            
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
        } catch (error: any) {
            Toast.show({
                type: StatusToast.Error,
                text2: error?.data?.message?.includes('MSG')
                    ? getString([
                          `errors.${error?.data?.message}`,
                          'errorMessageCommon',
                      ])
                    : error?.data?.message,
            });
        } finally {
            LoadingManager.setLoading(false);
        }
    };
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                vgaCode: '',
                golferAccountHolder: '',
            }}
            onSubmit={onSubmit}
            validationSchema={GolferVerificationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
        >
            {({ handleSubmit, isValid, values }) => {
                return (
                    <KeyboardAwareScrollView
                        enableOnAndroid
                        style={{ flex: 1, backgroundColor: neutral.white }}
                        keyboardOpeningTime={0}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            flexGrow: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.container}>
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <TextPrimary style={styles.title}>
                                    {getString('golferAccountVerification')}
                                </TextPrimary>
                                <Field
                                    name="vgaCode"
                                    label={getString('vgaCode')}
                                    isRequire
                                    placeholder={getString('vgaCode')}
                                    component={InputForm}
                                />
                                <Field
                                    name="golferAccountHolder"
                                    label={getString('golferAccountHolder')}
                                    isRequire
                                    placeholder={getString(
                                        'golferAccountHolder',
                                    )}
                                    component={InputForm}
                                />
                            </View>
                            <AppButton
                                onPress={handleSubmit}
                                name={getString('confirm')}
                                disabled={
                                    !values.vgaCode ||
                                    !values.golferAccountHolder
                                }
                                type={
                                    !values.vgaCode ||
                                    !values.golferAccountHolder
                                        ? ButtonType.CircleGray
                                        : undefined
                                }
                            />
                        </View>
                    </KeyboardAwareScrollView>
                );
            }}
        </Formik>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.moderateScale(60),
        paddingTop: Dimensions.Spacing.large,
    },
    title: {
        textAlign: 'center',
        color: neutral.black,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.moderateScale(14),
    },
});
export default GolferVerification;
