import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dimensions from 'app/presentation/theme/Dimensions';
import { TextPrimary } from 'app/presentation/components';
import { Colors, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import { Item } from './Item';
import Img from 'app/assets/images';

interface IpropsItem {
    item: any;
    index: number;
}
const dataDigitalFinancelBlock = [
    {
        text: getString('t99'),
        title: 'Golf',
        source: Img.Icons.Golf,
        type: 'golf',
    },
    {
        text: getString('t99'),
        title: 'Pawn',
        source: Img.Icons.Pawn,
        type: 'pawn',
    },
    {
        text: getString('t99'),
        title: 'Invest',
        source: Img.Icons.Wallet,
        type: 'invest',
    },
    {
        text: getString('t99'),
        title: 'Saving',
        source: Img.Icons.Crown,
        type: 'saving',
    },
];

const CarouselCardItem = (props: IpropsItem) => {
    const { item, index } = props;
    return (
        <View style={styles.item} key={index}>
            <View style={item.id !== 2 ? styles.formSlide : styles.formSlide2}>
                <TextPrimary style={styles.title}>{item.title}</TextPrimary>
                {item.id === 1 ? (
                    <View style={styles.formImage}>
                        {(dataDigitalFinancelBlock || [])?.map(
                            (item, index) => {
                                return (
                                    <Item
                                        text={item?.text}
                                        title={item?.title}
                                        source={item?.source}
                                        onPressBlock={() => {}}
                                    />
                                );
                            },
                        )}
                    </View>
                ) : (
                    <View style={styles.formImage2}>
                        <ImageBackground
                            source={item.imgUrl1}
                            style={styles.imageItem2}
                            resizeMode="cover"
                        />
                        <ImageBackground
                            source={item.imgUrl2}
                            style={styles.imageItem2}
                            resizeMode="cover"
                        />
                        <ImageBackground
                            source={item.imgUrl3}
                            style={styles.imageItem2}
                            resizeMode="cover"
                        />
                        {item.id === 1 && (
                            <ImageBackground
                                source={item.imgUrl4}
                                style={styles.imageItem2}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                )}

                <TextPrimary
                    style={item.id === 1 ? styles.subTitle : styles.subTitle2}
                >
                    {item.subTitle}
                </TextPrimary>
            </View>
        </View>
    );
};

interface Iprops {
    dataImg: any;
}
const SLIDER_WIDTH = Dimensions.screenWidth() - Dimensions.moderateScale(45);
export const BannerLearnApp = (props: Iprops) => {
    const { dataImg } = props;
    const isCarousel = React.useRef(null);
    const [index, setIndex] = React.useState(0);
    return (
        <>
            <View style={styles.container}>
                <TextPrimary style={styles.titleHeader}>
                    {getString('featuredProducts')}
                </TextPrimary>
                <Pagination
                    dotsLength={2}
                    activeDotIndex={index}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        paddingVertical: 0,
                        position: 'absolute',
                        bottom: 12,
                        alignSelf: 'center',
                    }}
                    dotStyle={styles.dotStyle}
                    inactiveDotStyle={styles.inActiveDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
            <Carousel
                containerCustomStyle={{
                    position: 'absolute',
                    zIndex: 99,
                    top: 88,
                    left: 10,
                }}
                layout="default"
                layoutCardOffset={dataImg.length}
                ref={isCarousel}
                data={dataImg}
                renderItem={CarouselCardItem}
                sliderWidth={Dimensions.screenWidth()}
                itemWidth={SLIDER_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                inactiveSlideShift={0}
                useScrollView={true}
                autoplayDelay={1000}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Dimensions.moderateScale(16),
        marginTop: Dimensions.Spacing.extraHuge,
        backgroundColor: Colors.neutral.white,
        paddingBottom: Dimensions.Spacing.extraHuge,
        borderRadius: Dimensions.moderateScale(12),
        height: 400,
        zIndex: 1,
    },
    titleHeader: {
        fontSize: Dimensions.moderateScale(20),
        alignSelf: 'center',
        paddingVertical: Dimensions.moderateScale(16),
    },
    formSlide: {
        backgroundColor: Colors.primary.brand,
        borderRadius: Dimensions.moderateScale(16),
        height: Dimensions.moderateScale(313),
    },
    formSlide2: {
        backgroundColor: Colors.secondary.brand,
        borderRadius: Dimensions.moderateScale(16),
        height: Dimensions.moderateScale(313),
    },
    title: {
        alignSelf: 'center',
        fontSize: Dimensions.moderateScale(17),
        fontFamily: theme.font.Medium,
        color: Colors.neutral.white,
        paddingVertical: Dimensions.moderateScale(16),
    },
    item: {
        paddingRight: Dimensions.moderateScale(16),
        width: SLIDER_WIDTH,
    },
    formImage: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    formImage2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: Dimensions.moderateScale(50),
    },
    imageItem: {
        width: Dimensions.moderateScale(85),
        height: Dimensions.moderateScale(126),
    },
    imageItem2: {
        width: Dimensions.moderateScale(85),
        height: Dimensions.moderateScale(85),
    },
    subTitle: {
        textAlign: 'center',
        color: Colors.neutral.white,
        fontSize: Dimensions.moderateScale(15),
        lineHeight: Dimensions.moderateScale(30),
        marginTop:Dimensions.moderateScale(16),
        marginBottom:Dimensions.moderateScale(16),
    },
    subTitle2: {
        paddingTop: Dimensions.moderateScale(40),
        paddingBottom: Dimensions.moderateScale(30),
        paddingHorizontal: Dimensions.moderateScale(16),
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.neutral.white,
        fontSize: Dimensions.moderateScale(15),
        lineHeight: Dimensions.moderateScale(22),
    },
    inActiveDot: {
        maxWidth: Dimensions.moderateScale(8),
        height: Dimensions.moderateScale(8),
        backgroundColor: Colors.neutral.s600,
    },
    dotStyle: {
        width: Dimensions.moderateScale(24),
        height: Dimensions.moderateScale(4),
        borderRadius: Dimensions.moderateScale(5),
        backgroundColor: Colors.primary.brand,
    },
});
