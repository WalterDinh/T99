import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { applyOpacity, neutral, warning } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { HOTLINE } from 'app/shared/constants';
import { LinkingHelper } from 'app/shared/helper';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
const AlertSetting = () => {
    return (
        <View style={styles.container}>
            <ImageRenderer style={styles.image} source={Images.Icons.vector} />
            <View style={styles.content}>
                <TextPrimary style={styles.title}>{getString('mind')}</TextPrimary>
                <TextPrimary style={styles.subtitle}>
                    {getString('contactTheSwitchboard')}{' '}
                    <TextPrimary onPress={()=>{LinkingHelper.phoneCall(HOTLINE)}} style={styles.number}>
                        {getString('hotline')}
                    </TextPrimary>{' '}
                    {getString('orGoToTheNearestTransactionOfficeOfT99')}
                </TextPrimary>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.Spacing.medium,
        paddingHorizontal: Dimensions.Spacing.medium,
        backgroundColor: applyOpacity('#FFF1B8', 0.2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: Dimensions.Spacing.small,
    },
    image: {
        width: Dimensions.moderateScale(18.75),
        height: Dimensions.moderateScale(18.75),
        marginRight: Dimensions.moderateScale(8),
        color: warning.brand,
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Medium,
        paddingBottom: Dimensions.Spacing.tiny,
    },
    content: {
        flex: 1,
    },
    title: {
        color: warning.brand,
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Medium,
    },
    subtitle: {
        color: neutral.s400,
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Regular,
        lineHeight: Dimensions.moderateScale(22),
        paddingRight: Dimensions.Spacing.small,
    },
    number: {
        color: neutral.s400,
        fontFamily: theme.font.Bold
    },
});
export default AlertSetting;
