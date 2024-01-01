import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputSearchAndFilter from 'app/presentation/components/input/InputSearchAndFilter';
import TabItem from 'app/presentation/components/tab';
import Dimensions from 'app/presentation/theme/Dimensions';
import CommonCard from 'app/presentation/components/card/CommonCard';
import {
    AssetType,
    CheckModeHeader,
    CheckStatusActive,
    ContractDebtGroup,
    ContractStatusType,
    DateTimeFormat,
} from 'app/shared/constants';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { MyFlatList } from 'app/presentation/components';
import { ModalFilter } from 'app/presentation/components/modal/ModalFilter';
import ContractBorrowingModel from 'app/models/ListContractBorrowing/ContractBorrowingModel';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
    contractBorrowingActionsTypes,
    getContractBorrowingRequest,
    loadMoreContractBorrowingList,
    refreshContractBorrowingList,
} from 'app/presentation/redux/actions/contractBorrowing';
import ContentFilterBorrowingContract from './ContentFilterBorrowingContract';
import ContractSelectors from 'app/presentation/redux/selectors/contract';
import { IReducer } from 'app/shared/interfaces/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContractParamList } from 'app/presentation/navigation/routes/routeParams';

export type ParamsGetContractBorrowing = {
    ContractStatusType: ContractStatusType | '';
    AssetType: '' | AssetType;
    PageIndex: number;
    PageSize: number;
    DebtGroup: ContractDebtGroup | '';
    DateTo: string;
    DateFrom: string;
    ContractCode: string;
};

export interface BodyContractLoanExtension {
    contracId: string;
    period: number;
    timeUnit: number;
    note: string;
    newPeriod: string;
    originAmount: number;
    interestAmount: number;
    overduePenaltyFee: number;
    totalPayment: number;
}

export interface BodyContractChangeRepayment {
    contractId: string;
    newPayOriginDate: string;
    newPayInterestDate: string;
    note: string;
}
export interface IState {
    fromDate: string;
    toDate: string;
    assetType: AssetType | '';
    debtGroup: ContractDebtGroup | '';
    contractCode?: string;
}

const dataTitle = [
    {
        title: getString('all'),
        value: '',
    },
    {
        title: getString('borrowing'),
        value: ContractStatusType.borrowing,
    },
    {
        title: getString('closed'),
        value: ContractStatusType.close,
    },
];
interface IProps {
    navigation: StackNavigationProp<ContractParamList, 'BorrowingContract'>;
}

const BorrowingContractScreen = (props: IProps) => {
    const { navigation } = props;
    const [isShow, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const contractSelectors: IReducer<any> = useSelector(
        ContractSelectors.selectBorrowingContractReducer,
    ).contractBorrowingReducer;

    const [categoryId, setCategoryId] = useState<ContractStatusType | ''>('');
    const [dataFilter, setDataFilter] = useState<IState>({
        fromDate: '',
        toDate: '',
        debtGroup: '',
        assetType: '',
        contractCode: '',
    });

    useEffect(() => {
        dispatch(
            getContractBorrowingRequest({
                ContractStatusType: categoryId,
                AssetType: dataFilter.assetType,
                PageIndex: 1,
                PageSize: 10,
                DebtGroup: dataFilter.debtGroup,
                DateTo: dataFilter.toDate,
                DateFrom: dataFilter.fromDate,
                ContractCode: dataFilter.contractCode || '',
            }),
        );
    }, [categoryId, dataFilter]);

    const renderStatusTitle = (status: ContractDebtGroup) => {
        switch (status) {
            case ContractDebtGroup.HasEnded:
                return getString('HasEnded');
            case ContractDebtGroup.InPeriod:
                return getString('InPeriod');
            case ContractDebtGroup.Liquidation:
                return getString('Liquidation');
            case ContractDebtGroup.OverPeriod:
                return getString('Overdue');
            case ContractDebtGroup.WaitForLiquidation:
                return getString('WaitForLiquidation');
            default:
                return '';
        }
    };

    const renderTextStatus = (status: ContractDebtGroup) => {
        switch (status) {
            case ContractDebtGroup.HasEnded: // da tat toan
                return CheckStatusActive.textCompleted;
            case ContractDebtGroup.InPeriod: // no trong han
                return CheckStatusActive.textIndebtedness;
            case ContractDebtGroup.Liquidation: // da thanh ly
                return CheckStatusActive.textLiquidated;
            case ContractDebtGroup.OverPeriod: // no qua han
                return CheckStatusActive.textOverdue;
            case ContractDebtGroup.WaitForLiquidation: // cho thanh ly
                return CheckStatusActive.textWaitingForLiquidation;
            default:
                return CheckStatusActive.textCompleted;
        }
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: ContractBorrowingModel;
        index: number;
    }) => {
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
        const status =
            item.debtGroup !==
            (ContractDebtGroup.HasEnded || ContractDebtGroup.Liquidation)
                ? getString('borrowing2')
                : '';

        return (
            <CommonCard
                styleCommonCard={styles.formItem}
                key={index}
                onPress={() =>
                    navigation.navigate('BorrowingContractDetails', {
                        id: item.id,
                        code: item.code,
                        assetType: item.assetType,
                    })
                }
                checkMode={CheckModeHeader?.TwoActive}
                titleHeaderStatus={status}
                headerStatus={!!status ? CheckStatusActive.Error : undefined}
                headerTitleTopHalf={title}
                headerTitleBottomHalf={item.code}
                dataCard={[
                    {
                        title: getString('loanAmount'),
                        value: item.debtRemainAmount,
                        styleValue: {
                            fontFamily: theme.font.Regular,
                            fontSize: 15,
                        },
                        currency: true,
                    },
                    {
                        title: getString('dateDue'),
                        value: dayjs(item?.endDate).format(
                            DateTimeFormat.FullDateForwardSlash,
                        ),
                        styleValue: {
                            fontFamily: theme.font.Regular,
                            fontSize: 15,
                        },
                    },
                    {
                        title: getString('amountPayment2'),
                        value: item.contractAmount,
                        currency: true,
                    },
                    {
                        title: getString('status'),
                        statusTitle: renderTextStatus(item.debtGroup),
                        contentRight: renderStatusTitle(item.debtGroup),
                    },
                ]}
            />
        );
    };

    const onEndReached = () => {
        if (contractSelectors.canLoadMore && !contractSelectors.isFetching) {
            contractSelectors.params.PageIndex += 1;
            dispatch(loadMoreContractBorrowingList(contractSelectors.params));
        }
    };

    const onSearch = (text: string) => {
        setDataFilter({ ...dataFilter, contractCode: text });
    };

    return (
        <View style={{ flex: 1 }}>
            <InputSearchAndFilter
                onSearch={onSearch}
                onPressFilter={() => setShowModal(true)}
            />
            <View style={styles.FormTabItem}>
                <TabItem
                    data={dataTitle}
                    idActive={categoryId}
                    onPress={(id) => {
                        setCategoryId(id);
                    }}
                    styles={styles.tabItem}
                />
            </View>
            <MyFlatList
                onRefresh={() => {
                    dispatch(refreshContractBorrowingList());
                }}
                refreshing={
                    contractSelectors.actionType ===
                    contractBorrowingActionsTypes.refresh
                        ? contractSelectors.isFetching
                        : false
                }
                showsVerticalScrollIndicator={false}
                data={contractSelectors.data}
                renderItem={renderItem}
                onEndReached={onEndReached}
            />
            <ModalFilter
                isVisible={isShow}
                onSwipeComplete={undefined}
                swipeDirection={['down']}
                propagateSwipe={true}
                onHideModal={() => setShowModal(false)}
            >
                <ContentFilterBorrowingContract
                    onFilter={(data) => {
                        setDataFilter(data);
                        setShowModal(false);
                    }}
                    initData={dataFilter}
                    contractStatusType={categoryId}
                />
            </ModalFilter>
        </View>
    );
};

export default BorrowingContractScreen;

const styles = StyleSheet.create({
    FormTabItem: {
        // marginBottom: Dimensions.moderateScale(18),
    },
    tabItem: {
        paddingHorizontal: Dimensions.moderateScale(32),
        paddingVertical: Dimensions.moderateScale(8),
        marginRight: Dimensions.moderateScale(12),
    },
    formItem: {
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingVertical: Dimensions.moderateScale(8),
        borderColor: Colors.neutral.grayScale2,
    },
});
