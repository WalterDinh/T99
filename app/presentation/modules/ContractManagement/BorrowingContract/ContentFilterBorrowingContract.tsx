import { Row, TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import FormCheckBox from 'app/presentation/components/checkBox/FormCheckBox';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    AssetType,
    ContractDebtGroup,
    ContractStatusType,
    DateTimeFormat,
} from 'app/shared/constants';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { IState } from '.';
interface ContentFilterBorrowingContractProps {
    onFilter: (data: IState) => void;
    contractStatusType: ContractStatusType | '';
    initData: IState;
}

const ContentFilterBorrowingContract = (
    props: ContentFilterBorrowingContractProps,
) => {
    const {
        contractStatusType,
        onFilter,
        initData = {
            fromDate: '',
            toDate: '',
            debtGroup: '',
            assetType: '',
        },
    } = props;

    const [dataFilter, setDataFilter] = useState<IState>(initData);

    const renderSubTitle = (name: string) => (
        <RowView style={{ marginTop: 16 }}>
            <SubTitle>{name.toUpperCase()}</SubTitle>
            <LineView />
        </RowView>
    );

    const handleDebtGroupCheckBox = (status: ContractDebtGroup | '') => {
        setDataFilter({ ...dataFilter, debtGroup: status });
    };

    const handleAssetTypeCheckBox = (status: AssetType | '') => {
        setDataFilter({ ...dataFilter, assetType: status });
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            style={{
                paddingHorizontal: Dimensions.Spacing.medium,
                width: '100%',
            }}
        >
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
                {renderSubTitle(getString('date'))}
                <RowView>
                    <InputDatePicker
                        placeholder={getString('chooseDate')}
                        value={
                            dayjs(dataFilter.fromDate).isValid()
                                ? dayjs(dataFilter.fromDate).format(
                                      DateTimeFormat.FullDateForwardSlash,
                                  )
                                : dataFilter.fromDate
                        }
                        maximumDate={
                            !!dataFilter.toDate
                                ? new Date(dataFilter.toDate)
                                : undefined
                        }
                        onPress={(date) => {
                            setDataFilter({
                                ...dataFilter,
                                fromDate: dayjs(date).format(
                                    DateTimeFormat.APIDateFormat,
                                ),
                            });
                        }}
                        label={getString('fromDate')}
                        idName={''}
                        style={{ flex: 1 }}
                        date={new Date()}
                    />
                    <TextPrimary
                        style={{ color: Colors.neutral.s400, fontSize: 15 }}
                    >
                        {' '}
                        -{' '}
                    </TextPrimary>
                    <InputDatePicker
                        placeholder={getString('chooseDate')}
                        value={
                            dayjs(dataFilter.toDate).isValid()
                                ? dayjs(dataFilter.toDate).format(
                                      DateTimeFormat.FullDateForwardSlash,
                                  )
                                : dataFilter.toDate
                        }
                        minimumDate={
                            dayjs(dataFilter.fromDate).isValid()
                                ? dayjs(dataFilter.fromDate).toDate()
                                : undefined
                        }
                        onPress={(date) => {
                            setDataFilter({
                                ...dataFilter,
                                toDate: dayjs(date).format(
                                    DateTimeFormat.APIDateFormat,
                                ),
                            });
                        }}
                        label={getString('toDate')}
                        idName={''}
                        style={{ flex: 1 }}
                        date={new Date()}
                    />
                </RowView>
                {renderSubTitle(getString('status'))}
                {contractStatusType !== ContractStatusType.close && (
                    <>
                        <FormCheckBox
                            containerStyle={{
                                marginTop: Dimensions.moderateScale(24),
                            }}
                            title={getString('Indebtedness')}
                            onPress={(data) => {
                                handleDebtGroupCheckBox(
                                    data ? ContractDebtGroup.InPeriod : '',
                                );
                            }}
                            value={
                                dataFilter.debtGroup ===
                                ContractDebtGroup.InPeriod
                            }
                        />
                        <FormCheckBox
                            containerStyle={{
                                marginTop: Dimensions.moderateScale(24),
                            }}
                            title={getString('Overdue')}
                            onPress={(data) => {
                                handleDebtGroupCheckBox(
                                    data ? ContractDebtGroup.OverPeriod : '',
                                );
                            }}
                            value={
                                dataFilter.debtGroup ===
                                ContractDebtGroup.OverPeriod
                            }
                        />
                        <FormCheckBox
                            containerStyle={{
                                marginTop: Dimensions.moderateScale(24),
                            }}
                            title={getString('WaitingForLiquidation')}
                            onPress={(data) => {
                                handleDebtGroupCheckBox(
                                    data
                                        ? ContractDebtGroup.WaitForLiquidation
                                        : '',
                                );
                            }}
                            value={
                                dataFilter.debtGroup ===
                                ContractDebtGroup.WaitForLiquidation
                            }
                        />
                    </>
                )}
                {contractStatusType !== ContractStatusType.borrowing && (
                    <>
                        <FormCheckBox
                            containerStyle={{
                                marginTop: Dimensions.moderateScale(24),
                            }}
                            title={getString('Liquidated')}
                            onPress={(data) => {
                                handleDebtGroupCheckBox(
                                    data ? ContractDebtGroup.Liquidation : '',
                                );
                            }}
                            value={
                                dataFilter.debtGroup ===
                                ContractDebtGroup.Liquidation
                            }
                        />
                        <FormCheckBox
                            containerStyle={{
                                marginTop: Dimensions.moderateScale(24),
                            }}
                            title={getString('Completed')}
                            onPress={(data) => {
                                handleDebtGroupCheckBox(
                                    data ? ContractDebtGroup.HasEnded : '',
                                );
                            }}
                            value={
                                dataFilter.debtGroup ===
                                ContractDebtGroup.HasEnded
                            }
                        />
                    </>
                )}

                {renderSubTitle(getString('product'))}
                <FormCheckBox
                    containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                    title={getString('t99Golf')}
                    onPress={(data) => {
                        handleAssetTypeCheckBox(data ? AssetType.Golf : '');
                    }}
                    value={dataFilter.assetType === AssetType.Golf}
                />
                <FormCheckBox
                    containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                    title={getString('t99Pledge')}
                    onPress={(data) => {
                        handleAssetTypeCheckBox(data ? AssetType.Pledge : '');
                    }}
                    value={dataFilter.assetType === AssetType.Pledge}
                />
                <FormCheckBox
                    containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                    title={getString('realEstateTransfer2')}
                    onPress={(data) => {
                        handleAssetTypeCheckBox(
                            data ? AssetType.RealEstate : '',
                        );
                    }}
                    value={dataFilter.assetType === AssetType.RealEstate}
                />
                <View style={styles.buttonBox}>
                    <AppButton
                        onPress={() => {
                            onFilter(dataFilter);
                        }}
                        name={getString('filterAction')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default ContentFilterBorrowingContract;

const RowView = styled(Row)`
    align-items: center;
    width: 100%;
`;
const LineView = styled(View)`
    flex: 1;
    height: 1;
    margin-left: 8;
    background-color: ${Colors.neutral.s190};
`;
const SubTitle = styled(TextPrimary)`
    font-family: ${theme.font.Medium};
    font-size: ${Dimensions.FontSize.small};
`;
const styles = StyleSheet.create({
    buttonBox: {
        flex: 1,
        borderTopColor: Colors.neutral.s190,
        borderTopWidth: 1,
        marginTop: 32,
        paddingTop: 16,
        paddingBottom: Dimensions.bottomPadding,
    },
});
