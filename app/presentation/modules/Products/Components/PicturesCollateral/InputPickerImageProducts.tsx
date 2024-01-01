import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { ChoseImageOptionsModal } from 'app/presentation/components/modal/ChoseImageOptionsModal';
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
// import ImageRenderer from '../image/ImageRenderer';
// import { ChoseImageOptionsModal } from '../modal/ChoseImageOptionsModal';
// import TextPrimary from '../text/TextPrimary';
import { IAppInputProps } from 'app/presentation/components/input/Input';
import { resizeImage } from 'app/presentation/helper/ReduceImageSize';

interface IInputPickerOnlyImgProps extends IAppInputProps, FieldProps {
    placeholder?: string;
    value?: string;
    errorMessage?: string;
    onPress?: () => void;
    style?: any;
    textStyle?: any;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<TextStyle>;
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
        containerStyle,
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
            .then(async (img) => {
                try {
                    const resizeImagePath: any = await resizeImage(
                        `file://${img.path}`,
                    );
                    setFieldValue(name, {
                        uri: `file://${resizeImagePath.path}`,
                    });
                } catch (error) {}
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
            .then(async (img) => {
                try {
                    const resizeImagePath: any = await resizeImage(
                        `file://${img.path}`,
                    );
                    setFieldValue(name, {
                        uri: `file://${resizeImagePath.path}`,
                    });
                } catch (error) {}
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };

    //! Render
    return (
        <View style={[styles.container, containerStyle]}>
            {typeof label === 'string' && (
                <TextPrimary
                    style={[styles.label, labelStyle]}
                    numberOfLines={2}
                >
                    {label}{' '}
                    {isRequire && (
                        <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                    )}
                </TextPrimary>
            )}
            <View style={styles.itemAddImg}>
                <TouchableOpacity
                    style={styles.contentImg}
                    onPress={onShowModal}
                >
                    <ImageRenderer
                        resizeMode="cover"
                        style={selectedImg ? styles.selectedImg : styles.image}
                        source={
                            selectedImg
                                ? selectedImg
                                : Images.Icons.UploadImgIcon
                        }
                    />
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
    container: {
        alignItems: 'center',
    },
    itemAddImg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Dimensions.Spacing.small,
    },
    label: {
        fontSize: Dimensions.moderateScale(16),
        color: neutral.black,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.Spacing.large,
        textAlign: 'center',
        minHeight: Dimensions.Spacing.giant,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 16,
        width: 20,
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
