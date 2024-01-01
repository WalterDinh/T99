import { ImageBackground, StyleSheet, ImageBackgroundProps } from 'react-native'
import React from 'react'
import Img from '../../../assets/images'

interface IProps extends ImageBackgroundProps {
    children?: JSX.Element;
}
const BackgroundImage = (props: IProps) => {
    const { children, source, ...rest } = props
    return (
        <ImageBackground
            source={source || Img.Backgrounds.Background as any}
            resizeMode="stretch"
            style={{flex:1}}
            {...rest}
        >
            {children}
        </ImageBackground>
    )
}

export default BackgroundImage
