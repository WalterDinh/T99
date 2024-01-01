import { StackNavigationProp } from '@react-navigation/stack';
import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import React from 'react';
import { View } from 'react-native';
import FormContract from '../../ContractManagement/FormContract';
import { styles } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'ContractPayments'>;
}
const ContractPayments = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.title}>
                {getString('selectTypeOfPaymentContract')}
            </TextPrimary>
                <FormContract
                    source={images.Icons.UserSquare}
                    onPress={() => navigation.navigate('PaymentMethod')}
                    title={getString('payMyContract')}
                    />
                <FormContract
                    source={images.Icons.People}
                    title={getString('paySomeoneElseContract')}
                    onPress={() => navigation.navigate('PaySomeoneContract')}
                />
        </View>
    );
};

export default ContractPayments;
