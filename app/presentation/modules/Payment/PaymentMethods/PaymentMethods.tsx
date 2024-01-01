import { StackNavigationProp } from '@react-navigation/stack';
import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import PaymentAppButton from 'app/presentation/components/paymentAppButton';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { TransactionType } from 'app/shared/constants';
import React, { useState } from 'react';
import { View } from 'react-native';
import { listButtonPaymentMethod } from '../../InformationVerification/constant';
import { styles } from './style';

interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'PaymentMethod'>;
}
const PaymentMethod = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [paymentType, setPaymentType] = useState<
        | 'settlement'
        | 'debtPaymentDue'
        | 'partialRepaymentOfPrincipal'
        | 'paymentOfInterestAndFees'
        | null
    >(null);
    //! Function
    const handlePayment = (type: any) => {
        setPaymentType(type);
    };
    const handleClickContinue = () => {
        if (paymentType === 'settlement') {
            navigation.navigate('Settlement', {transactionType: TransactionType.EarlyRepayment});
        }
        if (paymentType === 'debtPaymentDue') {
            navigation.navigate('DebtPaymentDue', {transactionType: TransactionType.DebtCollectionDue});

        }
        if (paymentType === 'partialRepaymentOfPrincipal') {
            navigation.navigate('PartialRepayment');
        }
        if (paymentType === 'paymentOfInterestAndFees') {
            navigation.navigate('InterestFees');
        }
    };

    //! Render
    return (
        <View style={styles.container}>
            <View>
                <TextPrimary style={styles.title}>
                    {' '}
                    {getString('choosePaymentMethod')}{' '}
                </TextPrimary>
                {listButtonPaymentMethod.map((elm: any, index: number) => {
                    const isActive = elm.type === paymentType;

                    return (
                        <PaymentAppButton
                            onPress={() => handlePayment(elm?.type)}
                            isActive={isActive}
                            name={elm?.title}
                            iconLeft={elm?.icon}
                        />
                    );
                })}
            </View>
            <AppButton
                disabled={!paymentType}
                onPress={handleClickContinue}
                name={getString('continue')}
                type={!paymentType ? ButtonType.CircleBorderGray : undefined}
            />
        </View>
    );
};
export default PaymentMethod;
