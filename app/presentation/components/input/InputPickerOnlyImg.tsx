import { getString } from 'app/presentation/localization';
import AlertFamilyRegister from 'app/presentation/modules/InformationVerification/AlertFamilyRegister';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { ErrorMessage, FieldProps } from 'formik';
import React, { useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components';
import ImageRenderer from '../image/ImageRenderer';
import { ChoseImageOptionsModal } from '../modal/ChoseImageOptionsModal';
import TextPrimary from '../text/TextPrimary';
import { IProps } from './Input';

interface IInputPickerOnlyImgProps extends IProps, FieldProps {
    placeholder?: string;
    value?: string;
    errorMessage?: string;
    onPress?: () => void;
    style?: any;
    textStyle?: any;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    isRequire?: boolean;
    name?: string;
    isShowAlert?: boolean;
    dataTitle?: [];
    // field?: FieldInputProps<V>;
    // form?: FormikProps<FormValues>;
    // meta?: FieldMetaProps<V>;
    title?: string;
}

const InputPickerOnlyImg = (props: IInputPickerOnlyImgProps) => {
    const {
        errorMessage,
        label,
        labelStyle,
        isRequire,
        field,
        form,
        isShowAlert,
        title,
    } = props;
    const [openModalImageOption, setOpenModalImageOption] = useState(false);
    const { name, value: fieldValue } = field || {};
    const selectedImg = fieldValue;

    const { errors, touched, setFieldValue, values } = form || {};

    const isForcus = !!touched?.[name];
    const isErrors = errors?.[name];
    const errorMsg = errorMessage || (errors?.[name] as string);
    //! Function

    const onShowModal = () => {
        setOpenModalImageOption(true);
    };
    const onHideModal = () => {
        setOpenModalImageOption(false);
    };
    const onPressTakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'photo',
        })
            .then((img) => {
                setFieldValue(name, { uri: img?.path });
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };

    const onPressTakeLibrary = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'photo',
        })
            .then((image) => {
                setFieldValue(name, { uri: image?.path });
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };

    //! Render
    return (
        <View>
            {typeof label === 'string' && (
                <TextPrimary style={[styles.label, labelStyle]}>
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
            {isShowAlert && <AlertFamilyRegister />}

            <View style={styles.itemAddImg}>
                <View style={styles.contentItemAddImg}>
                    <ImageRenderer
                        style={styles.imgItem}
                        source={
                            selectedImg
                                ? Images.Icons.vector3
                                : Images.Icons.CircleOutlined
                        }
                    />
                    <TextPrimary style={styles.titleItem}>{title}</TextPrimary>
                </View>
                <TouchableOpacity
                    style={styles.contentImg}
                    onPress={onShowModal}
                >
                    <ImageRenderer
                        resizeMode="cover"
                        style={selectedImg ? styles.selectedImg : styles.image}
                        source={
                            selectedImg ? selectedImg : Images.Icons.AddOutlined
                        }
                    />

                    {selectedImg ? undefined : (
                        <TextPrimary style={styles.title}>
                            {getString('addPicture')}
                        </TextPrimary>
                    )}
                    {selectedImg ? (
                        <TouchableOpacity
                            onPress={() => {
                                setFieldValue(name, '');
                            }}
                            style={styles.closePicture}
                        >
                            <ImageRenderer source={Images.Icons.Close} />
                        </TouchableOpacity>
                    ) : undefined}
                </TouchableOpacity>
            </View>

            <ErrorMessage name={name}>
                {(message: string) => <ErrorText>{message}</ErrorText>}
            </ErrorMessage>

            <ChoseImageOptionsModal
                onHideModal={onHideModal}
                onPressTakePhoto={onPressTakePhoto}
                onPressTakeLibrary={onPressTakeLibrary}
                onShowModal={onShowModal}
                isVisible={openModalImageOption}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    titleItem: {
        marginLeft: Dimensions.moderateScale(11.25),
        fontSize: Dimensions.FontSize.medium,
        fontFamily: theme.font.Bold,
        color: '#000000',
        flex: 1,
    },
    imgItem: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
    contentItemAddImg: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    itemAddImg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Dimensions.Spacing.small,
    },
    label: {
        fontSize: Dimensions.FontSize.medium,
        lineHeight: Dimensions.moderateScale(18),
        color: neutral.s400,
        fontFamily: theme.font.Bold,
        marginBottom: Dimensions.Spacing.small,
    },
    selectedImg: {
        height: '100%',
        width: '100%',
        borderRadius: Dimensions.Spacing.tiny,
    },
    contentImg: {
        width: Dimensions.moderateScale(100),
        height: Dimensions.moderateScale(100),
        borderRadius: Dimensions.Spacing.tiny,
        backgroundColor: neutral.s175,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
    title: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: theme.font.Regular,
        color: neutral.s400,
        paddingTop: Dimensions.moderateScale(14),
    },
    closePicture: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: neutral.s150,
        height: Dimensions.moderateScale(22.22),
        width: Dimensions.moderateScale(22.22),
        borderBottomLeftRadius: Dimensions.Spacing.tiny,
    },
});
const ErrorText = styled(TextPrimary)`
    color: ${theme.color.errorColor};
    margin-top: ${Dimensions.Spacing.tiny};
`;

export default InputPickerOnlyImg;
