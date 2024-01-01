import { StyleSheet, View } from 'react-native';
import React from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { AssetType, CheckModeHeader } from 'app/shared/constants';
import FormFooter from '../DetailsContractBorrowing/components/FormFooter';
import images from 'app/assets/images';
import { Colors } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';
interface IProps {
    navigation: StackNavigationProp<ContractParamList, 'InformationQuery'>;
    route: RouteProp<ContractParamList, 'InformationQuery'>;
}

const InformationQuery = (props: IProps) => {
    const { navigation, route } = props;
    const { id, code, assetType } = route.params;
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
                title={getString('detailsContract')}
                source={images.Icons.VectorIcon}
                borderTopWidth={1}
                onPress={() => navigation.navigate('Pdf', { id: id })}
            />
            <FormFooter
                title={getString('paymentPlan')}
                source={images.Icons.VectorIcon}
                onPress={() => navigation.navigate('PaymentPlan', { id: id })}
            />
            <FormFooter
                title={getString('paymentHistory')}
                source={images.Icons.VectorIcon}
                onPress={() =>
                    navigation.navigate('HistoryPayment', { id: id })
                }
            />
        </View>
    );
};

export default InformationQuery;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutral.white,
        flex: 1,
    },
    borderNone: {
        borderBottomWidth: 0,
    },
});
