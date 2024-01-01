import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import images from 'app/assets/images';
import { BannerLearnApp } from './BannerLearnApp';
import { Dimensions } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';

const dataPromo = [
    {
        id: 1,
        title: getString('digitalFinance'),
        subTitle:
            'Lãi suất hấp dẫn và cạnh tranh\nThủ tục đơn giản và giải ngân nhanh chóng\nPháp lý rõ ràng',
    },
    {
        id: 2,
        title: getString('digitalInsurance'),
        imgUrl1: images.Icons.base1,
        imgUrl2: images.Icons.base2,
        imgUrl3: images.Icons.base3,
        subTitle: getString('providingInsurance'),
    },
];
const FeaturedProductsScreen = () => {
    return (
        <View style={styles.container}>
            <BannerLearnApp dataImg={dataPromo} />
        </View>
    );
};

export default FeaturedProductsScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom: Dimensions.moderateScale(32),
    },
});
