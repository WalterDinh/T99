import Images from 'app/assets/images';
import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components';
import { AnyMessageParams } from 'yup/lib/types';
import ImageRenderer from '../image/ImageRenderer';
import { ChoseImageOptionsModal } from '../modal/ChoseImageOptionsModal';
import TextPrimary from '../text/TextPrimary';
interface IDocumentPickerCommon {
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => void;
    assetArray: Array<any>;
    name: string;
}
const DocumentPickerCommon = (props: IDocumentPickerCommon) => {
    //! State
    const { assetArray = [], setFieldValue, name } = props;
    const [openModalImageOption, setOpenModalImageOption] = useState(false);

    const Img = styled.TouchableOpacity`
        width: 100px;
        height: 100px;
        border-radius: 4px;
        background-color: ${neutral.s175};
        justify-content: center;
        align-items: center;
    `;
    //! Function
    const onPressTakePhoto = () => {
        ImagePicker.openCamera({
            multiple: true,
            mediaType: 'photo'
        })
            .then((img) => {  
                setFieldValue && setFieldValue(name, [...assetArray, img]);
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };

    const onPressTakeLibrary = async () => {
        ImagePicker.openPicker({
            multiple: true,
            compressImageQuality: 0.5,
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'photo'
        })
            .then((image) => {
                setFieldValue && setFieldValue(name, [...assetArray, ...image]);
            })
            .finally(() => {
                setOpenModalImageOption(false);
            });
    };
    const onShowModal = () => {
        setOpenModalImageOption(true);
    };
    const onHideModal = () => {
        setOpenModalImageOption(false);
    };

    const hanleClosePicture = (index: number) => {
        props?.setFieldValue &&
            props?.setFieldValue(
                name,
                assetArray.filter((e, idx) => index !== idx),
            );
    };
    //! Render
    return (
        <>
            <View style={styles.listImg}>
                {assetArray &&
                    (assetArray || []).map(
                        (elm: AnyMessageParams, index: number) => {
                            const isLastItem = (index + 1) % 3 == 0;
                            return (
                                <View
                                    style={[
                                        styles.imgPicture,
                                        { marginRight: isLastItem ? 0 : 4 },
                                    ]}
                                >
                                    <ImageRenderer
                                        style={styles.imgPictureBg}
                                        source={{ uri: elm?.path }}
                                        resizeMode={'cover'}
                                    />
                                    <TouchableOpacity
                                        onPress={() => hanleClosePicture(index)}
                                        style={styles.closePicture}
                                    >
                                        <ImageRenderer
                                            source={Images.Icons.Close}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        },
                    )}
            </View>
            <Img onPress={onShowModal}>
                <ImageRenderer
                    style={styles.image}
                    source={Images.Icons.AddOutlined}
                />
                <TextPrimary style={styles.title}>
                    {getString('addPicture')}
                </TextPrimary>
            </Img>

            <ChoseImageOptionsModal
                onHideModal={onHideModal}
                onPressTakePhoto={onPressTakePhoto}
                onPressTakeLibrary={onPressTakeLibrary}
                onShowModal={onShowModal}
                isVisible={openModalImageOption}
            />
        </>
    );
};
const styles = StyleSheet.create({
    listImg: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imgPicture: {
        width: (Dimensions.screenWidth() - Dimensions.moderateScale(52)) / 3,
        height: Dimensions.moderateScale(100),
        backgroundColor: neutral.s175,
        marginBottom: Dimensions.Spacing.small,
    },
    imgPictureBg: {
        borderRadius: Dimensions.Spacing.tiny,
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
        backgroundColor: neutral.s150,
        height: Dimensions.moderateScale(22.22),
        width: Dimensions.moderateScale(22.22),
        borderBottomLeftRadius: Dimensions.Spacing.tiny,
    },
});
export default DocumentPickerCommon;
