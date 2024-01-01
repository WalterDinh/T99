import { Dimensions, theme } from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.Spacing.extraLarge,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flex: 1,
        marginTop: Dimensions.Spacing.extraLarge,
        flexDirection: 'row',
    },
    titleFeature:{
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
    },
});
