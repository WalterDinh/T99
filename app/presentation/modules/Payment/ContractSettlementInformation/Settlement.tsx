import { StackNavigationProp } from "@react-navigation/stack";
import CommonCard from "app/presentation/components/card/CommonCard";
import InputSearchAndFilter from "app/presentation/components/input/InputSearchAndFilter";
import { getString } from "app/presentation/localization";
import { HomeStackParamList } from "app/presentation/navigation/routes/routeParams";
import { Colors, theme } from "app/presentation/theme";
import Dimensions from "app/presentation/theme/Dimensions";
import { AssetType, CheckModeHeader } from "app/shared/constants";
import React from "react";
import { FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'Settlement'>,
    route: any
}
const Settlement = (props: IProps) => {
    const { navigation, route } = props

    const { transactionType } = route.params;

    //!Function

    const renderItem = ({ item, index }: any) => {
        let title = '';
        switch (item.assetType) {
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
            <CommonCard
                onPress={() =>
                    navigation.navigate('ContractSettlementInformation',
                        {
                            contractId: item.contractId,
                            code: item.code,
                            transactionType: transactionType
                        })
                }
                styleCommonCard={styles.formItem}
                key={index}
                checkMode={CheckModeHeader?.TwoActive}
                dataCard={[
                    {
                        styleTitle: {
                            color: Colors.secondary.brand,
                            fontSize: Dimensions.moderateScale(17),
                            lineHeight: Dimensions.moderateScale(22),
                            fontFamily: theme.font.Medium,
                        },
                        fixTitle: title,
                    },
                    {
                        title: getString('contractCode'),
                        styleTitle: { fontSize: Dimensions.moderateScale(15), fontFamily: theme.font.Regular },
                        value: item.code,
                        styleValue: { fontSize: Dimensions.moderateScale(15), fontFamily: theme.font.Medium }
                    },
                    {
                        title: getString('dateDue'),
                        styleTitle: { fontSize: Dimensions.moderateScale(15), fontFamily: theme.font.Regular },
                        value: item.dateDue,
                        styleValue: { fontSize: Dimensions.moderateScale(15), fontFamily: theme.font.Medium }
                    },
                ]}
            />
        );
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flexGrow: 1 }}>
                <InputSearchAndFilter onSearch={() => null} onPressFilter={() => { }} />
                <FlatList
                    data={[
                        {
                            contractId: '3a07d8de-24a1-24bd-7b72-e5bb69988261',
                            code: 'HDCC-CN-0000001187',
                            dateDue: '29/10/2023',
                            assetType: AssetType.RealEstate,
                        },
                        {
                            contractId: '3a07d8de-24a1-24bd-7b72-e5bb69988261',
                            dateDue: '15/05/2023',
                            code: 'HDCC-CN-00000087637',
                            assetType: AssetType.Pledge,
                        },
                    ]}
                    renderItem={renderItem} />
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Settlement
const styles = StyleSheet.create({
    formItem: {
        marginHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(8),
        marginTop: Dimensions.moderateScale(16),
    },
});