import { theme } from "app/presentation/theme";
import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Dimensions.Spacing.extraLarge,
        paddingTop: Dimensions.Spacing.large,
    },
    name: {
        fontSize: Dimensions.FontSize.extraLarge,
        color: neutral.black,
        fontFamily: theme.font.Medium,
    },
    id: {
        color: neutral.s400,
        marginTop: Dimensions.Spacing.tiny,
        marginBottom: Dimensions.Spacing.tiny,
    },
    uploadAvt: {
        height: Dimensions.moderateScale(60),
        width: Dimensions.moderateScale(60),
        borderRadius: Dimensions.moderateScale(30),
    },
    uploadDefaultImage: {
        backgroundColor:'white',
        height: Dimensions.moderateScale(60),
        width: Dimensions.moderateScale(60),
        borderRadius: Dimensions.moderateScale(30),
    },
    upload: {
        width: Dimensions.moderateScale(60),
        height: Dimensions.moderateScale(60),
        borderRadius: Dimensions.moderateScale(50),
        backgroundColor: theme.color.grayBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Dimensions.Spacing.medium,
    },
    uploadDone: {
        position: 'absolute',
        right: 0,
        bottom: 1,
        width: 20,
        height: 20,
    },
    touchImage: {
        height: 60,
        width: 60,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerAccount: {
        marginVertical: Dimensions.Spacing.small,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingTop: Dimensions.Spacing.large,
    },
    containerMenuitem: {
        paddingHorizontal: Dimensions.moderateScale(8),
    },
    containerTitle: {
        fontSize: Dimensions.FontSize.small,
        fontFamily: theme.font.Medium,
        textTransform: 'uppercase',
        paddingBottom: Dimensions.Spacing.large,
    },
    containerSetting: {
        marginBottom: Dimensions.Spacing.small,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingTop: Dimensions.Spacing.large,
    },
    
});