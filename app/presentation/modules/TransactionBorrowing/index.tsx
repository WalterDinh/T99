import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { Colors } from 'app/presentation/theme';
import images from 'app/assets/images';
import FormFooter from '../DetailsContractBorrowing/components/FormFooter';
import { getString } from 'app/presentation/localization';
import { AssetType, CheckModeHeader } from 'app/shared/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';

interface IProps {
    navigation: StackNavigationProp<
        ContractParamList,
        'BorrowingContractDetails'
    >;
    route: any;
}
const TransactionBorrowingScreen = (props: IProps) => {
    const {navigation, route} = props
    const { itemId, code, assetType, loanAmount } = route.params;

    let title = '';
    switch (assetType) {
        case AssetType.Golf:
            title = getString('t99Golfer');
            break;
        case AssetType.Pledge:
            title = getString('t99Pledge');
            break;
        case AssetType.RealEstate:
            title = getString('t99RealEstate');
            break;
        default:
            break;
    }
    return (
        <View style={styles.container}>
            <CommonCard
                disabled
                customStyleHeaderCardContainer={styles.borderNone}
                headerTitleTopHalf={title}
                headerTitleBottomHalf={code}
                checkMode={CheckModeHeader?.TwoActive}
            />
            <FormFooter
                title={getString('requestDisbursement')}
                source={images.Icons.VectorIcon}
                borderTopWidth={1}
                onPress={() =>
                    navigation.navigate('RequestDisbursement', {
                        itemId: itemId,
                        itemTitleHeader: title,
                        code: code,
                        loanAmount: loanAmount,
                        assetType: assetType,
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
                        itemTitleHeader: title,
                        code: code,
                        loanAmount: loanAmount,
                        assetType: assetType,
                    })
                }
            />
            <FormFooter
                title={getString('requestFeeWaiver')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('RequestFeeWaiver', {
                        itemId: itemId,
                        itemTitleHeader: title,
                        code: code,
                        loanAmount: loanAmount,
                        assetType: assetType,
                    })
                }
            />
            <FormFooter
                title={getString('requestChangeRepayment')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('RequestChangePayment', {
                        itemId: itemId,
                        itemTitleHeader: title,
                        code: code,
                        loanAmount: loanAmount,
                        assetType: assetType,
                    })
                }
            />
        </View>
    );
};

export default TransactionBorrowingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        flex: 1,
    },
    borderNone: {
        borderBottomWidth: 0,
    },
});
