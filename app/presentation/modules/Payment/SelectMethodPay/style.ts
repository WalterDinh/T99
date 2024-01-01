import { theme } from "app/presentation/theme";
import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        justifyContent: 'space-between',
    },
    contentTitle: {
        paddingHorizontal: Dimensions.moderateScale(28),
        paddingVertical: Dimensions.Spacing.extraLarge,
    },
    contentItem: {
        paddingHorizontal: Dimensions.Spacing.large,
    },
    title: {
        textAlign: 'left',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
    },
    btn: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingBottom: Dimensions.bottomPadding,
    },
});