import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { theme, Dimensions } from 'app/presentation/theme';
import { ImageRenderer } from 'app/presentation/components';

interface PropsItem {
    item: any;
    index: number;
}
const BannerHeaderItem = (props: PropsItem) => {
    const { item, index } = props;
    return (
        <View style={styles.container} key={index}>
            <ImageRenderer
                resizeMode="cover"
                source={item.imgUrl}
                style={styles.image}
            />
        </View>
    );
};
interface Iprops {
    dataBanner: any;
}
const BannerHeader = (props: Iprops) => {
    const { dataBanner } = props;
    const isCarousel = React.useRef(null);
    const [index, setIndex] = React.useState(0);
    return (
        <View>
            <Carousel
                layout="default"
                ref={isCarousel}
                data={dataBanner}
                renderItem={BannerHeaderItem}
                sliderWidth={Dimensions.screenWidth()}
                itemWidth={Dimensions.screenWidth()}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
                autoplay
                loop
                autoplayDelay={1000}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />
            <Pagination
                dotsLength={dataBanner.length}
                activeDotIndex={index}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.inactiveDot}
                inactiveDotOpacity={1}
                containerStyle={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                }}
            />
        </View>
    );
};

export default BannerHeader;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.screenWidth(),
    },
    image: {
        width: Dimensions.screenWidth(),
        height: Dimensions.moderateScale(210),
    },
    dot: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.color.colorFourth,
    },
});
