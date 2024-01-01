import React from 'react';
import {
    ImageStyle,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { theme, Dimensions, Colors } from 'app/presentation/theme';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';
export enum ButtonType {
    CircleGray = 'CircleGray',
    CircleBorderRed = 'CircleBorderRed',
    CircleBorderGray = 'CircleBorderGray',
    SquareGraySecondary = 'SquareGraySecondary',
    SquareRed = 'SquareRed',
    SquareGrayPrimary = 'SquareGrayPrimary',
    SquareBorderRed = 'SquareBorderRed',
    SquareBorderGray = 'SquareBorderGray',
}

interface IProps extends TouchableOpacityProps {
    name?: string;
    onPress?: () => void;
    type?: ButtonType;
    iconRight?: number;
    iconLeft?: number;
    styleBtn?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ImageStyle>;
}

export const AppButton = (props: IProps) => {
    const {
        name,
        iconLeft,
        onPress,
        type,
        styleBtn,
        iconRight,
        textStyle,
        iconStyle,
        ...rest
    } = props;

    const iconButton = (sourceIcon: number) => {
        return sourceIcon ? (
            <ImageRenderer
                style={[buttonComponentStyles.icon, iconStyle]}
                source={sourceIcon}
            />
        ) : null;
    };

    let titleBtn = StyleSheet.flatten([buttonComponentStyles.titleBtn]);

    const buttonType = (typeBtn?: ButtonType) => {
        let styleType = StyleSheet.flatten([buttonComponentStyles.button]);

        switch (typeBtn) {
            case ButtonType.CircleGray:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.backgroundGray,
                };
                break;

            case ButtonType.CircleBorderRed:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.borderRed,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnRed,
                };
                break;

            case ButtonType.CircleBorderGray:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.borderGray,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnGray,
                };
                break;

            case ButtonType.SquareGraySecondary:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.square,
                    ...buttonComponentStyles.squareGray,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnSquare,
                    ...buttonComponentStyles.titleBtnRed,
                };
                break;

            case ButtonType.SquareRed:
                styleType = { ...styleType, ...buttonComponentStyles.square };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnSquare,
                };
                break;

            case ButtonType.SquareGrayPrimary:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.square,
                    ...buttonComponentStyles.backgroundGray,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnSquare,
                };
                break;

            case ButtonType.SquareBorderRed:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.square,
                    ...buttonComponentStyles.borderRed,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnSquare,
                    ...buttonComponentStyles.titleBtnRed,
                };
                break;

            case ButtonType.SquareBorderGray:
                styleType = {
                    ...styleType,
                    ...buttonComponentStyles.square,
                    ...buttonComponentStyles.borderGray,
                };
                titleBtn = {
                    ...titleBtn,
                    ...buttonComponentStyles.titleBtnSquare,
                    ...buttonComponentStyles.titleBtnGray,
                };
                break;

            default:
                styleType;
        }

        return styleType;
    };

    const StyleButton = buttonType(type);

    return (
        <TouchableOpacity
            style={[StyleButton, styleBtn]}
            {...rest}
            onPress={onPress}
        >
            {iconLeft && iconButton(iconLeft)}
            <TextPrimary style={[titleBtn, textStyle]}>{name}</TextPrimary>
            {iconRight && iconButton(iconRight)}
        </TouchableOpacity>
    );
};

const buttonComponentStyles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.moderateScale(11),
        borderRadius: Dimensions.moderateScale(22),
        backgroundColor: theme.color.buttonBackgroundColor,
    },

    backgroundGray: {
        backgroundColor: theme.color.disabledColor,
    },
    borderRed: {
        backgroundColor: theme.color.backgroundColorVariant,
        borderColor: theme.color.colorPrimary,
        borderWidth: 1,
    },
    borderGray: {
        backgroundColor: theme.color.backgroundColorVariant,
        borderColor: Colors.neutral.s250,
        borderWidth: 1,
    },

    square: {
        paddingHorizontal: Dimensions.Spacing.medium,
        paddingVertical: Dimensions.Spacing.small,
        borderRadius: 4,
        backgroundColor: theme.color.buttonBackgroundColor,
    },
    squareGray: {
        backgroundColor: theme.color.backgroundColorSecondary,
    },

    titleBtn: {
        color: theme.color.backgroundColorVariant,
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        lineHeight: Dimensions.moderateScale(22),
        letterSpacing: -0.41,
        marginHorizontal: Dimensions.Spacing.small,
    },
    titleBtnSquare: {
        fontSize: Dimensions.FontSize.medium,
        lineHeight: Dimensions.moderateScale(18),
        letterSpacing: -0.08,
    },
    titleBtnGray: { color: theme.color.labelColor },
    titleBtnRed: { color: theme.color.colorPrimary },

    icon: {
        height: 20,
        width: 20,
    },
});
