import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, CheckStatusText } from 'app/shared/constants';
import styled from 'styled-components';
import images from 'app/assets/images';
import { useNavigation } from '@react-navigation/native';
import FormBorrowingStatus from './FormBorrowingStatus';
import FormFooter from './FormFooter';

const DetailsContract = ({ route }: any) => {
    const navigation = useNavigation();
    const { itemId, itemTitleHeader } = route.params;
    const renderItem = () => {
        return (
            <CommonCard
                disabled
                headerTitleTopHalf={itemTitleHeader}
                headerTitleBottomHalf={itemId}
                checkMode={CheckModeHeader?.TwoActive}
                dataCard={[
                    {
                        title: getString('enterFullname2'),
                        value: 'Nguyễn Thị A',
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('dateSuccess'),
                        value: '17/05/2022',
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('termLimit'),
                        value: '06 tháng',
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('disbursementForm'),
                        value: '1 lần',
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('statusContract'),
                        value: 'Đang vay',
                        styleValue: {
                            fontFamily: theme.font.Medium,
                            fontSize: Dimensions.moderateScale(15),
                        },
                        status: CheckStatusText.Error,
                    },
                    {
                        title: getString('amountBorrowing'),
                        value: 900000000,
                        currency: true,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('estimatedContract'),
                        value: 45000000,
                        currency: true,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('estimatedContractAmount'),
                        value: 45000000,
                        currency: true,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('insurance'),
                        value: 11000000,
                        currency: true,
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                    {
                        title: getString('salesStaffCode'),
                        value: 'ABC123',
                        styleValue: { fontSize: Dimensions.moderateScale(15) },
                    },
                ]}
            />
        );
    };
    return (
        <ScrollView>
            <FormBorrowingStatus
                titleBorrowing={getString('borrowingStatus')}
                borrowingValue={'1,100,000,000 VNĐ'}
                paidValue={'500,000,000 VNĐ'}
                debtValue={'600,000,000 VNĐ'}
            />
            <View style={styles.formContent}>
                <View style={styles.formTitleInfoContract}>
                    <TextPrimary style={styles.textTitleInfoContract}>
                        {getString('contractInfo')}
                    </TextPrimary>
                </View> 
            </View>
            <FlatList
                data={[1]}
                renderItem={renderItem}
                style={{ marginBottom: Dimensions.moderateScale(8) }}
            />
            <FormFooter title={getString('details')} disabled  />
            <FormFooter
                title={getString('informationQuery')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('InformationQuery', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
            <FormFooter
                title={getString('deal')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('Transaction', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
        </ScrollView>
    );
};

export default DetailsContract;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    formTitleInfoContract: {
        marginHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.moderateScale(16),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale2,
    },
    textTitleInfoContract: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
    formContent: {
        backgroundColor: Colors.neutral.white,
    },
});
