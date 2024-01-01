import { StackNavigationProp } from '@react-navigation/stack';
import CustomerRepository from 'app/data/repository/customer';
import { PostVerificationResidenceUseCase } from 'app/domain/customer/customer/PostVerificationResidenceUseCase';
import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import InputPickerImage from 'app/presentation/components/input/InputPickerImage';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { getUserDataRequest } from 'app/presentation/redux/actions/customer/user';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import { Field, Formik } from 'formik';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
interface IProps {
    navigation: StackNavigationProp<
        AppStackParamList,
        'ConfirmationOfResidence'
    >;
}
const ConfirmationOfResidenceSchema = Yup.object().shape({
    familyRegisterInformation: Yup.array().test({
        message: getString('thisFieldRequired'),
        test: (val) => val?.filter((i) => i).length !== 0,
    }),
});

const ConfirmationOfResidence = (props: IProps) => {
    //! State
    const { navigation } = props;
    const dispatch = useDispatch();

    //! Function
    const handleSubmit = (value: any) => {
        LoadingManager.setLoading(true);
        new PostVerificationResidenceUseCase(new CustomerRepository(), value)
            .execute()
            .then((res) => {
                if (res?.status === 200) {
                    navigation.goBack()
                    dispatch(getUserDataRequest());
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `${res?.data?.message}`,
                            'requestLoanFaild',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([`errors.${err?.message}`]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };
    //! Render
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                familyRegisterInformation: [],
                temporaryResidenceInformation: [],
            }}
            validationSchema={ConfirmationOfResidenceSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <TextPrimary style={styles.title}>
                                {getString('confirmationOfResidence')}
                            </TextPrimary>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Field
                                    name={`familyRegisterInformation`}
                                    label={getString(
                                        'familyRegisterInformation',
                                    )}
                                    isRequire
                                    component={InputPickerImage}
                                    isShowAlert={true}
                                />
                                <View style={styles.rectangle}></View>
                                <View
                                    style={{
                                        marginBottom:
                                            Dimensions.Spacing.extraLarge,
                                    }}
                                >
                                    <Field
                                        name={`temporaryResidenceInformation`}
                                        label={getString(
                                            'temporaryResidenceInformation',
                                        )}
                                        component={InputPickerImage}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <AppButton
                            name={getString('confirm')}
                            onPress={handleSubmit}
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
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.moderateScale(60),
        paddingTop: Dimensions.Spacing.large,
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        lineHeight: Dimensions.moderateScale(25),
        alignItems: 'center',
        textAlign: 'center',
        color: neutral.black,
        paddingBottom: Dimensions.Spacing.extraLarge,
    },
    rectangle: {
        height: Dimensions.Spacing.small,
        backgroundColor: secondary.whiteGray,
        marginVertical: Dimensions.Spacing.extraLarge,
    },
});
export default ConfirmationOfResidence;
