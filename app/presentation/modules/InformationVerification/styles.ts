import { theme } from 'app/presentation/theme';
import { neutral, primary, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        // height: Dimensions.moderateScale(186),
    },
    name: {
        fontSize: Dimensions.FontSize.extraLarge,
        color: neutral.black,
        fontFamily: theme.font.Medium,
    },
    id: {
        color: neutral.s400,
        paddingVertical: Dimensions.Spacing.tiny,
    },
    asterisk: {
        color: primary.brand,
    },
    note: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        color: neutral.s400,
        paddingTop: Dimensions.Spacing.small,
    },
    content: {
        height: '100%',
        // flex: 1,
        paddingVertical: Dimensions.Spacing.extraLarge,
        borderTopLeftRadius: Dimensions.Spacing.small,
        borderTopRightRadius: Dimensions.Spacing.small,
        paddingHorizontal: Dimensions.moderateScale(22),
        backgroundColor: neutral.white,
    },
    contentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Dimensions.Spacing.extraLarge,
    },
    title: {
        fontSize: Dimensions.FontSize.medium,
        lineHeight: Dimensions.moderateScale(18),
        color: secondary.brand,
        flexDirection: 'row',
        fontFamily: theme.font.Bold,
    },

    touchImage: {
        height: Dimensions.moderateScale(60),
        width: Dimensions.moderateScale(60),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    unconfirmedImageBackground: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: Dimensions.scale(11),
        paddingVertical: Dimensions.Spacing.large,
    },
    styleCheck: {
        height: Dimensions.Spacing.extraLarge,
        width: Dimensions.Spacing.extraLarge,
    },
    unconfirmedTouchImage: {
        height: Dimensions.moderateScale(60),
        width: Dimensions.moderateScale(60),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleAngleRight: {
        height: Dimensions.moderateScale(7),
        width: Dimensions.moderateScale(7),
    },
    unconfirmContentHeader: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: Dimensions.Spacing.large,
    },
    statusActive: {
        paddingBottom: Dimensions.Spacing.extraLarge,
        justifyContent: 'center',
    },
    contentHeaderTitle: {
        textAlign: 'center',
        width: '100%',
        alignItems: 'center',
        marginTop: Dimensions.Spacing.semiSmall,
    },
    imgDashline: {
        position: 'absolute',
        left: 1,
        height: '100%',
        width: 4,
    },
    itemVerification: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Dimensions.Spacing.medium,
    },
    flexDirection: { flexDirection: 'row', flex: 1 },
    flex: {
        flex: 1,
    },
    viewItemVerification: {
        width: Dimensions.Spacing.small,
        height: Dimensions.Spacing.small,
        borderRadius: Dimensions.Spacing.tiny,
        backgroundColor: primary.brand,
        marginRight: Dimensions.Spacing.large,
        zIndex: 2,
    },
    unconfirmedContentHeaderTitle: {
        marginLeft: Dimensions.Spacing.small,
        justifyContent: 'center',
        width:'65%',
    },
    containerModal: {
        backgroundColor: 'white',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: Dimensions.Spacing.large,
        paddingHorizontal: Dimensions.Spacing.extraLarge,
        paddingVertical: Dimensions.Spacing.extraLarge,
        marginHorizontal: Dimensions.Spacing.large,
        // marginVertical: Dimensions.moderateScale(252),
    },
    imgModal: {
        height: Dimensions.moderateScale(64),
        width: Dimensions.moderateScale(64),
    },
    titleModal: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        lineHeight: Dimensions.moderateScale(25),
        textAlign: 'center',
        color: secondary.brand,
        marginTop: Dimensions.Spacing.extraLarge,
        marginBottom: Dimensions.Spacing.medium,
        fontFamily: theme.font.Regular,
    },
    noteModal: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: theme.font.Regular,
        color: neutral.black,
        marginBottom: Dimensions.Spacing.medium,
    },
    avatar: {
        height: Dimensions.moderateScale(50),
        width: Dimensions.moderateScale(50),
        borderRadius: Dimensions.moderateScale(25),
        backgroundColor: 'white',
    },
});
