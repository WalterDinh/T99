import { theme } from "app/presentation/theme";
import { applyOpacity, neutral, secondary } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    bankViewContent: {
        flex: 1,
        paddingRight: Dimensions.Spacing.small,
        marginBottom: Dimensions.Spacing.small,
    },
    bankTitleBottomHalf:{
        fontSize: Dimensions.FontSize.medium,
        color: secondary.brand,
    },
    bankHeaderCardImg:  {
        width: Dimensions.Spacing.extraHuge,
        height: Dimensions.Spacing.extraHuge,
        marginRight: Dimensions.Spacing.small,
    },
    twoActiveHeaderCardContainer: {
        flexDirection: 'row', 
        paddingVertical: Dimensions.Spacing.large,
        borderBottomColor: neutral.s190,
        borderBottomWidth: 1
    },
    twoActiveHead: {
        marginBottom: Dimensions.Spacing.small ,
        fontSize: Dimensions.FontSize.small,
        backgroundColor: applyOpacity('#DDDDE4', 0.5),
        paddingTop: Dimensions.Spacing.semiSmall,
        paddingBottom: Dimensions.Spacing.semiSmall,
        paddingRight: Dimensions.Spacing.medium,
        paddingLeft: Dimensions.Spacing.medium,
        borderRadius: Dimensions.moderateScale(26),
        display: 'flex',
    },
    idAndTitleviewContent: {
        flex: 1,
        paddingRight: Dimensions.Spacing.small,
        marginBottom: Dimensions.Spacing.small,
    },
    idAndTitleTextTitle: {
        color: secondary.brand,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    outlineHead: {
        paddingTop: Dimensions.Spacing.semiSmall,
        paddingBottom: Dimensions.Spacing.semiSmall,
        paddingRight: Dimensions.Spacing.medium,
        paddingLeft: Dimensions.Spacing.medium,
        borderRadius: Dimensions.moderateScale(26),
        borderWidth: 1,
        borderColor: applyOpacity('#DDDDE4', 0.5),
        backgroundColor: neutral.white,
        marginBottom: Dimensions.moderateScale(14)
    },
    outlineTextTitle: {
        color: neutral.s400,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    outlineHeaderCardContainer: {},
    outlineViewContent: {
        borderBottomWidth: 1,
        borderColor: neutral.s190,
        paddingVertical: Dimensions.Spacing.large,
    },
    defaultHead: {
        paddingTop: Dimensions.Spacing.semiSmall,
        paddingBottom: Dimensions.Spacing.semiSmall,
        paddingRight: Dimensions.Spacing.medium,
        paddingLeft: Dimensions.Spacing.medium,
        borderRadius: Dimensions.moderateScale(26),
        backgroundColor: applyOpacity('#DDDDE4', 0.5),
        display: 'flex',
        flexDirection: 'row',
        alightItem: 'center',
        marginBottom: Dimensions.Spacing.small,
        fontFamily: theme.font.Regular
    },
    defaultTextTitle: {
        display: 'flex',
        flexDirection: 'row',
        alightItem: 'center',
        justifyContent: 'center',
        color: secondary.brand,
        fontSize: Dimensions.FontSize.small,
        lightHeight: Dimensions.Spacing.large,
        fontFamily: theme.font.Regular

    },
    defaultTitleBottomHalf: {
        color: secondary.brand,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Medium,
    },
    defaultViewContent: {
        paddingRight: Dimensions.Spacing.small,
    },
    defaultHeaderCardContainer: {
        paddingVertical: Dimensions.Spacing.large,
        height: Dimensions.moderateScale(85),
        flexDirection: 'row',
        marginBottom: Dimensions.Spacing.small,
    },
    flex: {
        flex: 1
    },
    flexDirection: {
        flexDirection: 'row'
    }
})