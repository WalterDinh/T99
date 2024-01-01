import { theme } from 'app/presentation/theme';
import { Dimensions } from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    content: {
        flex: 1, 
        marginHorizontal: Dimensions.moderateScale(22), 
        borderTopColor: theme.color.colorSeparator, 
        borderTopWidth: 1,
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: theme.color.textColor,
    },
    inputField: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        marginLeft: Dimensions.Spacing.medium,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
    iconRightField: {
        color: theme.color.disabledColor,
        fontSize: Dimensions.moderateScale(16),
    },
});
