import { StackNavigationProp } from '@react-navigation/stack';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { changeWalletSuccess } from 'app/presentation/redux/actions/payments';
import generalSelector from 'app/presentation/redux/selectors/general';
import { Images } from 'app/presentation/theme';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listOnlinePayment } from '../../InformationVerification/constant';
import { styles } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'OnlinePayment'>;
}
const OnlinePayment = (props: IProps) => {
    const { navigation } = props;
    const { paymentsReducer } = useSelector(
        generalSelector.selectPaymentReducer,
    );
    const dispatch = useDispatch();
    const [onlinePaymentType, setOnlinePaymentType] = useState<
        'momo' | 'viettelPay' | 'vnpt' | null
    >(paymentsReducer?.data || 'momo');
    const handleItem = (type: any) => setOnlinePaymentType(type);
    const handleSubmit = () => {
        dispatch(changeWalletSuccess(onlinePaymentType));
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View>
                <TextPrimary style={styles.title}>
                    {getString('listWallet')}
                </TextPrimary>
                {listOnlinePayment.map((elm: any, index: any) => {
                    const isActive = elm.type === onlinePaymentType;
                    return (
                        <TouchableOpacity
                            onPress={() => handleItem(elm?.type)}
                            style={styles.btnItem}
                        >
                            <View style={styles.contentLeft}>
                                <ImageRenderer
                                    style={styles.contentLeftImg}
                                    source={elm?.icon}
                                />
                                <TextPrimary style={styles.btnItemText}>
                                    {elm?.title}
                                </TextPrimary>
                            </View>
                            {isActive && (
                                <ImageRenderer
                                    style={styles.img}
                                    source={Images.Icons.CheckMarkNoBorder}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
            <AppButton
                onPress={handleSubmit}
                type={
                    !onlinePaymentType
                        ? ButtonType.CircleBorderGray
                        : ButtonType.CircleBorderRed
                }
                disabled={!onlinePaymentType}
                name={getString('confirm')}
            />
        </View>
    );
};
export default OnlinePayment;
