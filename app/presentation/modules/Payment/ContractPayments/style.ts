import { Colors, theme } from "app/presentation/theme";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        flex: 1,
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