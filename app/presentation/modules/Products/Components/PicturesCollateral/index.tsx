import ListAssetPictureModel from 'app/models/loan/ListAssetPictureModel';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import OrganizationInput from 'app/presentation/components/organization';
import { getString } from 'app/presentation/localization';
import { Dimensions, theme } from 'app/presentation/theme';
import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputPickerImageProducts from './InputPickerImageProducts';
import { moderateScale } from 'react-native-size-matters';
import { AssetType } from 'app/shared/constants';

interface IProps {
    initValues?: any;
    onSubmit: (values: object) => void;
    validationSchema?: object;
    dataList: ListAssetPictureModel[];
    groupAssetType?: AssetType;
}
const widthBlock = Math.floor(
    (Dimensions.screenWidth() - moderateScale(44) - moderateScale(16)) / 2,
);

const PicturesCollateral = (props: IProps) => {
    const { onSubmit, initValues, validationSchema, dataList, groupAssetType } =
        props;
    return (
        <Formik
            initialValues={
                initValues || {
                    province: { key: '', label: '' },
                    district: { key: '', label: '' },
                    images0: { uri: '' },
                    images1: { uri: '' },
                    images2: { uri: '' },
                    images3: { uri: '' },
                }
            }
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
            validateOnMount={false}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, values }) => {
                return (
                    <>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                {groupAssetType === AssetType.RealEstate && (
                                    <OrganizationInput
                                        provinceKey="province"
                                        districtKey="district"
                                        provinceInit={values?.province}
                                        districtInit={values?.district}
                                    />
                                )}

                                <TextPrimary
                                    style={styles.titlePropertyPictures}
                                >
                                    {getString('propertyPictures')}
                                    <TextPrimary style={{ color: 'red' }}>
                                        {' '}
                                        *
                                    </TextPrimary>
                                </TextPrimary>
                                <TextPrimary
                                    style={styles.noticePropertyPictures}
                                >
                                    {getString('notice') +
                                        getString(
                                            'pleaseUploadClearCorrectPhotos',
                                        )}
                                </TextPrimary>
                                <View style={styles.inputPickerImage}>
                                    {dataList.map((item, index) => {
                                        return (
                                            <Field
                                                name={`images${index}`}
                                                label={item.label}
                                                component={
                                                    InputPickerImageProducts
                                                }
                                                containerStyle={
                                                    styles.inputPickerImageBlock
                                                }
                                            />
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                        <AppButton
                            disabled={dataList.length === 0}
                            onPress={handleSubmit}
                            styleBtn={styles.btnStyle}
                            name={getString('continue')}
                            type={
                                dataList.length > 0
                                    ? undefined
                                    : ButtonType.CircleGray
                            }
                        />
                    </>
                );
            }}
        </Formik>
    );
};

export default PicturesCollateral;

const styles = StyleSheet.create({
    process: {
        marginTop: -8,
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
    titlePropertyPictures: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingVertical: Dimensions.Spacing.small,
    },
    noticePropertyPictures: {
        color: theme.color.textColorSecondaryVariant,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.medium,
        fontStyle: 'italic',
        marginBottom: Dimensions.Spacing.extraLarge,
    },
    errorGender: {
        marginHorizontal: 5,
        width: '100%',
        color: theme.color.errorColor,
        backgroundColor: 'white',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
    },
    viewDropdown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Dimensions.Spacing.small,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
    rowPictures: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.Spacing.small,
    },
    inputPickerImageBlock: {
        width: widthBlock,
        marginBottom: Dimensions.moderateScale(64),
    },
    inputPickerImage: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
