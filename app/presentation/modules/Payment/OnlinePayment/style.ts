import { theme } from "app/presentation/theme";
import { neutral, secondary } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        justifyContent: 'space-between',
        paddingBottom: Dimensions.bottomPadding,
    },
    contentLeft: { flexDirection:'row', alignItems:'center' },
    contentLeftImg: { height: Dimensions.Spacing.extraHuge, width: Dimensions.Spacing.extraHuge, marginRight: Dimensions.Spacing.small },
    title: {
        paddingVertical: Dimensions.Spacing.extraLarge,
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    btnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Dimensions.Spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: neutral.s175,
    },
    btnItemText: {
        fontSize: Dimensions.FontSize.medium,
        fontFamily: theme.font.Medium,
        color: secondary.brand,
    },
    img: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
});