import Clipboard from '@react-native-community/clipboard';
import { StackNavigationProp } from '@react-navigation/stack';
import AccountBankRepository from 'app/data/repository/accoutbank';
import { GetListAccountT99BankUseCase } from 'app/domain/customer/accountbank/GetListAccountT99BankUseCase';
import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import ItemBank from 'app/presentation/components/items/ItemBank';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { styles } from './style';
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'PayTransfer'>;
}
const PayTransfer = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [listAccountBank, setListAccount] = useState<ListAccountBankModel[]>(
        [],
    );
    const copyValue = 'Tất toán hợp đồng_A3004563';
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetListAccountT99BankUseCase(new AccountBankRepository())
            .execute()
            .then((res) => {
                // console.log('res', res);

                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    const dataListParse = res?.data.data.map((e) =>
                        ListAccountBankModel.parseFromJson(e),
                    );
                    setListAccount(dataListParse);
                } else {
                    Toast.show({
                        type: StatusToast.Error,
                        text2: getString([
                            `errors.${res?.data?.message}`,
                            'errorMessageCommon',
                        ]),
                    });
                }
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    }, []);

    //! Function
    const renderItem = ({ item }: { item: ListAccountBankModel }) => {
        return (
            <ItemBank
                accName={item.creatorText}
                cityName={''}
                accountNumber={item.numberAccount}
                nameBank={item.name}
                styleItemBank={{
                    marginVertical: Dimensions.Spacing.small,
                }}
                source={{ uri: item.logo }}
            />
        );
    };
    const copyToClipboard = () => {
        Clipboard.setString(copyValue!);
    };

    //! Render
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.title}>
                {getString('pleaseCopyPaymentContent')}
            </TextPrimary>
            <View style={styles.copy}>
                <TextPrimary style={styles.copyValue}>{copyValue}</TextPrimary>
                <TouchableOpacity onPress={copyToClipboard}>
                    <ImageRenderer
                        style={styles.imgIcon}
                        source={Images.Icons.CopyOutlinedRed}
                    />
                </TouchableOpacity>
            </View>
            <TextPrimary style={styles.listAccountT99}>
                {getString('listAccountT99')}
            </TextPrimary>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={listAccountBank}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem}
            />

            <AppButton
                type={ButtonType.CircleBorderRed}
                name={getString('goBackHome')}
                textStyle={{
                    fontSize: Dimensions.FontSize.extraLarge,
                    fontFamily: theme.font.Medium,
                }}
                styleBtn={{
                    borderRadius: Dimensions.moderateScale(22),
                    paddingVertical: Dimensions.moderateScale(12),
                }}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};
export default PayTransfer;
