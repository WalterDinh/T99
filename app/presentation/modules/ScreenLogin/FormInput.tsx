import { View, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Input, TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
const height = Dimensions.screenHeight();

const FormInput = () => {
    const [number, setNumber] = useState('');
    const [pass, setPass] = useState('');

    const onChangeTextNumber = (num: string) => {
        setNumber(num);
    };
    const onChangeTextPassword = (pas: string) => {
        setPass(pas);
    };
    return (
        <View style={styles.inputView}>
            <View style={{ marginBottom: Dimensions.moderateScale(38) }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextPrimary
                        style={{
                            color: Colors.neutral.white,
                            fontFamily: theme.font.Bold,
                        }}
                    >
                        {getString('phoneNumber')}
                    </TextPrimary>
                    <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại đã đăng ký"
                    placeholderTextColor={Colors.neutral.s175}
                    onChangeText={onChangeTextNumber}
                    value={number}
                    keyboardType="numeric"
                />
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TextPrimary
                        style={{
                            color: Colors.neutral.white,
                            fontFamily: theme.font.Bold,
                        }}
                    >
                        {getString('password')}
                    </TextPrimary>
                    <TextPrimary style={{ color: 'red' }}>*</TextPrimary>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextPassword}
                    value={pass}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    inputView: {
        marginTop: height * 0.41,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    input: {
        paddingBottom: Dimensions.moderateScale(12),
        paddingTop: Dimensions.moderateScale(8),
        fontSize: Dimensions.moderateScale(17),
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral.s190,
        color: Colors.neutral.white,
    },
});
export default FormInput;
