import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native'
import React from 'react'
import { Dimensions, theme } from 'app/presentation/theme';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';

const widthBlock = Math.floor((Dimensions.screenWidth() - Dimensions.moderateScale(64))/3);
interface Iprops {
    source: any;
    text: string;
    title: string;
    onPressBlock: () => void;
    styleBtn?: StyleProp<ViewStyle>;
    styleText?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<ViewStyle>;
    styleIcon?: StyleProp<ImageStyle>;
}
const width= (Dimensions.screenWidth()- Dimensions.moderateScale(110))/4

export const Item = (props: Iprops) => {
    const { onPressBlock, styleBtn, source, styleText, styleTitle, styleIcon, text, title } = props
    return (
        <TouchableOpacity key={text} style={[styles.item, styleBtn]} onPress= {onPressBlock} >
            <ImageRenderer source={source} style={[styles.icon, styleIcon]} />
            <TextPrimary style={[styles.text, styleText]} >{text}</TextPrimary>
            <TextPrimary style={[styles.title, styleTitle]}>{title}</TextPrimary>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: theme.color.backgroundColorVariant,
        width: width,
        paddingHorizontal: Dimensions.Spacing.small,
        paddingVertical: Dimensions.Spacing.large,
        marginHorizontal: Dimensions.moderateScale(3),
        borderRadius: 4,
        alignItems:'center',
        shadowColor: theme.color.colorShadow,

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        elevation: 5,
    },
    icon: {
        height: 32,
        width: 32,
    },
    text: {
        marginTop: Dimensions.Spacing.extraLarge,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.disabledColor,
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.medium,
        color: theme.color.textColor,
    }
})