import {
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Dimensions from 'app/presentation/theme/Dimensions';
import styled from 'styled-components';
import images from 'app/assets/images';
import { MyFlatList, TextPrimary } from 'app/presentation/components';
import { Colors } from 'app/presentation/theme';
import ItemAccount from './ItemAccount';
import { getString } from 'app/presentation/localization';
import data from './data';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.screenHeight();
const ScreenAccount = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }: any) => {
        return (
            <ItemAccount
                source={item.source}
                bankName={item.bankName}
                accountNameValue={item.accountNameValue}
                accountNumberValue={item.accountNumberValue}
                onPressBankName={() =>
                    navigation.navigate('BeneficiaryAccountScreen', {})
                }
                color={Colors.secondary.brand}
                styleContainer={{ marginBottom: Dimensions.moderateScale(16) }}
            />
        );
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.formItem}>
                <View style={styles.formBankName}>
                    <View style={styles.formImageBank}>
                        <ImageIconCircle
                            source={images.Icons.imageBank1}
                            style={{ width: 32, height: 32 }}
                        />
                    </View>
                    <View style={styles.formTextBank}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('BeneficiaryAccountScreen')
                            }
                        >
                            <TextPrimary style={styles.textBankName}>
                                {getString('bankName')}
                            </TextPrimary>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formSubTextBankName}>
                        <TextPrimary style={styles.textSub}>
                            {getString('default')}
                        </TextPrimary>
                    </View>
                </View>
                <View style={styles.formInfoAccount}>
                    <View>
                        <TextPrimary style={styles.textAccount}>
                            {getString('accountName')}
                        </TextPrimary>
                    </View>
                    <TextPrimary
                        style={[
                            styles.textAccountValue,
                            { color: Colors.neutral.s400, flex: 2 },
                        ]}
                    >
                        {getString('accountNameValue')}
                    </TextPrimary>
                </View>
                <View style={styles.formAccountNumber}>
                    <TextPrimary style={styles.textAccount}>
                        {getString('accountNumber')}
                    </TextPrimary>
                    <TextPrimary
                        style={[
                            styles.textAccountValue,
                            { color: Colors.neutral.s400, flex: 2 },
                        ]}
                    >
                        {getString('accountNumberValue')}
                    </TextPrimary>
                </View>
            </View>
            <FlatList data={data} renderItem={renderItem} />
        </ScrollView>
    );
};

export default ScreenAccount;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    container: {
        paddingTop: Dimensions.moderateScale(16),
        paddingHorizontal: Dimensions.moderateScale(16),
        marginBottom: Dimensions.moderateScale(16),
        height: height,
    },
    formItem: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderRadius: Dimensions.moderateScale(8),
        paddingVertical: Dimensions.moderateScale(16),
        marginBottom: Dimensions.moderateScale(16),
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
    formBankName: {
        flexDirection: 'row',
    },
    formImageBank: {
        marginRight: Dimensions.moderateScale(8),
    },
    formTextBank: {
        flex: 1,
        marginRight: Dimensions.moderateScale(8),
    },
    textBankName: {
        color: Colors.secondary.brand,
    },
    formSubTextBankName: {
        backgroundColor: 'rgba(229, 32, 53, 0.2)',
        borderRadius: Dimensions.moderateScale(26),
        paddingHorizontal: Dimensions.moderateScale(12),
        paddingVertical: Dimensions.moderateScale(6),
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.moderateScale(28),
    },
    textSub: {
        fontSize: Dimensions.moderateScale(12),
        color: Colors.primary.s600,
    },
    formInfoAccount: {
        marginTop: Dimensions.moderateScale(7),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: Dimensions.moderateScale(12),
        borderColor: Colors.neutral.grayScale2,
        marginBottom: Dimensions.moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAccount: {
        fontSize: Dimensions.moderateScale(15),
        flex: 1,
    },
    formAccountNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAccountValue: {
        paddingLeft: Dimensions.moderateScale(32),
        textAlign: 'right',
    },
});
