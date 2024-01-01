import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { ImageRenderer } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import Img from '../../../assets/images';
import OutstandingForm from './components/OutstandingScreen';
import styled from 'styled-components';
import FeaturedProductsScreen from './components/FeaturedProductsScreen';
import VariousAndUtilitiesScreen from './components/VariousAndUtilitiesScreen';
import { getString } from 'app/presentation/localization';
import NotiUnlockScreen from './components/NotiUnlockScreen';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { PromoBanner } from '../Home/components/PromoBanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';

const dataPromo = [
    {
        imgUrl: Img.Backgrounds.PromoBanner,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner1,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner2,
    },
    {
        imgUrl: Img.Backgrounds.PromoBanner3,
    },
];
interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'LearnAppScreen'>;
}
const LearnAppScreen = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                style={{ flex: 1 }}
            >
                <ImageBackground
                    resizeMode="cover"
                    source={Img.Carousel.BannerTopHome}
                    style={styles.imageHeader}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.buttonBack}
                    >
                        <ImageIconCircle
                            style={{ tintColor: 'white' }}
                            source={Img.Icons.Back}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <ImageBackground
                    source={Img.Backgrounds.BackgroundHeader2}
                    style={styles.imageBackgroundPartTop}
                    resizeMode="contain"
                />
                <ImageBackground
                    source={Img.Backgrounds.BackgroundFooter}
                    style={styles.imageBackgroundPartBottom}
                    resizeMode="contain"
                />
                <View style={{}}>
                    <OutstandingForm />
                    <PromoBanner dataImg={dataPromo} />
                    <FeaturedProductsScreen />
                    <VariousAndUtilitiesScreen />
                    <NotiUnlockScreen />
                    <View style={styles.formButtom}>
                        <AppButton
                            type={ButtonType.SquareBorderRed}
                            name={getString('register')}
                            styleBtn={styles.button}
                            onPress={() => navigation.navigate('SignUpScreen')}
                            textStyle={{ fontSize: 17 }}
                        />
                        <AppButton
                            type={ButtonType.SquareRed}
                            styleBtn={styles.button}
                            name={getString('login')}
                            onPress={() => navigation.navigate('LoginScreen')}
                            textStyle={{ fontSize: 17 }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LearnAppScreen;
const ImageIconCircle = styled.Image`
    width: 18;
    height: 18;
`;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageHeader: {
        width: Dimensions.screenWidth(),
        height: Dimensions.moderateScale(210),
    },
    imageBackgroundPartTop: {
        position: 'absolute',
        zIndex: -1,
        height: 126,
        width: 261,
        top: -35,
    },
    buttonBack: {
        position: 'absolute',
        left: Dimensions.moderateScale(16),
        top: Dimensions.getStatusBarHeight(true) + 8,
        zIndex: 100,
    },
    imageBackgroundPartBottom: {
        zIndex: -1,
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 150,
        width: 250,
    },
    formButtom: {
        marginHorizontal: Dimensions.moderateScale(22),
        marginBottom: Dimensions.bottomPadding,
    },
    button: {
        borderRadius: Dimensions.moderateScale(22),
        marginTop: Dimensions.moderateScale(16),
        paddingVertical: 11,
    },
});
