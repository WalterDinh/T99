import { StackNavigationProp } from '@react-navigation/stack';
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton';
import DoneScreen from 'app/presentation/components/donescreen';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images } from 'app/presentation/theme';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'SuccessPayment'>;
}
const SuccessPayment = (props: IProps) => {
    const { navigation } = props;

    return (
        <View  style={styles.container}>
            <DoneScreen styleTitle={styles.styleTitle} titleContent={getString('thankYouForTrustingToUseOurService')}  source={Images.Icons.EmptyWalletTick} title='Thanh toán thành công' />
            <AppButton onPress={() => navigation.navigate('Home')} name={getString('goBackHome')} type={ButtonType.CircleBorderRed} />
        </View>
       
    );
};
export default SuccessPayment;
