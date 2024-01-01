import { MyFlatList, Row, TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import FormCheckBox from 'app/presentation/components/checkBox/FormCheckBox';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';

import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { DateTimeFormat } from 'app/shared/constants';
import TimeUtils from 'app/shared/helper/TimeUtils';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';

const dataStatus = [
    {
        key: '1',
        label: getString('waitingForApproval'),
    },
    {
        key: '2',
        label: getString('approved2'),
    },
    {
        key: '3',
        label: getString('reject'),
    },
];
const dataTransactionType = [
    {
        key: '1',
        label: getString('earlyRepayment'),
    },
    {
        key: '2',
        label: getString('partialRepaymentOfPrincipal'),
    },
    {
        key: '3',
        label: getString('paymentOfInterestAndFees'),
    },
    {
        key: '4',
        label: getString('settlement'),
    },
    {
        key: '5',
        label: getString('disbursement'),
    },
    
    
];

const ContentFilterTransactionHistory = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState<{
        label: string;
        key: string;
    } | null>(null);
    const [transactionType, setTransactionType] = useState<{
        label: string;
        key: string;
    } | null>(null);

    const renderSubTitle = (name: string) => (
        <RowView style={{ marginTop: 16 }}>
            <SubTitle>{name.toUpperCase()}</SubTitle>
            <LineView />
        </RowView>
    );

    return (
        <ScrollView
            style={{
                paddingHorizontal: Dimensions.moderateScale(8),
                width: '100%',
            }}
        >
            {renderSubTitle(getString('date'))}
            <RowView>
                <InputDatePicker
                    placeholder={getString('chooseDate')}
                    value={
                        dayjs(fromDate).isValid()
                            ? TimeUtils.formatForwardSlashDate(
                                dayjs(fromDate),
                            )
                            : fromDate
                    }
                    onPress={(date) => {
                        setFromDate(dayjs(date).format(
                            DateTimeFormat.APIFormat,
                        ));
                    }}
                    label={getString('fromDate')}
                    idName={''}
                    style={{ flex: 1 }}
                />
                <TextPrimary> - </TextPrimary>
                <InputDatePicker
                    placeholder={getString('chooseDate')}
                    value={
                        dayjs(toDate).isValid()
                            ? TimeUtils.formatForwardSlashDate(
                                dayjs(toDate),
                            )
                            : toDate
                    }
                    onPress={(date) => {
                        setToDate(dayjs(date).format(
                            DateTimeFormat.APIFormat,
                        ));
                    }}
                    label={getString('toDate')}
                    idName={''}
                    style={{ flex: 1 }}
                />
            </RowView>
            {renderSubTitle(getString('status'))}
            {/* <FormCheckBox
                containerStyle={{ marginTop: 24 }}
                title={getString('pending')}
                onPress={(data) => { }}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: 24 }}
                title={getString('done')}
                onPress={(data) => { }}
                value={false}
            /> */}
            <DropdownInput
                label=''
                data={dataStatus}
                placeholder={getString('status')}
                onPress={() => null}
                style={{ width: '50%' }}
                value={status}
                onChangeExtractor={(item: {
                    label: string;
                    key: string;
                }) => {
                    setStatus(item);
                }}
            />
            {renderSubTitle(getString('transactionType'))}
            {/* <FormCheckBox
                containerStyle={{ marginTop: 24 }}
                title={getString('payment')}
                onPress={(data) => { }}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: 24 }}
                title={getString('disbursement')}
                onPress={(data) => { }}
                value={false}
            /> */}
            <DropdownInput
                label=''
                data={dataTransactionType}
                placeholder={getString('transactionType')}
                onPress={() => null}
                style={{ width: '50%' }}
                value={transactionType}
                onChangeExtractor={(item: {
                    label: string;
                    key: string;
                }) => {
                    setTransactionType(item);
                }}
            />

            <View style={styles.buttonBox}>
                <AppButton name={getString('filterAction')} />
            </View>
        </ScrollView>
    );
};

export default ContentFilterTransactionHistory;

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
