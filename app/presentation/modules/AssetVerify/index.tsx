import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Yup from 'yup';

const AssetVerify = () => {
    const AssetVerifySchema = Yup.object().shape({
        assetArray: Yup.array().of(
            Yup.object({
                propertyType: Yup.string().required(
                    getString('thisFieldRequired'),
                ),
                propertyName: Yup.string().required(
                    getString('thisFieldRequired'),
                ),
                brand: Yup.string().required(getString('thisFieldRequired')),
            }),
        ),
    });
    //! State

    //! Function
    const onSubmit = () => {
        Alert.alert('Asset Verify');
    };

    const handleCloseIcon = (
        index: Number,
        setFieldValue: (field: string, value: any) => void,
        assetArray: {
            propertyType: string;
            propertyName: string;
            brand: string;
        }[],
    ) => {
        setFieldValue(
            'assetArray',
            assetArray.filter((e, idx) => index !== idx),
        );
    };

    const CloseButton = ({
        handleCloseIcon,
    }: {
        handleCloseIcon: () => void;
    }) => {
        return (
            <TouchableOpacity
                style={styles.closeIcon}
                onPress={handleCloseIcon}
            >
                <ImageRenderer source={Images.Icons.CloseFilled} />
            </TouchableOpacity>
        );
    };

    //! Render
    return (
        <Formik
            // innerRef={refFormik}
            initialValues={{
                assetArray: [
                    {
                        propertyType: '',
                        propertyName: '',
                        brand: '',
                    },
                ],
            }}
            validationSchema={AssetVerifySchema}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, isValid, setFieldValue }) => {
                return (
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.scroll}>
                                    <TextPrimary style={styles.title}>
                                        {getString('propertyInformation')}
                                    </TextPrimary>

                                    {(values.assetArray || []).map(
                                        (item, index) => {
                                            return (
                                                <View>
                                                    {index > 0 && (
                                                        <CloseButton
                                                            handleCloseIcon={() =>
                                                                handleCloseIcon(
                                                                    index,
                                                                    setFieldValue,
                                                                    values.assetArray,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    <Field
                                                        name={`assetArray[${index}].propertyType`}
                                                        label={getString(
                                                            'propertyType',
                                                        )}
                                                        isRequire
                                                        placeholder={getString(
                                                            'propertyType',
                                                        )}
                                                        component={
                                                            DropdownInput
                                                        }
                                                        onPress={() =>
                                                            Alert.alert('12')
                                                        }
                                                        value={
                                                            item.propertyType
                                                        }
                                                    />

                                                    <Field
                                                        name={`assetArray[${index}].propertyName`}
                                                        label={getString(
                                                            'propertyName',
                                                        )}
                                                        isRequire
                                                        placeholder={getString(
                                                            'propertyName',
                                                        )}
                                                        component={
                                                            DropdownInput
                                                        }
                                                        onPress={() =>
                                                            Alert.alert('12')
                                                        }
                                                        value={
                                                            item.propertyName
                                                        }
                                                    />
                                                    <Field
                                                        name={`assetArray[${index}].brand`}
                                                        label={getString(
                                                            'brand',
                                                        )}
                                                        isRequire
                                                        placeholder={getString(
                                                            'brand',
                                                        )}
                                                        component={
                                                            DropdownInput
                                                        }
                                                        onPress={() =>
                                                            Alert.alert('12')
                                                        }
                                                        value={item.brand}
                                                    />
                                                </View>
                                            );
                                        },
                                    )}
                                </View>
                                <AppButton
                                    onPress={() => {
                                        setFieldValue(
                                            'assetsArray',
                                            values.assetArray.push({
                                                propertyType: '',
                                                propertyName: '',
                                                brand: '',
                                            }),
                                        );
                                    }}
                                    iconRight={Images.Icons.AddOutlined}
                                    name={getString('addAsset')}
                                    type={ButtonType.SquareGraySecondary}
                                />
                            </ScrollView>
                        </View>

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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.moderateScale(108),
        paddingTop: Dimensions.Spacing.large,
    },
    content: { marginBottom: Dimensions.Spacing.large, flex: 1 },
    title: {
        color: neutral.black,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.moderateScale(14),
    },
    scroll: {
        marginBottom: Dimensions.Spacing.large,
    },
    closeIcon: {
        height: Dimensions.Spacing.larger,
        width: Dimensions.Spacing.larger,
        alignSelf: 'flex-end',
    },
});
export default AssetVerify;
