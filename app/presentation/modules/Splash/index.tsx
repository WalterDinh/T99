import { AnimatedBackground } from 'app/presentation/components/backgroundimage/BackgroundImageAnimation';
import React from 'react';
import { View } from 'react-native';
import Animations from 'app/assets/animation/index'
const SplashScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <AnimatedBackground />
            {/* <Lottie source={Animations.Splash} autoPlay loop enableMergePathsAndroidForKitKatAndAbove/> */}
        </View>
    );
};

export default SplashScreen;
