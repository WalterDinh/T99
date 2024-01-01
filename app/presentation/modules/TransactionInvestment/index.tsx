import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { Colors } from 'app/presentation/theme';
import images from 'app/assets/images';
import FormFooter from '../DetailsContractBorrowing/components/FormFooter';
import { getString } from 'app/presentation/localization';
import { CheckModeHeader } from 'app/shared/constants';

const TransactionInvestmentScreen = ({ route }: any) => {
    const navigation = useNavigation();
    const { itemId, itemTitleHeader } = route.params;
    return (
        <View style={styles.container}>
            <CommonCard
                headerTitleTopHalf={itemTitleHeader}
                headerTitleBottomHalf={itemId}
                checkMode={CheckModeHeader?.TwoActive}
                disabled
            />
            <FormFooter
                title={getString('requestDisbursement')}
                source={images.Icons.VectorIcon}
                borderTopWidth={1}
                onPress={() =>
                    navigation.navigate('RequestDisbursement', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
            <FormFooter
                title={getString('payment')}
                source={images.Icons.VectorIcon}
                onPress={(() => navigation.navigate('PaymentMethod'))}
            />
            <FormFooter
                title={getString('loanExtension')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('LoanExtension', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
            <FormFooter
                title={getString('requestFeeWaiver')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('RequestFeeWaiver', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
            <FormFooter
                title={getString('requestChangeRepayment')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('RequestChangePayment', {
                        itemId: itemId,
                        itemTitleHeader: itemTitleHeader,
                    })
                }
            />
        </View>
    );
};

export default TransactionInvestmentScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        flex: 1,
    },
});
