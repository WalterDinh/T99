import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Img from '../../../../assets/images'
import { ImageRenderer, TextPrimary } from 'app/presentation/components'
import { Dimensions, theme } from 'app/presentation/theme'
const CARD_WIDTH = (Dimensions.screenWidth() - 48) / 2


interface IProps {
    title: string;
    icon: number,
    background?: number;
    onPress: ()=> void;
}

export const HomeCardBlock = (props: IProps) => {
    const { title, icon, background, onPress } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground
                resizeMode='cover'
                style={styles.container}
                // imageStyle={styles.container}
                source={background || Img.HomeCard.Block}
            >
                <View style={styles.alignItemsCenter}>
                    <ImageRenderer source={icon} style={styles.icon} />
                    <TextPrimary style={styles.text}>{title}</TextPrimary>
                </View>
            </ImageBackground>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        aspectRatio: 163.5 / 106,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Dimensions.Spacing.larger,
        borderRadius: 16,
        shadowColor: theme.color.colorShadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5
    },
    icon: {
        height: 32,
        width: 32,
    },
    text: {
        marginTop: Dimensions.Spacing.medium,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.textColorVariant,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    alignItemsCenter:{
        alignItems: 'center',
    }
})