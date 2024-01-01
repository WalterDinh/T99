import TextPrimary from 'app/presentation/components/text/TextPrimary';
import { theme, Dimensions, Colors } from 'app/presentation/theme';
import React, { ForwardedRef, useCallback, useEffect, useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import styled from 'styled-components';
import ImageRenderer from '../image/ImageRenderer';
import Row from '../view/Row';
import isEmpty from 'lodash.isempty';
import Img from '../../../assets/images';
import { NumericFormat } from 'react-number-format';
import CurrencyInput from 'react-native-currency-input';
import _ from 'lodash';

export interface IAppInputProps extends TextInputProps {
    key?: any;
    iconLeftStyle?: StyleProp<ImageStyle>;
    iconRightStyle?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    iconLeft?: number;
    iconRight?: JSX.Element;
    iconRightPath?: JSX.Element;
    errorMessage?: string;
    inputStyle?: StyleProp<TextStyle>;
    textOnly?: boolean;
    ignoreDisableStyle?: boolean;
    valid?: boolean;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    isRequire?: boolean;
    onBlurHandle?: () => void;
    isFocus?: boolean;
    onPressRightIcon?: () => void;
    onChangeValue?: (text: string) => void;
    disabled?: boolean;
    hideBorderBottom?: boolean;
    currency?: boolean;
}

const TextOnlyComp = (props: IAppInputProps) => {
    const {
        placeholder,
        placeholderTextColor = theme.color.labelColor,
        value,
        inputStyle,
        ignoreDisableStyle,
    } = props;
    return (
        <TextOnly
            style={[
                inputStyle,
                {
                    color:
                        value && ignoreDisableStyle
                            ? 'black'
                            : placeholderTextColor,
                },
            ]}
        >
            {value ? value : placeholder}
        </TextOnly>
    );
};

const Input = React.forwardRef(
    (props: IAppInputProps, ref: ForwardedRef<TextInput>) => {
        const iconLeftStyle: any = props.iconLeftStyle;
        const iconRightStyle: any = props.iconRightStyle;

        const {
            inputContainerStyle,
            textOnly,
            onBlurHandle,
            errorMessage,
            valid,
            onChangeValue,
            label,
            value,
            labelStyle,
            key,
            inputStyle,
            iconRight,
            iconLeft,
            iconRightPath: iconRightPath,
            containerStyle,
            testID,
            isRequire,
            isFocus,
            secureTextEntry,
            onPressRightIcon,
            disabled = false,
            currency = false,
            hideBorderBottom = false,
            ...rest
        } = props;

        const [showPassword, setShowPassword] = useState(false);
        const [currencyValue, setCurrencyValue] = useState<any>(value || null);

        useEffect(() => {
            if (currency) {
                setCurrencyValue(value || null);
            }
        }, [value]);

        const renderLeftIcon = useCallback(() => {
            if (iconLeft) {
                return (
                    <LeftIcon
                        resizeMode={'contain'}
                        source={iconLeft}
                        style={iconLeftStyle}
                    />
                );
            }
            return null;
        }, [iconLeft, iconLeftStyle]);

        const renderRightIcon = useCallback(() => {
            if (secureTextEntry) {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            setShowPassword(!showPassword);
                        }}
                    >
                        <RightIcon
                            style={[{ marginLeft: 4 }, iconRightStyle]}
                            resizeMode={'contain'}
                            source={
                                showPassword
                                    ? Img.Icons.EyeOffOulined
                                    : Img.Icons.EyeOulined
                            }
                        />
                    </TouchableOpacity>
                );
            }

            if (typeof iconRight === 'object') return iconRight;
            return (
                <TouchableOpacity onPress={onPressRightIcon}>
                    <RightIcon
                        style={[{ marginLeft: 4 }, iconRightStyle]}
                        resizeMode={'contain'}
                        source={iconRightPath}
                    />
                </TouchableOpacity>
            );
        }, [iconRightStyle, iconRight, value, iconRightPath, showPassword]);

        const _inputStyle = [
            styles.input,
            inputStyle,
            disabled && { color: Colors.neutral.s500 },
            Boolean(errorMessage) && { color: theme.color.errorColor },
        ];

        const _inputViewStyle = () => {
            if (hideBorderBottom) return 'transparent';
            if (Boolean(errorMessage)) return theme.color.errorColor;
            if (isFocus && isEmpty(value)) return theme.color.colorSecondary;
            if (isFocus) return '#C4C4C4';
            return '#E8E8E8';
        };
        const isNotClickedInput = !isFocus && isEmpty(value) && !disabled;
        const placeholder = isNotClickedInput ? '' : rest.placeholder;
        const labelColor =
            !isFocus && isEmpty(value)
                ? theme.color.textColor
                : theme.color.labelColor;

        return (
            <>
                {typeof label === 'string' && (
                    <LabelInput
                        style={[
                            styles.label,
                            { color: labelColor },
                            labelStyle,
                        ]}
                    >
                        {label}
                        {isRequire && (
                            <TextPrimary style={{ color: 'red' }}>
                                *
                            </TextPrimary>
                        )}
                    </LabelInput>
                )}
                {textOnly ? (
                    <TextOnlyComp />
                ) : (
                    <View style={[styles.container, containerStyle]}>
                        <View
                            style={[
                                styles.inputContainer,
                                isNotClickedInput && { paddingVertical: 0 },
                                inputContainerStyle,
                            ]}
                        >
                            {renderLeftIcon()}
                            <View
                                style={[
                                    styles.inputView,
                                    {
                                        borderBottomColor: _inputViewStyle(),
                                        paddingBottom: isNotClickedInput
                                            ? 4
                                            : 12,
                                    },
                                ]}
                            >
                                {currency ? (
                                    <CurrencyInput
                                        spellCheck={false}
                                        autoCorrect={false}
                                        allowFontScaling={false}
                                        underlineColorAndroid={'transparent'}
                                        style={_inputStyle}
                                        placeholderTextColor={'#C4C4C4'}
                                        precision={0}
                                        delimiter=","
                                        value={currencyValue}
                                        editable={!disabled}
                                        placeholder={placeholder}
                                        onChangeValue={(data) => {
                                            if(data != null){
                                                setCurrencyValue(data)
                                                onChangeValue &&
                                                onChangeValue(
                                                    String(data) || '',
                                                );
                                            }
                                            else{
                                                setCurrencyValue(null)
                                                onChangeValue &&
                                                onChangeValue('');
                                            }
                                        }}
                                        {..._.omit(rest, 'onChange')}
                                        onChangeText={undefined}
                                    />
                                ) : (
                                    <TextInput
                                        ref={ref}
                                        key={key ?? undefined}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        allowFontScaling={false}
                                        underlineColorAndroid={'transparent'}
                                        placeholderTextColor={'#C4C4C4'}
                                        value={value}
                                        style={_inputStyle}
                                        testID={testID}
                                        {..._.omit(rest, 'onChange')}
                                        editable={!disabled}
                                        placeholder={placeholder}
                                        secureTextEntry={
                                            secureTextEntry && !showPassword
                                        }
                                    />
                                )}

                                {renderRightIcon()}
                            </View>
                        </View>
                        {errorMessage ? (
                            <Row align={'center'}>
                                <ErrorMess
                                    style={[
                                        styles.error,
                                        !Boolean(errorMessage)
                                            ? { height: 0 }
                                            : undefined,
                                    ]}
                                    testID={
                                        testID
                                            ? `${testID}-error-message`
                                            : undefined
                                    }
                                >
                                    {errorMessage}
                                </ErrorMess>
                            </Row>
                        ) : null}
                    </View>
                )}
            </>
        );
    },
);
export default Input;

const LeftIcon = styled.Image`
    width: 24;
    height: 24;
`;

const RightIcon = styled.Image`
    width: 18;
    height: 18;
`;
const IconStatusInput = styled(ImageRenderer)`
    height: 19;
    width: 19;
`;

const TextOnly = styled(TextPrimary)`
    flex: 1;
    paddingvertical: ${14};
`;

const LabelInput = styled(TextPrimary)``;

const ErrorMess = styled(TextPrimary)``;

const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    input: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Regular,
        color: theme.color.textColor,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginBottom: 0,
        flex: 1,
    },
    container: {
        paddingHorizontal: 0,
        paddingBottom: 8,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: Dimensions.Spacing.small,
    },
    label: {
        color: theme.color.labelColor,
        fontFamily: theme.font.Bold,
        fontSize: Dimensions.FontSize.medium,
        // paddingHorizontal: 20,
        backgroundColor: 'white',
        paddingTop: Dimensions.Spacing.small,
    },
    error: {
        marginHorizontal: 5,
        // paddingHorizontal: 20,
        width: '100%',
        color: theme.color.errorColor,
        // backgroundColor: 'white',
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.small,
    },
});
