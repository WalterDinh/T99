import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, stopClock } from 'react-native-reanimated';
import Images from 'app/assets/images/index';
import Dimensions from 'app/presentation/theme/Dimensions';
import ImageRenderer from '../image/ImageRenderer';

const screenWidth = Dimensions.screenWidth();
const imageSize = {
    width: screenWidth,
    height: Dimensions.screenHeight(),
};
const animatedWidth = screenWidth + imageSize.width;

const {
    useCode,
    block,
    set,
    Value,
    Clock,
    eq,
    clockRunning,
    not,
    cond,
    startClock,
    timing,
    interpolate,

    and,
} = Animated;

const runTiming = (clock: Animated.Clock) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 3000,
        toValue: 1,
        easing: Easing.inOut(Easing.cubic),
    };

    return block([
        cond(
            not(clockRunning(clock)),
            set(state.time, 0),
            timing(clock, state, config),
        ),
        cond(eq(state.finished, 1), [
            set(state.finished, 0),
            set(state.frameTime, 0),
            set(state.time, 0),
        ]),
        state.position,
    ]);
};

export const AnimatedBackground = () => {
    const { progress, clock, isPlaying } = useMemo(
        () => ({
            progress: new Value(0),
            isPlaying: new Value(1),
            clock: new Clock(),
        }),
        [],
    );

    useCode(
        () =>
            block([
                cond(
                    and(not(clockRunning(clock)), eq(isPlaying, 1)),
                    startClock(clock),
                ),
                cond(
                    and(clockRunning(clock), eq(isPlaying, 0)),
                    stopClock(clock),
                ),
                set(progress, runTiming(clock)),
            ]),
        [progress, clock],
    );

    const translateX = interpolate(progress, {
        inputRange: [-0.1, 1],
        outputRange: [1, -imageSize.width * 0.55],
    });

    const fadeAnim = interpolate(progress, {
        inputRange: [0, 0.1],
        outputRange: [0.1, 1],
    });
    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.image, { transform: [{ translateX }] }]}
            >
                <ImageRenderer
                    style={styles.image}
                    source={Images.Backgrounds.SplashBackground}
                    resizeMode="cover"
                />
            </Animated.View>
            <Animated.View style={{ ...styles.text, opacity: fadeAnim }}>
                <ImageRenderer
                    source={Images.Backgrounds.SplashText}
                    resizeMode={'contain'}
                    style={styles.textImage}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        zIndex: 10,
        width: animatedWidth,
        height: Dimensions.screenHeight(),
    },
    text: {
        position: 'absolute',
        bottom: 122 + Dimensions.bottomPadding,
        width: screenWidth,
        zIndex: 99,
        alignItems: 'center',
    },
    textImage: {
        width: screenWidth * 0.9,
        height: 123,
    },
});
