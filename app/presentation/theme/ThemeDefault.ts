import {ITheme} from 'app/presentation/theme/ThemeInterface';
import * as Colors from './Colors';

export const themeDefault: ITheme = {
  color: {
    colorPrimary: Colors.primary.brand,
    colorPrimaryVariant: Colors.primary.s600,

    colorSecondary: Colors.secondary.brand,
    colorSecondaryVariant: Colors.secondary.s600,

    colorThird: '#AFAFAF',
    colorThirdVariant: Colors.neutral.s800,

    colorFourth: Colors.neutral.grayScale,

    colorAccent1: '#4F39A7',
    colorAccent1Variant: '#6750C3',
    colorAccent2: '#FD886F',
    colorAccent2Variant: '#FF9680',
    colorAccent3: '#00AEEF',
    colorShadow: '#4A5568',
    colorShadowVariant: '#FFFFFF',

    backgroundColorPrimary: Colors.neutral.s100,
    backgroundColorVariant: Colors.neutral.white,

        backgroundColorSecondary: Colors.neutral.s125,
        backgroundColorSecondaryVariant: Colors.neutral.s175,
        backgroundColorThird: Colors.neutral.s140,
        backgroundColorTransparent: Colors.transparent.clear,
        

    textColor: Colors.neutral.black,
    textColorVariant: Colors.neutral.white,
    textColorSecondary: Colors.secondary.brand,
    textColorSecondaryVariant: Colors.primary.brand,
    labelColor: Colors.neutral.s400,

    colorSeparator: Colors.neutral.s150,

    buttonBackgroundColor: Colors.primary.brand,
    buttonBorderColor: Colors.transparent.clear,

    navigationBackgroundColor: Colors.neutral.white,
    navigationTintColor: Colors.primary.brand,

    iconColor: Colors.primary.brand,

    overlayColor: Colors.neutral.s400,

    errorColor: Colors.danger.brand,

    disabledColor: Colors.neutral.s250,
    successColorPrimary: Colors.success.brand,
    warningColor: Colors.warning.brand,

    pointBackgroundColor: '#EEBC3F',
    grayBackgroundColor: Colors.neutral.s190,

    borderColor: Colors.neutral.s190,
  },
  font: {
    Medium: 'EncodeSans-Medium',
    Regular: 'EncodeSans-Regular',
    Bold: 'EncodeSans-Bold',
  },
};
