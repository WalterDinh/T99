import { ImageBackground, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Img from 'app/assets/images'
import { ImageRenderer, TextPrimary } from 'app/presentation/components'
import { Dimensions, theme } from 'app/presentation/theme'
import Carousel from 'react-native-snap-carousel'
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton'


interface PropsItem {
    item: any;
    index: number;
}
const UtilitiesItem = (props: PropsItem) => {
    const { index, item } = props

    return (
        <View style={styles.item} key={index} >
            <ImageRenderer source={item.imgUrl} style={styles.icon} />
            <View style={styles.description}>
                <TextPrimary numberOfLines={2} style={styles.text} >{item.title}</TextPrimary>
                <AppButton type={ButtonType.SquareGraySecondary} name={item.nameBtn} onPress={item.onPressBtn} />
            </View>
        </View>
    );
};
interface IProps {
    title?: string;
    dataBlock: any;
}
const Utilities = React.memo((props: IProps) => {
    const { title, dataBlock } = props
    const isCarousel = React.useRef(null);
    const [index, setIndex] = React.useState(0);
    return (
        <ImageBackground
            source={Img.Backgrounds.BackgroundUtilitiesDigitalFinance}
            style={styles.container}
            imageStyle={styles.imgContainerStyle}
        >
            <View style={styles.header}>
                <TextPrimary style={styles.titleFeature}>{title}</TextPrimary>
            </View>
            <View style={styles.content}>
                <Carousel
                    layout="default"
                    ref={isCarousel}
                    activeSlideAlignment={'center'}
                    data={dataBlock}
                    renderItem={UtilitiesItem}
                    sliderWidth={Dimensions.screenWidth() * 0.60}
                    itemWidth={Dimensions.screenWidth() * 0.52}
                    onSnapToItem={(index) => setIndex(index)}
                    useScrollView={true}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                />
            </View>
        </ImageBackground>
    )
})

export default Utilities

const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.Spacing.extraLarge,
        paddingBottom: 28,
    },
    imgContainerStyle: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Dimensions.Spacing.large,
    },
    titleFeature: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.extraLarge,
        color: theme.color.textColor,
    },
    content: {
        marginTop: Dimensions.Spacing.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: theme.color.backgroundColorVariant,
        borderRadius: Dimensions.Spacing.small,
        marginRight: Dimensions.Spacing.large,
        shadowColor: theme.color.backgroundColorVariant,

        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 5,
    },
    icon: {
        height:  Dimensions.moderateScale(102),
        width: '100%',
        borderTopLeftRadius: Dimensions.Spacing.tiny,
        borderTopRightRadius: Dimensions.Spacing.tiny,
    },
    text: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge,
        color: theme.color.textColor,
        marginBottom: Dimensions.Spacing.medium,
        minHeight: Dimensions.moderateScale(45),
    },

    description: {
        padding: Dimensions.Spacing.large,
    },
})


