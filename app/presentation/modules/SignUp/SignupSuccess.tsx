import { StackNavigationProp } from '@react-navigation/stack';
import Image from 'app/assets/images/index';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import BackgroundImage from 'app/presentation/components/backgroundimage/BackgroundImage';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'SignupSuccess'>;
}
const SignupSuccess = (props: IProps) => {
    const { navigation } = props;
    //! Function
    const handleSignIn = () => {
        navigation.popToTop()
        navigation.navigate('LoginScreen')
    };
    const handleAccountVerification = () => {
        Alert.alert('click on account verification!');
    };
    //! Render
    return (
        <BackgroundImage
            style={styles.backgroundImage}
            source={Image.Backgrounds.Background as any}
        >
            <>
                <View style={styles.topHaft}>
                    <ImageRenderer
                        style={styles.imageSuccess}
                        source={Images.Backgrounds.BackgroundSuccess}
                    />
                    <TextPrimary style={styles.signupSuccess}>
                        {getString('signupSuccess')}
                    </TextPrimary>
                    <TextPrimary style={styles.successfullyRegisteredAnAccount}>
                        {getString('successfullyRegisteredAnAccount')}
                    </TextPrimary>
                    {/* <TextPrimary
                        style={
                            styles.passwordWillSentToTheRegisteredPhoneNumber
                        }
                    >
                        {getString(
                            'passwordWillSentToTheRegisteredPhoneNumber',
                        )}
                    </TextPrimary> */}
                </View>
                <AppButton
                    styleBtn={{ marginBottom: Dimensions.bottomPadding }}
                    onPress={handleSignIn}
                    name={getString('signin')}
                />
            </>
        </BackgroundImage>
    );
};
export default SignupSuccess;
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    imageSuccess: {
        width: Dimensions.moderateScale(171),
        height: Dimensions.moderateScale(172),
    },
    topHaft: {
        flex: 1,
        marginTop: Dimensions.moderateScale(80),
        alignItems: 'center',
    },
    bottomHaft: { width: '100%', paddingBottom: 60 },
    signupSuccess: {
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: secondary.brand,
        fontFamily: theme.font.Regular,
        paddingTop: Dimensions.Spacing.extraHuge,
        paddingBottom: Dimensions.Spacing.large,
    },
    successfullyRegisteredAnAccount: {
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Regular,
        color: neutral.s400,
        paddingBottom: Dimensions.Spacing.medium,
        letterSpacing: -0.28,
        lineHeight: Dimensions.moderateScale(22),
    },
    passwordWillSentToTheRegisteredPhoneNumber: {
        fontSize: Dimensions.FontSize.large,
        fontFamily: theme.font.Regular,
        color: neutral.s400,
        letterSpacing: -0.28,
        lineHeight: Dimensions.moderateScale(22),
    },
});
