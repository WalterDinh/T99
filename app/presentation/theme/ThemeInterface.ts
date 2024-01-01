export interface ITheme {
  color: {
    colorPrimary: string;
    colorPrimaryVariant: string;

    colorSecondary: string;
    colorSecondaryVariant: string;

    colorThird: string;
    colorThirdVariant: string;
    colorFourth: string;

    colorAccent1: string;
    colorAccent1Variant: string;
    colorAccent2: string;
    colorAccent2Variant: string;
    colorAccent3: string;
    colorShadow: string;
    colorShadowVariant: string;

        backgroundColorPrimary: string,
        backgroundColorVariant: string,
        backgroundColorSecondary: string,
        backgroundColorSecondaryVariant: string,
        backgroundColorThird: string,
        backgroundColorTransparent: string,


    textColor: string;
    textColorVariant: string;
    labelColor: string;
    textColorSecondary: string;
    textColorSecondaryVariant: string;

        buttonBackgroundColor: string,
        buttonBorderColor: string,

    colorSeparator: string;

    navigationBackgroundColor: string;
    navigationTintColor: string;

    iconColor: string;

    overlayColor: string;

    errorColor: string;
    warningColor: string;
    disabledColor: string;
    successColorPrimary: string;
    pointBackgroundColor: string;
    grayBackgroundColor: string;
    borderColor: string,
  };
  font: {
    Medium: string;
    Regular: string;
    Bold: string;
  };

  [key: string]: any;
}
