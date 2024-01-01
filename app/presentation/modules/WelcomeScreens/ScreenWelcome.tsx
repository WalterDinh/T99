import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem from './FormWelcome';
import { Colors, theme } from 'app/presentation/theme';
import data from './data';
import Dimensions from 'app/presentation/theme/Dimensions';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { StackNavigationProp } from '@react-navigation/stack';
import FormFooter from '../ScreenLogin/FormFooter';
import FormLoginWelcome from './FormLoginWelcome';
import iPhoneXHelper from 'app/shared/helper/IPhoneXHelper';
import { LinkNews } from 'app/shared/constants';

const height = Dimensions.screenHeight();
const width = Dimensions.screenWidth();
interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'WelcomeScreen'>;
}
const CarouselCards = (props: IProps) => {
    const { navigation } = props;
    const [activeSlide, setActiveSlide] = useState(0);

    const pagination = () => {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'transparent',
                    paddingVertical: 0,
                }}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inActiveDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };
    const handlePGD = () => {
        navigation.navigate('MapScreen');
    };
    const handelNews = () => {
        navigation.navigate('WebViewScreen', { url: LinkNews });
    };
    const handelApplication = () => {
        navigation.navigate('LearnAppScreen');
    };
    return (
        <View style={styles.container}>
            <Carousel
                layout="stack"
                onSnapToItem={(index) => setActiveSlide(index)}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={width}
                itemWidth={width}
                scrollEnabled={true}
                loop
                autoplayDelay={2000}
                inactiveSlideShift={1}
                useScrollView={true}
                autoplay={true}
            />
            <View style={styles.paginationStyle}>{pagination()}</View>
            <View style={styles.formLogin}>
                <FormLoginWelcome
                    onLogin={() => navigation.navigate('LoginScreen')}
                    handelRegister={() => navigation.navigate('SignUpScreen')}
                />
            </View>
            <View style={styles.formFooter}>
                <FormFooter
                    handelPGD={handlePGD}
                    handelAdvise={() => navigation.navigate('CenterSupport')}
                    handelNews={handelNews}
                    handelApplication={handelApplication}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.textColor,
    },
    inActiveDot: {
        maxWidth: Dimensions.moderateScale(8),
        height: Dimensions.moderateScale(8),
        backgroundColor: Colors.neutral.s190,
    },
    dotStyle: {
        width: Dimensions.moderateScale(24),
        height: Dimensions.moderateScale(4),
        borderRadius: Dimensions.moderateScale(5),
        backgroundColor: Colors.primary.brand,
    },
    paginationStyle: {
        bottom: Dimensions.bottomPadding * 2 + Dimensions.moderateScale(100),
        alignSelf: 'center',
    },
    formLogin: {
        bottom: Dimensions.moderateScale(60) + Dimensions.bottomPadding,
        zIndex: 8,
        alignSelf: 'center',
        position: 'absolute',
    },
    formFooter: {
        width: Dimensions.screenWidth(),
        zIndex: 1,
        bottom: Dimensions.bottomPadding,
    },
});

export default CarouselCards;
