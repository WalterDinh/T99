import { theme } from "app/presentation/theme";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    mainContent: {
        flex: 1, 
        marginTop:Dimensions.moderateScale(36)
    },
    title: {
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
    btn: {
        marginBottom: Dimensions.bottomPadding
    },
})