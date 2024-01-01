import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ContractRepository from 'app/data/repository/contract';
import { GetLisTransactionUseCase } from 'app/domain/customer/contract/GetLisTransactionUseCase';
import ListTransactionModel from 'app/models/ListTransaction/ListTransactionModel';
import { MyFlatList } from 'app/presentation/components';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { getString } from 'app/presentation/localization';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckModeHeader, StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
interface IProps {
    navigation: StackNavigationProp<ContractParamList, 'HistoryPayment'>;
    route: RouteProp<ContractParamList, 'HistoryPayment'>;
}

const HistoryPayment = (props: IProps) => {
    const { route } = props;
    const contractId = route.params.id;
    const [dataList, setDataList] = useState<ListTransactionModel[]>([]);
    //! Function
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetLisTransactionUseCase(new ContractRepository(), {
            contractId: contractId,
        })
            .execute()
            .then((res) => {
                if (
                    res?.status === 200 &&
                    res?.data?.success &&
                    res?.data?.data &&
                    res?.data?.data?.length >= 0
                ) {
                    let dataListTracsaction;
                    dataListTracsaction = res?.data.data;
                    setDataList(dataListTracsaction);
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
    }, [contractId]);

    const renderItem = ({
        item,
        index,
    }: {
        item: ListTransactionModel;
        index: number;
    }) => {
        return (
            <CommonCard
                disabled
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
                        fixTitle: item?.date || '',
                        styleTextInput: {
                            paddingBottom: Dimensions.Spacing.small,
                        },
                    },
                    {
                        title: getString('content'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: item?.periodName || '',
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                    {
                        title: getString('amountOfMoney'),
                        styleTitle: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Regular,
                        },
                        value: item?.paymentAmount || '',
                        currency: true,
                        styleValue: {
                            fontSize: Dimensions.moderateScale(15),
                            fontFamily: theme.font.Medium,
                        },
                    },
                ]}
            />
        );
    };
    return (
        <View style={styles.container}>
            <MyFlatList data={dataList} renderItem={renderItem} />
        </View>
    );
};

export default HistoryPayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formItem: {
        marginHorizontal: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.small,
        marginTop: Dimensions.Spacing.large,
    },
});
