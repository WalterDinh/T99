import images from 'app/assets/images';
import {
    BackgroundImage,
    TextPrimary,
} from 'app/presentation/components';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components';
const height = Dimensions.screenHeight();
const width = Dimensions.screenWidth();

const CarouselCardItem = ({ item, index }: any) => {
    return (
        <BackgroundImage source={item.imgUrl} style={{ height: height }} resizeMode='cover'>
            <View style={styles.container}>
                <View style={styles.formBody}>
                    <View style={styles.formT99}>
                        <ImageIconCircle
                            style={styles.imageT99}
                            source={images.Icons.t99}
                        />
                    </View>
                    <TextPrimary style={styles.styleText}>
                        {item.body}
                    </TextPrimary>
                </View>
            </View>
        </BackgroundImage>
    );
};
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formBody: {
        position: 'absolute',
        bottom: height * 0.52,
        marginHorizontal: Dimensions.moderateScale(46),
    },
    formT99: {
        alignItems: 'center',
        marginBottom: Dimensions.moderateScale(16),
    },
    imageT99: {
        maxWidth: Dimensions.moderateScale(187),
        height: Dimensions.moderateScale(60),
    },
    styleImageBackground: {
        maxWidth: width,
        height: height,
        resizeMode: 'cover',
    },
    styleText: {
        color: Colors.neutral.white,
        textAlign: 'center',
        fontFamily: theme.font.Bold,
        lineHeight: Dimensions.moderateScale(18),
        fontSize: Dimensions.moderateScale(12),
    },
    formLogin: {
        top: height * 0.44,
    },
    formFooter: {
        top: height * 0.73,
        position: 'absolute',
    },
});

export default CarouselCardItem;
