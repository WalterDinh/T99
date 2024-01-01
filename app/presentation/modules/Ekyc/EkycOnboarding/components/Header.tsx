import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dimensions from 'app/presentation/theme/Dimensions';
import { theme } from 'app/presentation/theme';
import {
    BackgroundImage,
    ImageRenderer,
    TextPrimary,
} from 'app/presentation/components';
import Images from 'app/assets/images/index';
import { getString } from 'app/presentation/localization';

const BannerHeader = () => {
    return (
        <BackgroundImage
            resizeMode="cover"
            source={Images.Headers.EkycHeader}
            style={styles.image}
        >
            <View
                style={{
                    alignItems: 'center',
                    paddingHorizontal: Dimensions.moderateScale(32),
                }}
            >
                <ImageRenderer
                    resizeMode="contain"
                    style={styles.icon}
                    source={Images.Icons.EkycInActive}
                />
                <TextPrimary style={styles.title}>
                    {getString('notVerificationAccount')}
                </TextPrimary>
                <TextPrimary style={styles.label}>
                    {getString('pleasePerformVerificationByFollow')}
                </TextPrimary>
            </View>
        </BackgroundImage>
    );
};

export default React.memo(BannerHeader);

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.font.Bold,
        color: '#fff',
        fontSize: Dimensions.FontSize.extraExtraLarge,
        paddingTop: Dimensions.moderateScale(24),
        textAlign: 'center',
    },
    label: {
        color: '#fff',
        fontSize: Dimensions.FontSize.large,
        paddingBottom: 32,
        paddingTop: 12,
    },
    image: {
        width: Dimensions.screenWidth(),
        height: Dimensions.screenHeight()*0.4,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        width: Dimensions.moderateScale(64),
        height: Dimensions.moderateScale(64),
    },
    dot: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.color.colorFourth,
    },
});
