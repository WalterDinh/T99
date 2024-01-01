import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import {
    CheckModeHeader,
    CheckStatusText,
    LoanStatus,
} from 'app/shared/constants';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import { MyFlatList } from 'app/presentation/components';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanContractOfflineRequest } from 'app/presentation/redux/actions/loan';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { IReducer } from 'app/shared/interfaces/common';
import LoanContractSelectors from 'app/presentation/redux/selectors/loan';
import LoanItemModel from 'app/models/loan/LoanItem';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'ManageLoanAmount'>;
}
const OfflineContract = (props: IProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const loanContractOfflineSelectors: IReducer<any> = useSelector(
        LoanContractSelectors.selectLoanContractOfflineReducer,
    ).loanContractOfflineReducer;

    useEffect(() => {
        onGetData();
    }, []);

    const onGetData = () => {
        dispatch(getLoanContractOfflineRequest());
    };

    const checkLoanStatusStyle = (status: LoanStatus) => {
        switch (status) {
            case LoanStatus.Disbursed:
                return CheckStatusText?.Success;
            default:
                return CheckStatusText.Error;
        }
    };

    const renderItemOffline = ({
        item,
        index,
    }: {
        item: LoanItemModel;
        index: number;
    }) => {
        return (
            <CommonCard
                key={item.applicationCode}
                headerStatus={checkLoanStatusStyle(item.status)}
                titleHeaderStatus={item.statusName}
                checkMode={CheckModeHeader?.TwoActive}
                headerTitleTopHalf={item.typeName}
                headerTitleBottomHalf={item.applicationCode}
                onPress={handelButton}
                dataCard={[
                    {
                        title: getString('loanAmount'),
                        value: item.loanAmount,
                        currency: true,
                    },
                    {
                        title: getString('innitiatedDate'),
                        value: item.creationDate,
                    },
                    {
                        title: getString('signingStyle'),
                        value: item.signTypeName,
                    },
                ]}
                onPressButtonSignNow={undefined}
                styleCommonCard={{
                    paddingBottom: Dimensions.moderateScale(16),
                }}
            />
        );
    };

    const handelButton = () => {
        navigation.navigate('SignLoanContract');
    };
    return (
        <View>
            <MyFlatList
                showsVerticalScrollIndicator={false}
                data={loanContractOfflineSelectors?.data || []}
                onRefresh={onGetData}
                refreshing={loanContractOfflineSelectors.isFetching}
                renderItem={renderItemOffline}
                style={{ backgroundColor: '#E5E5E5' }}
            />
        </View>
    );
};

export default OfflineContract;

const styles = StyleSheet.create({});
