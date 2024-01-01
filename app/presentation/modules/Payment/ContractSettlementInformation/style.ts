import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StyleSheet } from 'react-native';

export const stylesInformation = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        justifyContent: 'space-between',
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
    },
    btn: {
        paddingHorizontal: Dimensions.moderateScale(22),
        marginTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.bottomPadding,
    },
});
