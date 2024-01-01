import { StackNavigationProp } from '@react-navigation/stack';
import { TextPrimary } from 'app/presentation/components';
import Accordion from 'app/presentation/components/accordion';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import PaymentAppButton from 'app/presentation/components/paymentAppButton';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images } from 'app/presentation/theme';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { listButtonSelectMethodPay } from '../../InformationVerification/constant';
import { styles } from './style';
import generalSelector from 'app/presentation/redux/selectors/general';

interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'SelectMethodPay'>;
}
const SelectMethodPay = (props: IProps) => {
    //! State
    const { navigation } = props;
    const { paymentsReducer } = useSelector(
        generalSelector.selectPaymentReducer,
    );
    const onlinePaymentType = paymentsReducer?.data;
    
    const walletDefault = 'Ví Momo';
    const [paymentType, setPaymentType] = useState<
        'onlinePayment' | 'payCashStore' | 'payTransfer' | null
    >(null);
    //! Function
    const handlePayment = (type: any) => {
        setPaymentType(type);
    };
    const handleClickContinue = () => {
        if (paymentType === 'onlinePayment') {
            navigation.navigate('SuccessPayment');
        }
        if (paymentType === 'payCashStore') {
            navigation.navigate('PayCashStore');
        }
        if (paymentType === 'payTransfer') {
            navigation.navigate('PayTransfer');
        }
    };

    //! Render
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.contentTitle}>
                    <TextPrimary style={styles.title}>
                        {getString('selectMethodPay')}{' '}
                    </TextPrimary>
                </View>
                <View style={styles.contentItem}>
                    {listButtonSelectMethodPay.map((elm: any, index: number) => {
                        const isActive = elm.type === paymentType;
                        const isOnlinePayment = elm.type == 'onlinePayment';
                        return isActive && isOnlinePayment ? (
                            <Accordion
                                onPress={() =>
                                    navigation.navigate('OnlinePayment')
                                }
                                wallet={walletDefault}
                                name={getString('onlinePayment')}
                                iconLeft={Images.Icons.OnlinePayMent}
                            />
                        ) : (
                            <PaymentAppButton
                                onPress={() => handlePayment(elm?.type)}
                                isActive={isActive}
                                name={elm?.title}
                                iconLeft={elm?.icon}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={styles.btn}>
                <AppButton
                    onPress={handleClickContinue}
                    name={getString('pay')}
                    disabled={!paymentType}
                    type={!paymentType ? ButtonType.CircleGray : undefined}
                />
            </View>
        </View>
    );
};
export default SelectMethodPay;
