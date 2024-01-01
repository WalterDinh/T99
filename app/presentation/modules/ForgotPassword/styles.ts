import { Dimensions, theme } from "app/presentation/theme";
import { StyleSheet } from "react-native";


export const forgotPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    btn: {
        marginBottom: Dimensions.bottomPadding
    },
    btnActive: {
        marginBottom: Dimensions.bottomPadding
    },
})

export const verifyOtpStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
        paddingBottom: Dimensions.Spacing.huge,
    },
    errors:{
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.colorPrimary,
        paddingTop: Dimensions.Spacing.small,
        lineHeight: 16,
    },
    sendBack:{
      marginTop: Dimensions.moderateScale(50),
      marginBottom: Dimensions.Spacing.large,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    titleSendBack:{
        color: theme.color.textColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: 22,
        letterSpacing: -0.28,
    },

    btn: {
        marginBottom: Dimensions.bottomPadding
    },
    btnActive: {
        marginBottom: Dimensions.bottomPadding
    },
})

export const newPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    image: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    errors:{
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
        color: theme.color.colorPrimary,
        paddingTop: Dimensions.Spacing.small,
        lineHeight: 16,
    },
    sendBack:{
      marginTop: Dimensions.moderateScale(50),
      marginBottom: Dimensions.Spacing.large,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    titleSendBack:{
        color: theme.color.textColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        lineHeight: 22,
        letterSpacing: -0.28,
    },

    btn: {
        marginBottom: Dimensions.bottomPadding
    },
    btnActive: {
        marginBottom: Dimensions.bottomPadding
    },
})

export const createPasswordDoneStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    mainContent: {
        flex: 1, 
        marginTop:Dimensions.moderateScale(56)
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    btn: {
        marginBottom: Dimensions.bottomPadding
    },
})