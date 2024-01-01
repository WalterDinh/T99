import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        justifyContent: 'space-between',
        paddingTop: Dimensions.moderateScale(80),
        paddingBottom: Dimensions.bottomPadding,
    },
    styleTitle: { fontSize: Dimensions.FontSize.extraHuge },
    title: {
        paddingVertical: Dimensions.Spacing.extraLarge,
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
});