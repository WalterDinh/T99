import { View, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Dimensions from 'app/presentation/theme/Dimensions';
import FormInput from './FormInput';
import FormLogin from './FormLogin';
import images from 'app/assets/images';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
const height = Dimensions.screenHeight();
const width = Dimensions.screenWidth();
interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'WelcomeScreen'>;
}

const ScreenLogin = (props: IProps) => {
    const { navigation } = props;
    return (
        <View>
            <View style={styles.formImageBackground}>
                <ImageIconCircle
                    style={styles.styleImageBackground}
                    source={images.Icons.loginImage}
                />
            </View>
            <FormInput />
            <FormLogin
                onLogin={() => navigation.navigate('LoginScreen')}
                handlerPassWord={() =>
                    navigation.navigate('ForgotPasswordStack')
                }
                handelRegister={() =>
                    navigation.navigate('SignUpScreen')
                }
            />
        </View>
    );
};
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formImageBackground: {
        position: 'absolute',
        zIndex: -1,
    },
    styleImageBackground: {
        width: width,
        height: height,
        resizeMode: 'cover',
    },
});
export default ScreenLogin;
