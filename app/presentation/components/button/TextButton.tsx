import {theme, Dimensions} from 'app/presentation/theme';
import {globalViewStyles} from 'app/presentation/theme/Styles';
import React, {useCallback} from 'react';
import {ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle} from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import TextPrimary from '../text/TextPrimary';


const styles = StyleSheet.create({
    defaultButton: {
        flexDirection: 'row',
        backgroundColor: theme.color.buttonBackgroundColor,
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.large,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallButton: {
        flexDirection: 'row',
        backgroundColor: theme.color.buttonBackgroundColor,
        paddingHorizontal: Dimensions.Spacing.medium,
        paddingVertical: Dimensions.Spacing.small,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultTitle: {
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Medium,
        color: '#ffffff',
        textAlign: 'center',
    },
    smallTitle: {
        fontSize: Dimensions.FontSize.medium,
        fontFamily: theme.font.Medium,
        color: '#ffffff',
        textAlign: 'center',
    },
    defaultButtonContainer: {
        borderRadius: 60,
        overflow: 'visible'
    },
    transparentStyle: {
        borderColor: theme.color.buttonBorderColor,
        borderWidth: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: Dimensions.Spacing.medium,
        paddingVertical: Dimensions.Spacing.medium
    },
    transparentText: {
        color: theme.color.textColor
    },
    disabledButton: {
        backgroundColor: 'transparent',
        borderColor: '#8B8B8B',
        borderWidth: 1.5,
    },
    disabledTitle: {
        color: '#8B8B8B',
    },
    indicatorStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
interface ITextButton extends TouchableOpacityProps {
    mode?: 'default' | 'small';
    transparent?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    disabledButtonStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    disabledTitleStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    iconLeft?: string;
    iconRight?: string;
    shadow?: boolean;
    title?: string | React.ReactNode;
    loading?: boolean;
}

const TextButton = React.memo((props: ITextButton) => {
    const {disabled, mode = 'default', transparent, containerStyle, buttonStyle, titleStyle, shadow = true, title, disabledButtonStyle, disabledTitleStyle,
        loading, iconStyle, iconLeft, iconRight, onPress, ...rest} = props;

    const _containerStyle = StyleSheet.flatten([styles.defaultButtonContainer, shadow && !transparent && !disabled ? globalViewStyles.shadow : globalViewStyles.dummyShadowForAndroid, containerStyle]);

    const _titleStyle: TextStyle = StyleSheet.flatten([
        mode === 'default' ? styles.defaultTitle : styles.smallTitle,
        transparent && styles.transparentText,
        titleStyle,
    ]);

    const _disabledTitleStyle: TextStyle = StyleSheet.flatten([styles.disabledTitle, disabledTitleStyle]);

    const _buttonStyle = StyleSheet.flatten([
        mode === 'default' ? styles.defaultButton : styles.smallButton,
        transparent ? styles.transparentStyle : {},
        buttonStyle,
    ]);

    const _disabledButtonStyle = StyleSheet.flatten([styles.disabledButton, disabledButtonStyle]);

    const imageSize = useCallback(() => {
        const enableSize = _titleStyle?.fontSize ?? 0;
        const disableSize = _disabledTitleStyle?.fontSize ?? 0;
        const fontSize = (disableSize > 0) ? disableSize : enableSize;
        if(disabled) {
            return fontSize * 1.3;
        } else {
            return fontSize * 1.3;
        }
    }, [_titleStyle, _disabledTitleStyle, disabled]);

    const imageStyle = StyleSheet.flatten([{marginBottom: 3, width: imageSize(), aspectRatio: 1}, iconStyle]);

    return <View style={_containerStyle}>
        <TouchableOpacity activeOpacity={loading ? 1 : 0.7} disabled={disabled}
            onPress={loading ? undefined : onPress}
            style={[_buttonStyle, disabled && _disabledButtonStyle]}
            {...rest}
        >
            {loading ? <ActivityIndicator style={styles.indicatorStyle} /> : null}

            {!!iconLeft ? <ImageRenderer resizeMode={'contain'} source={iconLeft} style={[{marginRight: 4}, imageStyle]} /> : null}
            <TextPrimary style={[_titleStyle, disabled && _disabledTitleStyle, loading && {opacity: 0}]}>
                {title}
            </TextPrimary>
            {!!iconRight ? <ImageRenderer resizeMode={'contain'} source={iconRight} style={[{marginLeft: 2}, imageStyle]} /> : null}
        </TouchableOpacity>
    </View>;
});

export default TextButton;
