import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import { theme, Dimensions } from 'app/presentation/theme';

export type FontStyle = 'primary' | 'bold' | 'light';
export type TextType = 'regular' | 'title' | 'label' | 'h1';
interface Props {
    bold?: boolean;
    color?: string;
    fontSize?: number;
    fontStyle?: FontStyle;
    textType?: TextType;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}

const getFontSize = (textType?: TextType): number => {
    if (textType) {
        switch (textType) {
            case 'regular':
                return Dimensions.FontSize.medium;
            case 'title':
                return Dimensions.FontSize.large;
            case 'h1':
                return Dimensions.FontSize.extraExtraHuge;
            case 'label':
                return Dimensions.FontSize.small;
        }
    }

    return Dimensions.FontSize.medium;
};

const getColor = (textType?: TextType): string => {
    if (textType) {
        switch (textType) {
            case 'regular':
                return theme.color.textColor;
            case 'title':
                return theme.color.textColor;
            case 'label':
                return theme.color.labelColor;
            default:
                return theme.color.textColor;
        }
    }

    return theme.color.textColor;
};

const getFontFamily = (fontStyle?: FontStyle): string | undefined => {
    if (fontStyle) {
        switch (fontStyle) {
            case 'primary':
                return theme.font.Regular;
            case 'bold':
                return theme.font.Bold;
            case 'light':
                return theme.font.Medium;
        }
    }
    return theme.font.Regular;
};

const TextPrimary = (props: any) => <TextPrimaryStyle {...props} allowFontScaling={false} />;

const TextPrimaryStyle = styled(Text).attrs((props: Props) => ({
    fontFamily: (_props: Props) => getFontFamily(_props.fontStyle),
    color: (_props: Props) => getColor(_props.textType),
    fontSize: (_props: Props) => getFontSize(_props.textType),
    marginTop: props.marginTop !== undefined ? props.marginTop : 0,
    marginBottom: props.marginBottom !== undefined ? props.marginBottom : 0,
    marginLeft: props.marginLeft !== undefined ? props.marginLeft : 0,
    marginRight: props.marginRight !== undefined ? props.marginRight : 0,
}))`
	color: ${(props: Props) => props.color};
	fontSize: ${(props: Props) => props.fontSize};
	fontFamily: ${(props: any) => props.fontFamily};
	marginTop: ${(props: any) => props.marginTop};
	marginBottom: ${(props: any) => props.marginBottom};
	marginLeft: ${(props: any) => props.marginLeft};
	marginRight: ${(props: any) => props.marginRight};	
`;



export default TextPrimary;