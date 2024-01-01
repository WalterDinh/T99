import { Dimensions, theme } from "app/presentation/theme";
import { neutral, secondary } from "app/presentation/theme/Colors";
import { Platform, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: Dimensions.Spacing.small,
      },
      default: {
        // other platforms, web for example
        paddingTop: Dimensions.Spacing.small,
      }
    })
    },
    header: {
        backgroundColor: theme.color.backgroundColorVariant,
    },
    headerInfo: {
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingBottom: Dimensions.Spacing.large,
    },
    footerHeader: {
        height: 8,
        backgroundColor: theme.color.backgroundColorSecondaryVariant,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
    
});

