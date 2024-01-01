import { View, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import OTPInputView, {
    InputProps,
} from '@twotalltotems/react-native-otp-input';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';

interface IProps extends InputProps {
    value?: string;
    pinCount: number;
    onChangeText: (value: string) => void;
}

const FormOtp = (props: IProps) => {
    const { value, pinCount, onChangeText, ...refProps } = props;
    return (
        <View>
            <OTPInputView
                style={styles.FormInputQr}
                code={value}
                pinCount={pinCount}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                {...refProps}
                onCodeFilled={(code: string) => {
                    onChangeText(code);
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    FormInputQr: {
        flexDirection: 'row',
    },
    underlineStyleBase: {
        fontSize: Dimensions.Spacing.extraHuge2,
        fontFamily: theme.font.Bold,
        width: Dimensions.Spacing.extraGiant,
        height: Dimensions.moderateScale(60),
        borderWidth: 0,
        paddingBottom: 8,
        borderBottomWidth: Dimensions.Spacing.tiny,
        lineHeight:
            Platform.OS === 'android' ? Dimensions.Spacing.giant : undefined,
        color: Colors.secondary.brand,
        borderColor: Colors.secondary.brand,
    },

    underlineStyleHighLighted: {
        borderColor: Colors.secondary.brand,
    },
});
export default FormOtp;
