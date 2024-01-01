import { TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import InputForm from 'app/presentation/components/input/InputForm';
import OrganizationInput from 'app/presentation/components/organization';
import FormCheckBox from 'app/presentation/components/radioBox/FormCheckBox';
import { getString } from 'app/presentation/localization';
import { Dimensions, theme } from 'app/presentation/theme';
import { DateTimeFormat, ProductsType } from 'app/shared/constants';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import TimeUtils from 'app/shared/helper/TimeUtils';
import { useCheckVerify } from 'app/presentation/hooks/useCheckVerify';
interface PropsItem {
    type: ProductsType;
    initValues: any;
    onSubmit: (values: object) => void;
    validateSchema?: any;
}
export const dataDocument = [
    { key: 2, label: 'Chứng minh nhân dân', code: 'CMND' },
    { key: 4, label: 'Căn cước công dân', code: 'CCCD' },
    { key: 3, label: 'Hộ chiếu', code: 'Passpost' },
];

const InfoUser = (props: PropsItem) => {
    const { isEkyc } = useCheckVerify();

    const { onSubmit, type, initValues, validateSchema } = props;
    const [dataInitValues, setInitValues] = useState({
        fullName: '',
        gender: -1,
        dateOfBirth: '',
        phoneNumber: '',
        documentType: '',
        documentCode: '',
        email: '',
        province: '',
        district: '',
        ward: '',
        detailedAddress: '',
    });

    useEffect(() => {
        setInitValues(initValues);
    }, [initValues]);
    return (
        <Formik
            initialValues={dataInitValues}
            enableReinitialize
            initialTouched={{
                fullName: true,
                phoneNumber: true,
                documentCode: true,
                email: true,
                dateOfBirth: true,
                detailedAddress: true,
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
                            <Field
                                name="fullName"
                                label={
                                    type === ProductsType.Golfer
                                        ? getString('golfAccountHolde')
                                        : getString('fullname')
                                }
                                isRequire
                                placeholder={getString('enterFullname')}
                                component={InputForm}
                                value={values.fullName}
                                disabled={!!initValues?.fullName && isEkyc}
                                inputContainerStyle={{ paddingBottom: 0 }}
                            />
                            <View>
                                <TextPrimary style={styles.titleGender}>
                                    {getString('gender')}
                                    <Text style={{ color: 'red' }}> *</Text>
                                </TextPrimary>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingTop: Dimensions.Spacing.small,
                                    }}
                                >
                                    <Field
                                        name="gender"
                                        title={getString('female')}
                                        isRequire
                                        placeholder={getString('gender')}
                                        component={FormCheckBox}
                                        value={values.gender === 0}
                                        disabled={
                                            initValues?.gender == 1 ||
                                            initValues?.gender == 0
                                        }
                                        onChange={() => {
                                            setFieldValue('gender', 0);
                                            if (values.gender === 0) {
                                                setFieldValue('gender', -1);
                                            }
                                        }}
                                        styleContainer={{
                                            marginRight:
                                                Dimensions.Spacing.tiny,
                                        }}
                                        styleText={{ width: 77 }}
                                    />
                                    <Field
                                        name="gender"
                                        isRequire
                                        disabled={
                                            initValues?.gender == 1 ||
                                            initValues?.gender == 0
                                        }
                                        value={values.gender === 1}
                                        onChange={() => {
                                            setFieldValue('gender', 1);
                                            if (values.gender === 1) {
                                                setFieldValue('gender', -1);
                                            }
                                        }}
                                        placeholder={getString('gender')}
                                        component={FormCheckBox}
                                        title={getString('male')}
                                        style={{ paddingBottom: 0 }}
                                    />
                                </View>
                                {errors.gender && (
                                    <TextPrimary style={styles.errorGender}>
                                        {errors.gender}
                                    </TextPrimary>
                                )}
                            </View>
                            <Field
                                name="dateOfBirth"
                                label={getString('dateOfBirth')}
                                isRequire
                                placeholder={getString('dateOfBirth')}
                                component={InputDatePicker}
                                onPress={(date: Date) => {
                                    setFieldValue(
                                        'dateOfBirth',
                                        dayjs(date).format(
                                            DateTimeFormat.APIFormat,
                                        ),
                                    );
                                }}
                                value={
                                    dayjs(values.dateOfBirth).isValid()
                                        ? TimeUtils.formatForwardSlashDate(
                                              dayjs(values.dateOfBirth),
                                          )
                                        : values.dateOfBirth
                                }
                                inputContainerStyle={{ paddingBottom: 0 }}
                                disabled={!!initValues?.dateOfBirth && isEkyc}
                                maximumDate={new Date()}
                            />
                            <Field
                                name="phoneNumber"
                                label={getString('phoneNumber')}
                                isRequire
                                placeholder={getString('enterPhoneNumber')}
                                component={InputForm}
                                keyboardType="numeric"
                                inputContainerStyle={{ paddingBottom: 0 }}
                                disabled={!!initValues?.phoneNumber && isEkyc}
                            />
                            <Field
                                name="documentType"
                                label={getString('documentType')}
                                isRequire
                                placeholder={getString('enterDocumentType')}
                                component={DropdownInput}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                data={dataDocument}
                                disabled={!!initValues?.documentCode && isEkyc}
                                style={{ paddingTop: 0 }}
                                keyboardType="numeric"
                            />
                            <Field
                                name="documentCode"
                                label={getString('documentCode')}
                                isRequire
                                placeholder={getString('enterDocumentCode')}
                                component={InputForm}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                disabled={!!initValues?.documentCode && isEkyc}
                            />
                            <Field
                                name="email"
                                label={getString('email')}
                                placeholder={getString('enterEmail')}
                                component={InputForm}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                disabled={!!initValues?.email && isEkyc}
                            />

                            {/* <Field
                                name="province"
                                label={getString(
                                    'province',
                                )}
                                isRequire
                                placeholder={getString('enterProvince')}
                                component={OrganizationInput}
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                provinceKey='province'

                            />

                            <Field
                                name="district"
                                label={getString(
                                    'district',
                                )}
                                isRequire
                                placeholder={getString('enterDistrict')}
                                component={OrganizationInput}
                                style={type !== ProductsType.Golfer && ({ paddingBottom: 0 })}
                                districtKey='district'

                            />

                            {type === ProductsType.Golfer || <Field
                                name="ward"
                                label={getString(
                                    'ward',
                                )}
                                isRequire
                                placeholder={getString('enterWard')}
                                component={OrganizationInput}
                                value={''}
                                inputContainerStyle={{ paddingBottom: 0 }}
                                wardKey='ward'

                            />} */}

                            <OrganizationInput
                                provinceKey="province"
                                districtKey="district"
                                wardKey="ward"
                                disabledWhenHasData={!!initValues?.province && isEkyc}
                                provinceInit={
                                    typeof values.province == 'object'
                                        ? values.province
                                        : null
                                }
                                districtInit={
                                    typeof values.district == 'object'
                                        ? values.district
                                        : null
                                }
                                wardInit={
                                    typeof values.ward == 'object'
                                        ? values.ward
                                        : null
                                }
                            />

                            <Field
                                name="detailedAddress"
                                label={
                                    type == ProductsType.Golfer
                                        ? getString('permanentAddress')
                                        : getString('detailedAddress')
                                }
                                isRequire
                                placeholder={getString('enterDetailedAddress')}
                                component={InputForm}
                                multiline
                                disabled={!!initValues?.detailedAddress && isEkyc}
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
    );
};

export default InfoUser;

const styles = StyleSheet.create({
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
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

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    modalView: {
        borderTopLeftRadius: Dimensions.Spacing.large,
        borderTopRightRadius: Dimensions.Spacing.large,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingTop: Dimensions.Spacing.medium,
        paddingBottom: Dimensions.bottomPadding,
    },
});
