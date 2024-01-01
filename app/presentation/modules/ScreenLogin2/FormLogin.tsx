import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import { primary } from 'app/presentation/theme/Colors';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import TouchID from 'react-native-touch-id';
import Toast from 'react-native-toast-message';
import { StatusToast, User } from 'app/shared/constants';
import { StorageGatewayFactory } from 'app/data/gateway/storage';

interface IProps {
    handlerFaceID?: () => void;
    handlerTouchID?: () => void;
    handlerForgotPassWord?: () => void;
    handelRegister?: () => void;
    onSubmit?: () => void;
    disable?: boolean;
    type?: any;
}
const height = Dimensions.screenHeight();
const FormLogin = (props: IProps) => {
    const {
        handlerFaceID,
        handlerForgotPassWord,
        handlerTouchID,
        onSubmit,
        disable,
    } = props;

    const [typeSupport, setTypeSupport] = useState<any>();

    useLayoutEffect(() => {
        TouchID.isSupported()
            .then((biometryType) => {
                setTypeSupport(biometryType);
            })
            .catch((error) => {
                setTypeSupport(undefined);
            });
    }, []);

    const onClickHandle = async () => {
        const storageClient = StorageGatewayFactory.createWithSecureClient();
        const iDBiometric = await storageClient.doGet(User.IDBiometric);        
       
        if (!!typeSupport) {
            
            TouchID.authenticate(`Sử dụng ${typeSupport} để đăng nhập`)
                .then((success: any) => {
                    if(!Boolean(iDBiometric.data)){
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('loginWithBiometricNotSp'),
                        });
                        return
                    }
                    handlerTouchID && handlerTouchID();
                })
                .catch((error: any) => {  
                    Alert.alert(error.message);
                });
        } else {
            Toast.show({
                type: StatusToast.Error,
                text2: getString('biometricNotSp'),
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formLogin}>
                <View style={{ flex: 1, height: 100 }}>
                    <AppButton
                        styleBtn={styles.styleButton}
                        name={getString('login')}
                        onPress={onSubmit}
                        disabled={disable}
                        type={disable ? ButtonType.CircleGray : undefined}
                    />

                    <TouchableOpacity
                        onPress={handlerForgotPassWord}
                        style={styles.formPass}
                    >
                        <TextPrimary style={styles.text}>
                            {getString('forgotPasswordNoQuestionMark')}
                        </TextPrimary>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handlerFaceID}
                    style={{ paddingHorizontal: Dimensions.moderateScale(16) }}
                >
                    {handlerFaceID && (
                        <ImageIconCircle
                            source={images.Icons.faceId}
                            style={styles.image}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickHandle}>
                    <ImageIconCircle
                        source={images.Icons.touchId}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default FormLogin;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    container: {
        paddingTop: height * 0.14,
    },
    formLogin: {
        flexDirection: 'row',
    },
    styleButton: {
        borderRadius: Dimensions.moderateScale(22),
        flex: 1,
    },
    image: {
        width: Dimensions.moderateScale(44),
        height: Dimensions.moderateScale(44),
    },
    text: {
        color: primary.s700,
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
