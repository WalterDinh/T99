import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { primary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

interface IProps {
    onPressFacebook?: () => void;
    onPressYoutube?: () => void;
}
const FormMedia = (props: IProps) => {
    const { onPressFacebook, onPressYoutube } = props;
    return (
        <View >
            <TextPrimary style={styles.title}>
                        {getString('mediaChannel')}
                    </TextPrimary>
            <View style={styles.formChanel}>
                <TouchableOpacity
                    style={styles.formImage}
                    onPress={onPressFacebook}
                >
                    <ImageIconCircle
                        style={{  width: Dimensions.moderateScale(35), height: Dimensions.moderateScale(35) }}
                        source={images.Icons.Facebook}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.formImage,
                        { marginLeft: Dimensions.moderateScale(16) },
                    ]}
                    onPress={onPressYoutube}
                >
                    <ImageIconCircle
                        style={{ width: Dimensions.moderateScale(35), height: Dimensions.moderateScale(35) }}
                        source={images.Icons.youtube}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormMedia;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formMedia: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Dimensions.moderateScale(12),
    },
    textMedia: {
        paddingLeft: 10,
        fontSize: Dimensions.moderateScale(26),
        lineHeight: Dimensions.moderateScale(30),
        fontWeight: '500',
    },
    formChanel: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    formImage: {
        backgroundColor: Colors.neutral.grayScale,
        width: Dimensions.moderateScale(60),
        height: Dimensions.moderateScale(60),
        borderRadius: Dimensions.moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.moderateScale(18),
        color: primary.brand,
        marginBottom: Dimensions.moderateScale(15),
    },
});
