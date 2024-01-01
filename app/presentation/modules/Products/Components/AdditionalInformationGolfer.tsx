import Img from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import InputForm from 'app/presentation/components/input/InputForm';
import FormCheckBox from 'app/presentation/components/radioBox/FormCheckBox';
import { getString } from 'app/presentation/localization';
import { Dimensions, theme } from 'app/presentation/theme';
import { ProductsType } from 'app/shared/constants';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface PropsItem {
    initValues: {},
    onSubmit: (values: object) => void,
    validateSchema?: any,
}


const AdditionalInformationGolfer = (props: PropsItem) => {
    const { onSubmit, initValues, validateSchema } = props;
    return (
        <Formik
            initialValues={
                !!initValues ? { ...initValues } : {
                    monthlyRevenue: '',
                    job: '',
                    incomeSource: '',
                    province: '',
                    district: '',
                    detailedAddress: '',

                    fullName1: '',
                    relationship1: '',
                    phoneNumber1: '',

                    fullName2: '',
                    relationship2: '',
                    phoneNumber2: '',

                    salesStaffCode: '',
                }
            }
            initialTouched={{
                monthlyRevenue: true,
                job: true,
                incomeSource: true,
                detailedAddress: true,

                fullName1: true,
                relationship1: true,
                phoneNumber1: true,

                fullName2: true,
                relationship2: true,
                phoneNumber2: true,

                salesStaffCode: true,

            }}

            validationSchema={validateSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, setFieldValue, errors }) => {
                return (
                    <>
                        <View style={{ flex: 1 }}>
                            <TextPrimary style={styles.title}>{getString('informationDetails')}</TextPrimary>
                            <Field
                                name="monthlyRevenue"
                                label={getString('monthlyRevenue')}
                                isRequire
                                placeholder={getString('monthlyRevenue')}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                component={InputForm}
                                iconRight={
                                    <TextPrimary style={styles.iconRightField}>{getString('vnd')}</TextPrimary>
                                }
                                keyboardType='numeric'
                            />
                            <Field
                                name="job"
                                label={getString('job')}
                                isRequire
                                placeholder={getString('job')}
                                component={InputForm}
                                value={values.job}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <Field
                                name="incomeSource"
                                label={getString('incomeSource')}
                                isRequire
                                placeholder={getString('incomeSource')}
                                component={InputForm}
                                value={values.incomeSource}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <TextPrimary style={styles.title}>{getString('addressContact')}</TextPrimary>
                            <Field
                                name="province"
                                label={getString(
                                    'province',
                                )}
                                isRequire
                                placeholder={getString('enterProvince')}
                                component={DropdownInput}
                                value={''}
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                            />
                            <Field
                                name="district"
                                label={getString(
                                    'district',
                                )}
                                isRequire
                                placeholder={getString('enterDistrict')}
                                component={DropdownInput}
                                value={''}
                                inputContainerStyle={{ paddingBottom: 0 }}


                            />
                            <Field
                                name="detailedAddress"
                                label={getString(
                                    'detailedAddress'
                                )}
                                isRequire
                                placeholder={getString('enterDetailedAddress')}
                                component={InputForm}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />

                            <View style={styles.line} />

                            <TextPrimary style={styles.title}>{getString('referenceInformation')}</TextPrimary>
                            <TextPrimary style={styles.subtitle}>{getString('referencePerson')} 1</TextPrimary>
                            <Field
                                name="fullName1"
                                label={getString('fullname')}
                                isRequire
                                placeholder={getString('enterFullname')}
                                component={InputForm}
                                value={values.fullName1}
                                inputContainerStyle={{ paddingBottom: 0 }}
                            />
                            <Field
                                name="relationship1"
                                label={getString('relationship')}
                                isRequire
                                placeholder={getString('relationship')}
                                component={InputForm}
                                value={values.relationship1}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <Field
                                name="phoneNumber1"
                                label={getString('phoneNumber')}
                                isRequire
                                placeholder={getString('enterPhoneNumber')}
                                keyboardType='numeric'
                                component={InputForm}
                                value={values.phoneNumber1}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <TextPrimary style={styles.subtitle}>{getString('referencePerson')} 2</TextPrimary>
                            <Field
                                name="fullName2"
                                label={getString('fullname')}
                                isRequire
                                placeholder={getString('enterFullname')}
                                component={InputForm}
                                value={values.fullName2}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <Field
                                name="relationship2"
                                label={getString('relationship')}
                                isRequire
                                placeholder={getString('relationship')}
                                component={InputForm}
                                value={values.relationship2}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                            <Field
                                name="phoneNumber2"
                                label={getString('phoneNumber')}
                                isRequire
                                keyboardType='numeric'
                                placeholder={getString('enterPhoneNumber')}
                                component={InputForm}
                                value={values.phoneNumber2}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />

                            <View style={styles.line} />
                            <Field
                                name="salesStaffCode"
                                label={getString('salesStaffCode')}
                                placeholder={getString('salesStaffCode')}
                                component={InputForm}
                                value={values.phoneNumber2}
                                inputContainerStyle={{ paddingBottom: 0 }}

                            />
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <AppButton
                                onPress={handleSubmit}
                                styleBtn={styles.btnStyle}
                                name={getString('continue')}
                            />
                        </View>
                    </>
                );
            }}
        </Formik>
    )
}

export default AdditionalInformationGolfer

const styles = StyleSheet.create({
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    title: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        paddingVertical: Dimensions.Spacing.small,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.medium,
        paddingVertical: Dimensions.Spacing.small,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
    titleGender: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingTop: Dimensions.Spacing.small,
    },
    errorGender: {
        marginHorizontal: 5,
        width: '100%',
        color: theme.color.errorColor,
        backgroundColor: 'white',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    line: {
        width: '100%',
        height: 8,
        backgroundColor: theme.color.backgroundColorSecondary,
        marginVertical: Dimensions.Spacing.small
    },
})