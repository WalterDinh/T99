import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
import Clipboard from '@react-native-community/clipboard';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
interface ICopyCommon {
    value?: string;
    style?: StyleProp<ViewStyle>
}
const CopyCommon = (props: ICopyCommon) => {
    //! State
    const { value, style } = props;
    //! Function

    const copyToClipboard = () => {
        Clipboard.setString(value!);
    };

    //! Render
    return (
        <View style={style} >
            <TextPrimary style={styles.title}>
                {' '}
                {getString('copyTheFollowingContent')}{' '}
            </TextPrimary>
            <View style={styles.content}>
                <TextPrimary>
                    {value || 'Tất toán hợp đồng_A3004563'}{' '}
                </TextPrimary>
                <TouchableOpacity
                    onPress={copyToClipboard}
                >
                    <ImageRenderer
                        style={styles.images}
                        source={Images.Icons.IconButton}
                    />
               </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: Dimensions.FontSize.small,
        lineHeight: Dimensions.moderateScale(16),
        textTransform: 'uppercase',
        color: neutral.black,
        fontFamily: theme.font.Medium,
        paddingVertical: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    content: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: neutral.s190,
        borderBottomWidth: 1,
        borderBottomColor: neutral.s190,
        paddingVertical: Dimensions.moderateScale(11),
        paddingHorizontal: Dimensions.moderateScale(22),
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        fontFamily: theme.font.Regular,
    },
    images: {
        height: Dimensions.moderateScale(24),
        width: Dimensions.moderateScale(24),
    },
});
export default CopyCommon;
