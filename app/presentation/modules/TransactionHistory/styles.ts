import { theme } from "app/presentation/theme";
import { neutral } from "app/presentation/theme/Colors";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
       
    },
    title: {
        color: neutral.black,
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular,
        marginBottom: Dimensions.moderateScale(14),
    },
    inputField: {
        paddingTop: 8,
    },
});