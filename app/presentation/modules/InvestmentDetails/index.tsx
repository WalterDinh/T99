import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import images from 'app/assets/images';
import Dimensions from 'app/presentation/theme/Dimensions';
import { TextPrimary } from 'app/presentation/components';
import { Colors } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import { useNavigation } from '@react-navigation/native';

const InvestmentDetail = ({ route }: any) => {
    const navigation = useNavigation();
    const { itemId, itemTitleHeader, itemHeaderDone, itemTitleHeaderStatus } =
        route.params;

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.imageBackground}
                source={images.Backgrounds.Background}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('DetailsContract', {
                                itemId: itemId,
                                itemTitleHeader: itemTitleHeader,
                        })
                    }
                >
                <View style={styles.content}>
                    <TextPrimary style={styles.textContract}>
                        {getString('investmentContract')}
                    </TextPrimary>
                        <View style={{ flexDirection: 'row' }} >
                        <TextPrimary style={styles.textId}>
                            {itemId}
                            {' - '}
                        </TextPrimary>
                        <TextPrimary style={styles.textId}>
                            {itemTitleHeader}
                        </TextPrimary>
                        </View>
                    <View
                        style={[
                            styles.status,
                            {
                                backgroundColor:
                                    itemHeaderDone === 'success'
                                        ? '#6AA84F0D'
                                        : '#FFF1B880',
                            },
                        ]}
                    >
                        <TextPrimary
                            style={{
                                fontSize: Dimensions.moderateScale(12),
                                color:
                                    itemHeaderDone === 'success'
                                        ? Colors.success.brand
                                        : Colors.warning.brand,
                            }}
                        >
                            {itemTitleHeaderStatus}
                        </TextPrimary>
                    </View>
                </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default InvestmentDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: Dimensions.moderateScale(38),
    },
    textContract: {
        fontSize: Dimensions.moderateScale(15),
    },
    textId: {
        fontSize: Dimensions.moderateScale(20),
        color: Colors.secondary.brand,
        paddingVertical: Dimensions.moderateScale(8),
    },
    status: {
        borderRadius: Dimensions.moderateScale(26),
        paddingHorizontal: Dimensions.moderateScale(12),
        paddingVertical: Dimensions.moderateScale(6),
    },
});
