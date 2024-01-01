import { theme } from "app/presentation/theme";
import Dimensions from "app/presentation/theme/Dimensions";
import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.extraExtraLarge,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingVertical: 12,
    },
    txtStyle: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.textColor,
        padding: Dimensions.Spacing.small,
        flex:1
    },
    btnStyle: {
        marginTop: Dimensions.Spacing.medium,
        borderRadius: 8,
        justifyContent: 'flex-start',
        paddingHorizontal: 18
    },
    btnStyleActive: {
        borderColor: Colors.secondary.s600,
    },
    txtStyleActive: {
        color: Colors.secondary.brand,
    },
    icon: { width: 22, height: 22 },
})