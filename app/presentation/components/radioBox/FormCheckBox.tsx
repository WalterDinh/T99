import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Colors, theme } from 'app/presentation/theme';
import styled from 'styled-components';
import images from 'app/assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dimensions from 'app/presentation/theme/Dimensions';
import TextPrimary from '../text/TextPrimary';

interface IProps {
    value: boolean;
    onChange: (value: boolean) => void;
    title: string;
    styleContainer?: StyleProp<ViewStyle>;
    styleText?: StyleProp<ViewStyle>;
    disabled?: boolean;
}
const FormRadioBox = (props: IProps) => {
    const {
        value,
        onChange,
        title,
        styleContainer,
        styleText,
        disabled = false,
    } = props;
    return (
        <View style={[styles.container, styleContainer]}>
            <TouchableOpacity
                disabled={disabled}
                onPress={() => onChange(value)}
            >
                <ImageIconCircle
                    source={value ? images.Icons.radio1 : images.Icons.radio2}
                />
            </TouchableOpacity>
            <TextPrimary
                style={[
                    styles.styleText,
                    styleText,
                    disabled && { color: theme.color.labelColor },
                ]}
            >
                {title}
            </TextPrimary>
        </View>
    );
};
const ImageIconCircle = styled.Image`
    width: 20;
    height: 20;
`;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleText: {
        marginLeft: Dimensions.Spacing.tiny,
        fontSize: Dimensions.FontSize.extraLarge,
        fontWeight: '400',
        color: Colors.neutral.black,
    },
});
export default FormRadioBox;
