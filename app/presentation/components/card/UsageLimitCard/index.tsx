import { ImageStyle, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import ImageRenderer from '../../image/ImageRenderer'
import Img from 'app/assets/images'
import TextPrimary from '../../text/TextPrimary'
import BackgroundImage from '../../backgroundimage/BackgroundImage'
import { Dimensions, theme } from 'app/presentation/theme'
import { getString } from 'app/presentation/localization'

interface Iprops {
    title: string,
    subtitle: string,
    time?: string,
    name?: string,
    styleContainer?: StyleProp<ViewStyle>,
    styleTitle?: StyleProp<TextStyle>,
    styleSubTitle?: StyleProp<TextStyle>,
    styleTime?: StyleProp<TextStyle>,
    styleName?: StyleProp<TextStyle>,
    styleLogo?: StyleProp<ImageStyle>,

}
export const UsageLimitCard = (props: Iprops) => {
    const { title, subtitle, time, name, styleContainer, styleTitle, styleSubTitle, styleTime, styleName, styleLogo } = props
    return (
        <BackgroundImage
            style={[styles.container, styleContainer]}
            source={Img.Backgrounds.UsageLitmitCard} >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                <ImageRenderer source={Img.Icons.t99} style={[styles.logo, styleLogo]} />
                <TextPrimary style={[styles.title, styleTitle]}>{title}</TextPrimary>
                <TextPrimary style={[styles.subtitle, styleSubTitle]}>{subtitle}</TextPrimary>
                <TextPrimary style={[styles.time, styleTime]}>{!!time && getString('timeOut') + ': ' + time}</TextPrimary>
                </View>
                <TextPrimary style={[styles.name, styleName]}>{name}</TextPrimary>
            </View>
        </BackgroundImage>
    )
}

export default UsageLimitCard

const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        padding: Dimensions.Spacing.extraLarge,
        borderRadius: 24,

        shadowColor: theme.color.colorSecondary,

        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        elevation: 5,
    },
    title: {
        color: theme.color.textColorVariant,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
    },
    subtitle: {
        color: theme.color.textColorVariant,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge
    },
    time: {
        color: theme.color.textColorVariant,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        marginTop: Dimensions.Spacing.medium,
    },
    name: {
        color: theme.color.textColorVariant,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.small,
        marginBottom: Dimensions.Spacing.small,
    },
    logo: {
        position: 'absolute',
        top: -4,
        right: 0,
        width: 64,
        height: 21,
    },
})