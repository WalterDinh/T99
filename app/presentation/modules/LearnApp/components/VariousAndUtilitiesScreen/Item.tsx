import { ImageStyle, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { ImageRenderer, TextPrimary } from 'app/presentation/components'
import Img from '../../../../../assets/images'
import { Dimensions, theme } from 'app/presentation/theme';

interface Iprops {
    source: any;
    text: string;
    styleBtn?: StyleProp<ViewStyle>;
    styleText?: StyleProp<ViewStyle>;
    styleIcon?: StyleProp<ImageStyle>;
    onPress?: () => void;
    disabled?: boolean
}

export const Item = (props: Iprops) => {
    const {styleBtn, source, styleText, styleIcon, text, onPress, disabled} = props
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.item, styleBtn]}>
            <ImageRenderer source={source} style={[styles.icon, styleIcon]} />
            <TextPrimary style={[styles.text, styleText]}>{text}</TextPrimary>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1, 
        alignItems: 'center',
    },
    icon: {
        height: 40,
        width: 40,
    },
    text: {
        marginTop: Dimensions.Spacing.small,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.textColor,
    }
})