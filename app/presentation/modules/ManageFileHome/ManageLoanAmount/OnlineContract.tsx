import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CommonCard from 'app/presentation/components/card/CommonCard';
import {
    CheckModeHeader,
    CheckStatusText,
    LoanStatus,
} from 'app/shared/constants';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import { MyFlatList } from 'app/presentation/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { useDispatch, useSelector } from 'react-redux';
import { getLoanContractOnlineRequest } from 'app/presentation/redux/actions/loan';
import { IReducer } from 'app/shared/interfaces/common';
import LoanContractSelectors from 'app/presentation/redux/selectors/loan';
import LoanItemModel from 'app/models/loan/LoanItem';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'ManageLoanAmount'>;
}

const OnlineContract = (props: IProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const loanContractOnlineSelectors: IReducer<any> = useSelector(
        LoanContractSelectors.selectLoanContractOnlineReducer,
    ).loanContractOnlineReducer;

    useEffect(() => {
        onGetData();
    }, []);

    const onGetData = () => {
        dispatch(getLoanContractOnlineRequest());
    };

    const checkLoanStatusStyle = (status: LoanStatus) => {
        switch (status) {
            case LoanStatus.Disbursed:
                return CheckStatusText?.Success;
            default:
                return CheckStatusText.Error;
        }
    };

    const renderItemOnline = ({
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
                onPressButtonSignNow={
                    item.status === LoanStatus.WaitApprove
                        ? handelButton
                        : undefined
                }
                styleCommonCard={{
                    paddingBottom: Dimensions.moderateScale(16),
                }}
            />
        );
    };

    const handelButton = () => {
        // navigation.navigate('SignContract');
        navigation.navigate('SignLoanContract');
    };
    return (
        <View>
            <MyFlatList
                showsVerticalScrollIndicator={false}
                data={loanContractOnlineSelectors?.data || []}
                onRefresh={onGetData}
                refreshing={loanContractOnlineSelectors.isFetching}
                renderItem={renderItemOnline}
                style={{ backgroundColor: '#E5E5E5' }}
            />
        </View>
    );
};

export default OnlineContract;

const styles = StyleSheet.create({});
