import { Dimensions, theme } from 'app/presentation/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, TextInput, TextStyle, View } from 'react-native';
import styled from 'styled-components';
import { Input, TextPrimary } from '..';

interface IProps {
    value?: boolean;
    label?: string;
    title?: string;
    style?: TextStyle;
    labelStyle?: TextStyle;
    titleStyle?: TextStyle;
    switchStyle?: object;
    onValueChange?: (value: boolean) => void;
    isInput?: boolean;
    onChangeText?: (text: string) => void;
    valueInput?: string;
    disabledInput?: boolean;
}

export const FormSwitch = (props: IProps) => {
    const {
        style,
        labelStyle,
        valueInput,
        switchStyle,
        titleStyle,
        value,
        title,
        isInput,
        label,
        onValueChange,
        disabledInput = false,
        onChangeText,
    } = props;
    const [data, setData] = useState(value || false);
    const onSwitch = (valueSwitch: boolean) => {
        setData(valueSwitch);
        onValueChange && onValueChange(valueSwitch);
    };
    useEffect(() => {
        value && setData(value);
    }, [value]);

    return (
        <ViewContainer style={[styles.shadow, style]}>
            <View style={styles.contentContainer}>
                {!!title && (
                    <TextPrimary style={[styles.title, titleStyle]}>
                        {title}
                    </TextPrimary>
                )}
                {!disabledInput && (
                    <TextInput
                        spellCheck={false}
                        autoCorrect={false}
                        allowFontScaling={false}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={data ? '#818181' : '#D9D9D9'}
                        value={valueInput}
                        style={styles.input}
                        placeholder={label}
                        onChangeText={onChangeText}
                        editable={isInput}
                        multiline
                    />
                )}
            </View>
            <Switch
                trackColor={{
                    false: theme.color.overlayColor,
                    true: theme.color.successColorPrimary,
                }}
                style={switchStyle}
                value={data}
                onValueChange={onSwitch}
            />
        </ViewContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
    },
    title: {
        fontSize: Dimensions.FontSize.extraLarge,
        paddingBottom: 4,
    },
    contentContainer: {
        flex: 1,
    },
    shadow: {},
    input: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Regular,
        color: theme.color.textColor,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginBottom: 0,
        flex: 1,
    },
});

const ViewContainer = styled.View`
    flex-direction: row;
    padding-vertical: ${Dimensions.Spacing.medium};
    background-color: ${theme.color.backgroundColorVariant};
    align-items: center;
    border-top-color: ${theme.color.grayBackgroundColor};
    border-bottom-color: ${theme.color.grayBackgroundColor};
    border-bottom-width: 1;
`;
