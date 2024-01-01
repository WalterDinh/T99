import { Dimensions, theme } from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.Spacing.small,
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: Dimensions.Spacing.small,
    },
    btnTitle: {
        flexDirection: 'row',
    },
    titleBtnTitle: {
        paddingRight: Dimensions.Spacing.tiny,
        color: theme.color.textColorSecondaryVariant,
        fontSize: Dimensions.FontSize.small,
        fontFamily: theme.font.Regular,
        lineHeight: 16,
    },
    iconTitle: {
        height: 16,
        width: 16,
    },
    content: {
        marginTop: Dimensions.Spacing.large,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    titleFeature: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: theme.color.textColor,
        lineHeight: 25,
    },
});
