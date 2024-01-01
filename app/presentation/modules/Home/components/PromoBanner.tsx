import React, { memo } from 'react';
import { View, StyleSheet, ImageBackground, Easing } from 'react-native';
import Carousel, {
    CarouselProps,
    getInputRangeFromIndexes,
} from 'react-native-snap-carousel';
import Dimensions from 'app/presentation/theme/Dimensions';

interface IpropsItem {
    item: any;
    index: number;
}

// function animatedStyles(index: any, animatedValue: any, carouselProps: any) {
//     const sizeRef = carouselProps.vertical
//         ? carouselProps.itemHeight
//         : carouselProps.itemWidth;
//     const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

//     return {
//         zIndex: carouselProps.data.length - index,
//         opacity: animatedValue.interpolate({
//             inputRange: [2, 3],
//             outputRange: [1, 0],
//             extrapolate: 'clamp',
//         }),
//         transform: [
//             {
//                 rotate: animatedValue.interpolate({
//                     inputRange: [-1, 0, 1, 2, 3],
//                     outputRange: ['-25deg', '0deg', '-3deg', '1.8deg', '0deg'],
//                     extrapolate: 'clamp',
//                 }),
//             },
//             {
//                 [translateProp]: animatedValue.interpolate({
//                     inputRange: [-1, 0, 1, 2, 3],
//                     outputRange: [
//                         -sizeRef * 0.5,
//                         0,
//                         -sizeRef, // centered
//                         -sizeRef * 2, // centered
//                         -sizeRef * 3, // centered
//                     ],
//                     extrapolate: 'clamp',
//                 }),
//             },
//         ],
//     };
// }
// function scrollInterpolator4(index: number, carouselProps: CarouselProps<any>) {
//     const range = [3, 2, 1, 0, -1];
//     const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
//     const outputRange = range;

//     return { inputRange, outputRange };
// }

const CarouselCardItem = (props: IpropsItem) => {
    const { item, index } = props;
    return (
        <View  style={[styles.item]} key={index}>
            <ImageBackground
                source={item.imgUrl}
                style={styles.imageItem}
                imageStyle={styles.imageItem}
                resizeMode="stretch"
            />
        </View>
    );
};

interface Iprops {
    dataImg: any;
}
export const PromoBanner = memo((props: Iprops) => {
    const { dataImg } = props;
    const isCarousel = React.useRef(null);
    // const [index, setIndex] = React.useState(0);
    return (
        <View style={styles.container}>
            <Carousel
                layout="stack"
                layoutCardOffset={dataImg.length}
                ref={isCarousel}
                data={dataImg}
                renderItem={CarouselCardItem}
                hasParallaxImages={true}
                sliderWidth={Dimensions.screenWidth()}
                keyExtractor={(item, index) => index.toString()}
                // scrollInterpolator={scrollInterpolator4}
                itemWidth={Dimensions.screenWidth() - 28}
                // nestedScrollEnabled
                // onSnapToItem={(index) => setIndex(index)}
                removeClippedSubviews={false}
                inactiveSlideShift={0}
                renderToHardwareTextureAndroid
                useScrollView={true}
                // slideInterpolatedStyle={animatedStyles as any}
                loop
                // loopClonesPerSide={1}
                autoplayDelay={1000}
                autoplay
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: Dimensions.moderateScale(14),
        alignItems: 'center',
        marginTop: Dimensions.Spacing.extraHuge,
    },
    item: {
        borderRadius: 8,
    },
    imageItem: {
        width: Dimensions.screenWidth() - 28,
        height: Dimensions.moderateScale(120),
        borderRadius: 8,
    },
});
