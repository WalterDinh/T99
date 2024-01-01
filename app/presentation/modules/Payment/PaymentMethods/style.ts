import { theme } from "app/presentation/theme";
import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.Spacing.large,
        justifyContent: 'space-between',
        paddingBottom: Dimensions.bottomPadding,
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.Spacing.medium,
    },
});