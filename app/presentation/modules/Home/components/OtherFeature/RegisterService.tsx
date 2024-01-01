import { StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import Img from '../../../../../assets/images';
import { Item } from './Item';
import { styles } from './styles';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import Toast from 'react-native-toast-message';
import { StatusToast } from 'app/shared/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import VerifyUserEkycDataModel from 'app/models/ekyc/VerifyUserEkycDataModel';
import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';

interface IProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    imgPath?: any;
    unread?: boolean;
    navigation: StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
}

const RegisterService = (props: IProps) => {
    const { style, title, navigation } = props;
    const verifyUserDataReducer: VerifyUserEkycDataModel = useSelector(
        CustomerSelectors.selectVerifyUserDataReducer,
    ).data;
    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <TextPrimary style={styles.titleFeature}>{title}</TextPrimary>
            </View>
            <View style={styles.content}>
                <Item
                    onPress={() => {
                        verifyUserDataReducer?.isEkyc
                            ? navigation.navigate('EkycSuccess')
                            : navigation.navigate('EkycStack');
                    }}
                    text={getString('accountVerification2')}
                    source={Img.Icons.AccountVerification}
                />
                <Item
                    onPress={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                    text={getString('smartOpt')}
                    source={Img.Icons.SmartOtp}
                    styleBtn={{ marginHorizontal: Dimensions.Spacing.large }}
                />
                <Item
                    onPress={() => {
                        Toast.show({
                            type: StatusToast.Warning,
                            text2: getString('featureImproving'),
                        });
                    }}
                    text={getString('offerPackage')}
                    source={Img.Icons.OfferPackage}
                />
            </View>
        </View>
    );
};

export default RegisterService;
