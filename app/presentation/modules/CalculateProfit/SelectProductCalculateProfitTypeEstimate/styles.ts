import { theme } from 'app/presentation/theme';
import {Dimensions} from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    inputField: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.textColor,
        marginLeft: Dimensions.Spacing.medium,
    },
    btnStyle: {
        marginHorizontal: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.medium,
        padding: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.large,
        justifyContent: 'flex-start',
        width: Dimensions.screenWidth() - 32,

        shadowColor: theme.color.colorSecondary,

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        elevation: 5,
    },
    icon: { width: 32, height: 32 },
});
