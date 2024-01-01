import { theme } from "app/presentation/theme";
import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const stylesInterestFeeDetail = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        justifyContent: 'space-between',
        paddingBottom: Dimensions.moderateScale(60),
    },
    title: {
        textTransform: 'uppercase',
        borderColor: neutral.s175,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.moderateScale(22),
        // marginBottom: Dimensions.Spacing.medium,
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.small,
        color: neutral.black,
    },
    customTextTitle: { fontSize: Dimensions.FontSize.small },
    customStyleTitleBottomHalf: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    stylesTitle: { marginBottom: Dimensions.moderateScale(6) },
    styleCommonCard: {
        paddingTop: 0,
        paddingBottom: 0,
        borderTopWidth: 1,
        borderTopColor: neutral.s175,
    },
    btn: {
        paddingHorizontal: Dimensions.moderateScale(22),
        marginTop: Dimensions.Spacing.huge
    },
    copyCommon: {
        paddingTop: Dimensions.Spacing.larger,
    },
});
export const stylesInterestFee = StyleSheet.create({
    formItem: {
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(8),
        marginTop: Dimensions.moderateScale(16),
    },
});