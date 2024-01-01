import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { danger, neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const AlertFamilyRegister = () => {
    return (
        <View style={styles.container}>
            <ImageRenderer style={styles.img} source={Images.Icons.vector2} />
            <View style={styles.content}>
                <TextPrimary style={styles.note}>
                    {getString('mind')}
                </TextPrimary>
                <TextPrimary style={styles.notice} >
                    {getString('pleaseAddFamilyRegister')}
                </TextPrimary>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(249, 65, 52, 0.05)',
        borderRadius: Dimensions.Spacing.small,
        paddingVertical: Dimensions.Spacing.medium,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Dimensions.moderateScale(14.25),
        marginBottom: Dimensions.Spacing.small
    },
    img: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
    content: {
        marginLeft: 11
    },
    note: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        lineHeight: Dimensions.moderateScale(22),
        color: danger.brand,
    },
    notice: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        color: neutral.s400,
    }
});
export default AlertFamilyRegister;
