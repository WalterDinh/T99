import { StackNavigationProp } from '@react-navigation/stack';
import images from 'app/assets/images';
import ListAccountBankModel from 'app/models/AccountBank/ListAccountBankModel';
import { BackgroundImage } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { BeneficiaryParamList } from 'app/presentation/navigation/routes/routeParams';
import { getAccountBenefitRequest } from 'app/presentation/redux/actions/accountBenefits';
import BankSelectors from 'app/presentation/redux/selectors/bank';
import Dimensions from 'app/presentation/theme/Dimensions';
import { IReducer } from 'app/shared/interfaces/common';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemAccount from './ItemAccount';
import ScreenNotAccount from './ScreenNotAccount';



export type ParamsGetAccountBenefit = {
    id: string;
    name: string;
    isSetDefault: boolean;
    numberAccount: string;
    creatorText: string;
    logo: string;
};
interface IProps {
    navigation: StackNavigationProp<
        BeneficiaryParamList,
        'BeneficiaryScreen'
    >;
    route?: any;

}
const BeneficiaryInformation = (props: IProps) => {
    const { navigation, route } = props
    const isUpdate = route?.params;
    const [dataList, setDataList] = useState<ListAccountBankModel[]>([]);
    const dispatch = useDispatch();
    const accountBenefitSelectors: IReducer<any> = useSelector(
        BankSelectors.selectAccountBenefitReducer,
    )?.accountBenefitReducer || {};

    //! Function
    useEffect(() => {
        if (!accountBenefitSelectors.data)
            dispatch(
                getAccountBenefitRequest(),
            );
    }, []);

    const renderItem = ({ item, index }: { item: ListAccountBankModel, index: number }) => {
        return (
            <ItemAccount
                isDefault={item?.isSetDefault}
                source={{ uri: item?.logo }}
                bankName={item?.name}
                accountNameValue={item?.creatorText}
                accountNumberValue={item?.numberAccount}
                onPressBankName={() =>
                    navigation.navigate('BeneficiaryAccountScreen', {
                        id: item?.id,
                        nameBank: item?.name,
                        numberAccount: item?.numberAccount,
                        creatorText: item?.creatorText,
                        isSetDefault: item?.isSetDefault,
                    })
                }
                styleContainer={{
                    marginTop: Dimensions.Spacing.large,
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <BackgroundImage source={images.Backgrounds.Background}>
                {accountBenefitSelectors?.data?.listAccount && <>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: Dimensions.Spacing.large,
                    }}>
                        {accountBenefitSelectors?.data?.listAccount.length > 0 && (
                            <FlatList
                                data={accountBenefitSelectors?.data?.listAccount}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                        {accountBenefitSelectors?.data?.listAccount.length == 0 && (
                            <ScreenNotAccount
                                title={getString('doNotBeneficiaryAccount')}
                            />
                        )}
                    </View>
                    <View style={styles.formButton}>
                        <AppButton
                            type={ButtonType.CircleBorderRed}
                            name={getString('AddBeneficiaryInformation')}
                            onPress={() => navigation.navigate('AddNewBeneficiary')}
                        />
                    </View>
                </>}
            </BackgroundImage>
        </View>
    );
};

export default BeneficiaryInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formButton: {
        paddingTop: Dimensions.Spacing.large,
        paddingBottom: Dimensions.bottomPadding,
        marginHorizontal: Dimensions.moderateScale(22),
    },
});
