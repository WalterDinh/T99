import { theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    title: {
        fontSize: Dimensions.FontSize.extraExtraHuge,
        paddingVertical: Dimensions.moderateScale(24),
        alignSelf: 'center',
    },
    inputField: {
        padding: 8,
        fontFamily: theme.font.Medium,
        color: theme.color.textColor,
    },
    btnStyle: {
        marginVertical: 4,
        borderRadius: 8,
        justifyContent: 'flex-start',
        width: Dimensions.screenWidth() - 32,
    },
    icon: { width: 24, height: 24 },
});
