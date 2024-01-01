import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import { Images } from 'app/presentation/theme';
import Validators from 'app/shared/helper/validators';
import { Field, Formik } from 'formik';
import React from 'react';
import { Alert, View } from 'react-native';
import DocumentPicker, {
    isInProgress
} from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { styles } from './styles';

//! Validation Schema
const EarningVerificationSchema = Yup.object().shape({
    companyName: Yup.string().required(getString('thisFieldRequired')),
    earnings: Yup.string().required(getString('thisFieldRequired')),
    position: Yup.string().required(getString('thisFieldRequired')),
    province: Yup.string().required(getString('thisFieldRequired')),
    district: Yup.string().required(getString('thisFieldRequired')),
    address: Yup.string().required(getString('thisFieldRequired')),
    identityDocuments: Yup.string().required(getString('thisFieldRequired')),
    phoneContact: Yup.string()
        .matches(Validators.PHONE_REGEX, getString('isPhoneNumberValid'))
        .required(getString('thisFieldRequired')),
    career: Yup.string().required(getString('thisFieldRequired')),
});
const EarningVerification = () => {
    //! State

    //! Function
    const onSubmit = () => {
        Alert.alert('Verify Earning Screen!');
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

    //! Render
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                companyName: '',
                position: '',
                province: '',
                district: '',
                address: '',
                phoneContact: '',
                earnings: '',
                identityDocuments: '',
                career: '',
            }}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            validationSchema={EarningVerificationSchema}

        >
            {({ handleSubmit, isValid, setFieldValue }) => {
                
                return (
                    // <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                            <TextPrimary style={styles.title}>
                                {getString('assetInformation')}
                            </TextPrimary>
                            <Field
                                name="companyName"
                                label={getString('companyName')}
                                isRequire
                                placeholder={getString('enterCompanyName')}
                                component={InputForm}
                            />
                            <Field
                                name={`career`}
                                label={getString('career')}
                                isRequire
                                placeholder={getString('selectCareer')}
                                component={DropdownInput}
                            />
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
                                    name="earnings"
                                    label={getString('earnings')}
                                    isRequire
                                    placeholder={getString('enterEarnings')}
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
                            <View style={styles.inputField}>
                                <Field
                                    name="identityDocuments"
                                    label={getString('identityDocuments')}
                                    isRequire
                                    placeholder={getString(
                                        'enterIdentityDocuments',
                                    )}
                                    component={InputForm}
                                    onPressRightIcon={() =>
                                        handleDocumentPiker(setFieldValue)
                                    }
                                    disabled
                                    iconRightPath={Images.Icons.CloudUpload}
                                />
                            </View>
                        
                        <AppButton
                            onPress={handleSubmit}
                            name={getString('confirm')}
                            disabled={!isValid}
                            type={!isValid ? ButtonType.CircleGray : undefined}
                        />
                        </ScrollView>
                    // </View>
                );
            }}
        </Formik>
    );
};

export default EarningVerification;
