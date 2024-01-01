import { theme } from "app/presentation/theme";
import { neutral, secondary } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingBottom: Dimensions.bottomPadding,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.Spacing.large,
    },
    copyValue: {
        fontSize: Dimensions.FontSize.medium,
        fontFamily: theme.font.Medium,
        color: secondary.brand
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
    },
    listAccountT99: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.Spacing.small
    },
    copy: {
        borderWidth: 1,
        borderColor: neutral.s175,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderRadius: Dimensions.Spacing.small,
        marginVertical: Dimensions.Spacing.large,
    },
    imgIcon: {
        height: Dimensions.Spacing.large,
        width: Dimensions.Spacing.large,
    },
});