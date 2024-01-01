import { Dimensions, theme } from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const changePasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    content: {
        flex: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        paddingTop: Dimensions.Spacing.extraLarge,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    errors: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.colorPrimary,
        paddingTop: Dimensions.Spacing.small,
        lineHeight: 16,
    },
    btn: {
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.bottomPadding,
    },
});

