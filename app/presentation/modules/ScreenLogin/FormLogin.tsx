import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import styled from 'styled-components';
import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { Colors, Dimensions } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';

interface IProps {
    handlerFaceID?: () => void;
    handlerTouchID?: () => void;
    handlerPassWord?: () => void;
    handelRegister?: () => void;
    onLogin: () => void;
}
const FormLogin = (props: IProps) => {
    const { handlerFaceID, handlerTouchID, handlerPassWord, handelRegister, onLogin } =
        props;
    return (
        <View>
            <View style={styles.formLogin}>
                <AppButton
                    onPress={onLogin}
                    styleBtn={styles.styleButton}
                    name={getString('login')}
                />
                <TouchableOpacity
                    onPress={handlerFaceID}
                    style={{ paddingHorizontal: Dimensions.moderateScale(16) }}
                >
                    <ImageIconCircle
                        source={images.Icons.faceId}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlerTouchID}>
                    <ImageIconCircle
                        source={images.Icons.touchId}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handlerPassWord} style={styles.formPass}>
                <TextPrimary style={styles.text}>
                    {getString('forgotPassword')}
                </TextPrimary>
            </TouchableOpacity>
            <View style={styles.formAccount}>
                <TextPrimary
                    style={[styles.text, { color: Colors.neutral.white }]}
                >
                    {getString('noAccount')}
                </TextPrimary>
                <TouchableOpacity onPress={handelRegister}>
                    <TextPrimary style={styles.text}>
                        {getString('registerNow')}
                    </TextPrimary>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FormLogin;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    formLogin: {
        // flexDirection: 'row',
        // marginTop: Dimensions.moderateScale(16),
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    styleButton: {
        flex: 1,
    },
    image: {
        width: Dimensions.moderateScale(44),
        height: Dimensions.moderateScale(44),
    },
    text: {
        color: Colors.primary.brand,
        fontSize: Dimensions.moderateScale(17),
    },
    formPass: {
        alignItems: 'center',
        paddingVertical: Dimensions.moderateScale(16),
    },
    formAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
