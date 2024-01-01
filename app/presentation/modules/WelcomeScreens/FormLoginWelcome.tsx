import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
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
    onLogin?: () => void;
    onPressFacebook?: () => void;
    onPressGoogle?: () => void;
}
const width = Dimensions.screenWidth();
const FormLoginWelcome = (props: IProps) => {
    const {
        handlerFaceID,
        handlerTouchID,
        handelRegister,
        onLogin,
        onPressFacebook,
        onPressGoogle,
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.formLogin}>
                <AppButton
                    onPress={onLogin}
                    styleBtn={styles.styleButton}
                    name={getString('login')}
                />
            </View>
            <View style={styles.formAccount}>
                <TextPrimary
                    style={[styles.text, { color: Colors.neutral.white }]}
                >
                    {getString('noAccount')}{' '}
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

export default FormLoginWelcome;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    container: {
        marginBottom: Dimensions.bottomPadding,
    },
    formLogin: {
        flexDirection: 'row',
        alignSelf: 'center',
        // paddingHorizontal: Dimensions.moderateScale(75),
        marginBottom: Dimensions.moderateScale(16),
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
    formAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: Dimensions.moderateScale(27),
    },
    formSocial: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Dimensions.moderateScale(20),
        paddingBottom: Dimensions.moderateScale(12),
    },
    formImageSocial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'relative',
        // zIndex:10,
        // bottom:Dimensions.bottomPadding
    },

    formImage: {
        backgroundColor: Colors.neutral.white,
        padding: Dimensions.moderateScale(10),
        borderRadius: Dimensions.moderateScale(20),
    },
    imageSocial: {
        width: Dimensions.moderateScale(20),
        height: Dimensions.moderateScale(20),
    },
});
