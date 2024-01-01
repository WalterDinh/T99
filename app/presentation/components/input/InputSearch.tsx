import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { globalViewStyles } from 'app/presentation/theme/Styles';
import React, { useCallback } from 'react';
import {
    Alert,
    Platform,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
    
} from 'react-native';
import styled from 'styled-components';
interface IInputSearch extends TextInputProps {
    onPressRightIcon?: () => void;
    onPressLeftIcon?: () => void;
    iconRightStyle?: TextInput;
    iconRightPath?: string;
    inputContainerStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    iconLeft?: string;
    iconLeftStyle?: TextInput;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    placeholderOpacity?: boolean;
    handleInputSearch?: () => void;
}
const InputSearch = (props: IInputSearch) => {
    const {
        onPressRightIcon,
        onPressLeftIcon,
        iconRightStyle,
        iconRightPath,
        inputContainerStyle,
        iconLeft,
        iconLeftStyle,
        value,
        disabled,
        placeholder,
        containerStyle,
        placeholderOpacity,
        handleInputSearch,
        ...restProps
    } = props;
    //! Function
    const renderLeftIcon = useCallback(() => {
        if (iconLeft) {
            return (
                <TouchableOpacity onPress={onPressLeftIcon}>
                    <LeftIcon
                        resizeMode={'contain'}
                        source={iconLeft}
                        style={iconLeftStyle}
                    />
                </TouchableOpacity>
            );
        }
        return null;
    }, [iconLeft, iconLeftStyle]);
    const renderRightIcon = useCallback(() => {
        return (
            <TouchableOpacity onPress={onPressRightIcon}>
                <RightIcon
                    style={[{ marginLeft: 4 }, iconRightStyle]}
                    resizeMode={'contain'}
                    source={iconRightPath}
                />
            </TouchableOpacity>
        );
    }, [iconRightStyle, iconRightPath]);

    const _inputStyle = [styles.input];
    //! Render
    return (
        <TouchableOpacity
            disabled={!handleInputSearch}
            onPress={handleInputSearch}
            style={[styles.container, globalViewStyles.shadow, containerStyle]}
        >
            <View style={[styles.inputContainer, inputContainerStyle]}>
                {renderLeftIcon()}
                <View style={styles.inputView}>
                    <TextInput
                        spellCheck={false}
                        autoCorrect={false}
                        allowFontScaling={false}
                        underlineColorAndroid={'transparent'}
                        value={value}
                        style={_inputStyle}
                        editable={!disabled}
                        placeholder={placeholder}
                        placeholderTextColor={
                            placeholderOpacity ? neutral.s250 : neutral.black
                        }
                        {...restProps}
                    />
                    {renderRightIcon()}
                </View>
            </View>
        </TouchableOpacity>
    );
};
const RightIcon = styled.Image`
    width: ${Dimensions.moderateScale(18)};
    height: ${Dimensions.moderateScale(18)};
`;
const LeftIcon = styled.Image`
    width: ${Dimensions.Spacing.larger};
    height: ${Dimensions.Spacing.larger};
`;
const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        fontSize: Dimensions.moderateScale(16),
        fontFamily: theme.font.Medium,
        width:'90%'
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: Platform.select({
            ios: Dimensions.moderateScale(10),
            android: 0,
        }),
        paddingHorizontal: Dimensions.moderateScale(22),
        borderRadius: 4,
        alignItems: 'center',
    },
    container: {
        // width: '100%',
        backgroundColor: neutral.white,
        borderRadius: 4,
    },
});
export default InputSearch;
