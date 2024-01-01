import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import Validators from 'app/shared/helper/validators';
import { Field, Formik } from 'formik';
import React from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { styles } from './styles';
//! Validation Schema
const VerifyBusinessInformationSchema = Yup.object().shape({
    companyName: Yup.string().required(getString('thisFieldRequired')),
    taxNumber: Yup.string().required(getString('thisFieldRequired')),
    position: Yup.string().required(getString('thisFieldRequired')),
    province: Yup.string().required(getString('thisFieldRequired')),
    district: Yup.string().required(getString('thisFieldRequired')),
    address: Yup.string().required(getString('thisFieldRequired')),
    representative: Yup.string().required(getString('thisFieldRequired')),
    phoneContact: Yup.string()
        .matches(Validators.PHONE_REGEX, getString('isPhoneNumberValid'))
        .required(getString('thisFieldRequired')),
});
const VerifyBusinessInformation = () => {
    //! Function
    const onSubmit = () => {
        Alert.alert('Verify Business Information Screen!')
    };
    //! Render
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                companyName: '',
                taxNumber: '',
                position: '',
                province: '',
                district: '',
                address: '',
                representative: '',
                phoneContact: '',
            }}
            onSubmit={onSubmit}
            validationSchema={VerifyBusinessInformationSchema}
        >
            {({ values, handleSubmit, isValid }) => {
                return (
                    <View style={styles.container}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <TextPrimary style={styles.title}>
                                {getString('businessInformation')}
                            </TextPrimary>
                            <Field
                                name="companyName"
                                label={getString('companyName')}
                                isRequire
                                placeholder={getString('enterCompanyName')}
                                component={InputForm}
                            />
                            <View style={styles.inputField}>
                                <Field
                                    name="taxNumber"
                                    label={getString('taxNumber')}
                                    isRequire
                                    placeholder={getString('enterTaxNumber')}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="position"
                                    label={getString('position')}
                                    isRequire
                                    placeholder={getString('enterPosition')}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="province"
                                    label={getString('province')}
                                    isRequire
                                    placeholder={getString('enterProvince')}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="district"
                                    label={getString('district')}
                                    isRequire
                                    placeholder={getString('enterDistrict')}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="address"
                                    label={getString('address')}
                                    isRequire
                                    placeholder={getString('enterAddress')}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="representative"
                                    label={getString('representative')}
                                    isRequire
                                    placeholder={getString(
                                        'enterRepresentative',
                                    )}
                                    component={InputForm}
                                />
                            </View>
                            <View style={styles.inputField}>
                                <Field
                                    name="phoneContact"
                                    label={getString('phoneContact')}
                                    isRequire
                                    placeholder={getString('enterPhoneContact')}
                                    component={InputForm}
                                />
                            </View>
                        </ScrollView>
                        <AppButton
                            onPress={handleSubmit}
                            name={getString('confirm')}
                            disabled={!isValid}
                            type={!isValid ? ButtonType.CircleGray : undefined}
                        />
                    </View>
                );
            }}
        </Formik>
    );
};

export default VerifyBusinessInformation;
