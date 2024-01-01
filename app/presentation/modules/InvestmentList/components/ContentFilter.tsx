import { Row, TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import FormCheckBox from 'app/presentation/components/checkBox/FormCheckBox';
import { InputDatePicker } from 'app/presentation/components/input/InputDatePicker';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components';
const ContentFilterContract = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

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
                    value={fromDate}
                    onPress={(date) => {
                        setFromDate(date);
                    }}
                    label={getString('fromDate')}
                    idName={''}
                    style={{ flex: 1 }}
                />
                <TextPrimary
                    style={{ color: Colors.neutral.s400, fontSize: 15 }}
                >
                    {' '}
                    -{' '}
                </TextPrimary>
                <InputDatePicker
                    placeholder={getString('chooseDate')}
                    value={toDate}
                    onPress={(date) => {
                        setToDate(date);
                    }}
                    label={getString('toDate')}
                    idName={''}
                    style={{ flex: 1 }}
                />
            </RowView>
            {renderSubTitle(getString('status'))}
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('Indebtedness')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('Overdue')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('WaitingForLiquidation')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('Liquidated')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('Completed')}
                onPress={(data) => {}}
                value={false}
            />
            {renderSubTitle(getString('product'))}
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('golferCreditPackageTitle')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('pledge')}
                onPress={(data) => {}}
                value={false}
            />
            <FormCheckBox
                containerStyle={{ marginTop: Dimensions.moderateScale(24) }}
                title={getString('realEstateTransfer')}
                onPress={(data) => {}}
                value={false}
            />
            <View style={styles.buttonBox}>
                <AppButton name={getString('filterAction')} />
            </View>
        </ScrollView>
    );
};

export default ContentFilterContract;

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
