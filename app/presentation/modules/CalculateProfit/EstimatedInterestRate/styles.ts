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
        borderTopColor: theme.color.colorSeparator, 
        borderTopWidth: 1,
    },
    contentHeader: {
        marginTop: Dimensions.Spacing.extraLarge, 
        marginBottom: Dimensions.Spacing.large,
        marginLeft: Dimensions.moderateScale(22),
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: theme.color.textColor,
    },
    commonCard: {
        borderRadius: 0,
        borderTopWidth: 1,
        borderTopColor: theme.color.colorFourth,
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.Spacing.large,
    },
});
