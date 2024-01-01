import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import InputForm from 'app/presentation/components/input/InputForm';
import InputPickerOnlyImg from 'app/presentation/components/input/InputPickerOnlyImg';
import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Field, Formik, FormikProps } from 'formik';
import React from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
interface Iprops extends FormikProps<any> {
    idx?: number;
}
export const AddPropertyComponent = (props: Iprops) => {
    const {idx} = props;
   
    return (
        <>
            <View style={styles.item}>
                <TextPrimary styel={styles.title}>
                    {getString('asset')} {(props?.idx || 0) + 1}{' '}
                </TextPrimary>
                <Field
                    name={`property[${idx}].propertyType`}
                    label={getString('propertyType')}
                    placeholder={getString('selectPropertyType')}
                    isRequire
                    component={DropdownInput}
                />
                <Field
                    name={`property[${idx}].assetGroup`}
                    label={getString('assetGroup')}
                    placeholder={getString('selectAssetGroup')}
                    isRequire
                    component={DropdownInput}
                />
                <Field
                    name={`property[${idx}].assetName`}
                    label={getString('assetName')}
                    placeholder={getString('enterAssetName')}
                    component={InputForm}
                />

                <Field
                    name={`property[${idx}].images.imgLeft`}
                    label={getString('picture')}
                    isRequire
                    component={InputPickerOnlyImg}
                    title='Ảnh mặt trái'
                />
                <Field
                    name={`property[${idx}].images.imgRight`}
                    isRequire
                    component={InputPickerOnlyImg}
                    title='Ảnh mặt phải'
                />
                <Field
                    name={`property[${idx}].images.number`}
                    isRequire
                    component={InputPickerOnlyImg}
                    title='Ảnh biển số'
                />
                <Field
                    name={`property[${idx}].images.imgVehicleRegistrationCertificate`}
                    isRequire
                    component={InputPickerOnlyImg}
                    title='Chứng nhận đăng ký xe'
                />
            </View>
            {(props?.idx || 0) > 0 && (
                <TouchableOpacity
                    onPress={() => 
                        props.setFieldValue(
                            'property',
                            props.values.property.filter((e: any, index: number) => props.idx !== index),
                        )
                    }
                    style={styles.closePicture}
                >
                    <ImageRenderer
                        style={{ height: '100%', width: '100%' }}
                        source={Images.Icons.Close}
                    />
                </TouchableOpacity>
            )}
        </>
    );
};
const AddProperty = () => {
    //! State
    //! Function
    const handleSubmit = () => {
        Alert.alert('Dimensions.Spacing.medium3');
    };
    //! Render
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                property: [
                    {
                        propertyType: '',
                        assetGroup: '',
                        assetName: '',
                        images: {
                            imgLeft: '',
                            imgRight: '',
                            number: '',
                            imgVehicleRegistrationCertificate: '',
                        },
                    },
                ],
            }}
            // validationSchema={ConfirmationOfResidenceSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
        >
            {(propsFormik) => {
                return (
                    <View style={styles.container}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={propsFormik?.values?.property || []}
                            renderItem={({ item, index }) => (
                                <AddPropertyComponent
                                    idx={index}
                                    {...propsFormik}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => {
                                return (
                                    <>
                                        <AppButton
                                            iconLeft={Images.Icons.AddOutlined}
                                            onPress={() => {
                                                propsFormik.setFieldValue('property', [
                                                    ...propsFormik.values.property,
                                                    {
                                                        propertyType: '',
                                                        assetGroup: '',
                                                        assetName: '',
                                                        images: {
                                                            imgLeft: '',
                                                            imgRight: '',
                                                            number: '',
                                                            imgVehicleRegistrationCertificate: '',
                                                        },
                                                    },
                                                ]);
                                            }}
                                            styleBtn={styles.btnAddProperty}
                                            name={getString('addAsset')}
                                            type={ButtonType.SquareBorderRed}
                                        />
                                        <AppButton
                                            onPress={() => Alert.alert('alert alert alert alert!!')}
                                            styleBtn={styles.btnSubmit}
                                            name={getString('confirm')}
                                        />
                                    </>
                                )
                            }}
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
        paddingHorizontal: Dimensions.Spacing.large,
    },
    item: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.small,
        marginTop: Dimensions.Spacing.medium,
    },
    title: {
        fontSize: Dimensions.Spacing.medium,
        lineHeight: Dimensions.Spacing.large,
        textTransform: 'uppercase',
        color: neutral.black,
        fontFamily: theme.font.Regular,
    },
    btnSubmit: { marginBottom: Dimensions.moderateScale(48) },
    btnAddProperty: {
        marginBottom: Dimensions.Spacing.extraHuge,
        marginTop: Dimensions.Spacing.large,
    },
    closePicture: {
        position: 'absolute',
        right: 0,
        marginTop: Dimensions.Spacing.medium,
        top: 0,
        backgroundColor: neutral.s150,
        height: Dimensions.moderateScale(22.22),
        width: Dimensions.moderateScale(22.22),
        borderBottomLeftRadius: Dimensions.Spacing.tiny,
    },
});
export default AddProperty;
