import { theme } from "app/presentation/theme";
import { neutral, primary } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.large,
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        color: neutral.black,
        textAlign: 'center',
        marginBottom: Dimensions.Spacing.extraLarge,
    },
    note: {
        fontSize: Dimensions.FontSize.large,
        textAlign: 'center',
        fontFamily: theme.font.Regular,
        color: neutral.s400,
        paddingBottom: Dimensions.Spacing.extraLarge,
    },
    noteRed: {
        color: primary.brand,
        fontFamily: theme.font.Bold,
    },
    field: {
        paddingBottom: Dimensions.moderateScale(83),
    },
});