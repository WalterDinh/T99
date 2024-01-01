import { Dimensions, theme } from 'app/presentation/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.extraLarge,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnTitle: {
        flexDirection: 'row',
    },
    titleBtnTitle: {
        paddingRight: Dimensions.Spacing.tiny,
        color: theme.color.textColorSecondaryVariant,
        fontSize: Dimensions.FontSize.small,
        fontFamily: theme.font.Regular,
        lineHeight: Dimensions.moderateScale(16),
    },
    iconTitle: {
        height:  Dimensions.moderateScale(16),
        width:  Dimensions.moderateScale(16),
    },
    content: {
        flexDirection: 'row',
    },
    titleFeature:{
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
    },
    formIcon:{
        flexDirection:'row'
    }
});
