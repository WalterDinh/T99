import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Input } from 'app/presentation/components';
import images from 'app/assets/images';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';
// import AnimatedInput from "react-native-animated-input";

interface IProps {
    onChangeText?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    label?: string;
    isRequire?: boolean;
    color?: string;
    focusable?: boolean;
    value?: string;
    keyboardType?: string;
    errorMessage?: string;
    placeholder?: string;
    iconRight?:any
}
const FormInput = (props: IProps) => {
    const {
        label,
        isRequire,
        color,
        onChangeText,
        onBlur,
        onFocus,
        focusable,
        value,
        keyboardType,
        errorMessage,
        placeholder,
        iconRight,
        ...rest
    } = props;
    return (
        <View style={styles.container}>
            <Input
                inputStyle={styles.inputStyle}
                label={label}
                value={value}
                labelStyle={[styles.labelStyle, { color: color }]}
                isRequire={isRequire}
                selectionColor={Colors.secondary.brand}
                onChangeText={onChangeText}
                focusable={focusable}
                keyboardType={keyboardType}
                errorMessage={errorMessage}
                iconRight={iconRight}
                {...rest}
            />
            
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    container: {
        paddingTop: Dimensions.moderateScale(24),
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    inputStyle: {
        paddingBottom: Dimensions.moderateScale(12),
        color: Colors.neutral.black,
        fontSize: Dimensions.moderateScale(17),
    },
    labelStyle: {
        paddingBottom: Dimensions.moderateScale(8),
        color: Colors.neutral.black,
        fontSize: Dimensions.moderateScale(14),
    },
});
