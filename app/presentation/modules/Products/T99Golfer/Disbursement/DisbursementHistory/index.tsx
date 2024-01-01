import { MyFlatList, TextPrimary } from 'app/presentation/components';
import CommonCard from 'app/presentation/components/card/CommonCard';
import InputSearchAndFilter from 'app/presentation/components/input/InputSearchAndFilter';
import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import {
    CheckStatusActive,
    CheckStatusText,
    PriceFormat,
} from 'app/shared/constants';

import React from 'react';
import { View } from 'react-native';
const DisbursementHistoryScreen = () => {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        let time = index == 0 ? 'HÔM NAY' : '30/09/2022';
        time = index > 1 ? '' : time;
        return (
            <>
                {!!time && (
                    <View style={{ paddingVertical: 16 }}>
                        <TextPrimary>{time}</TextPrimary>
                    </View>
                )}

                <CommonCard
                    disabled
                    dataCard={[
                        {
                            title: getString('debtReceiptCode'),
                            value: '80721312',
                            styleValue: {
                                fontSize: Dimensions.FontSize.extraExtraLarge,
                            },
                            status: CheckStatusText.SecondaryBrand,
                        },
                        {
                            title: getString('disbursementAmount'),
                            value: '1000000000',
                            styleValue: { fontFamily: theme.font.Medium },
                            currency: true,
                            format: PriceFormat.Plus,
                            status: CheckStatusText.Success,
                        },

                        {
                            title: getString('target'),
                            value: 'Thanh toán sân golf',
                        },
                        {
                            title: getString('disbursementDate'),
                            value: '10/05/2022',
                        },
                        {
                            title: getString('status'),
                            statusTitle:
                                index % 2
                                    ? CheckStatusActive.HalfGray
                                    : CheckStatusActive.Success,
                            contentRight:
                                index % 2 ? 'Đang phê duyệt' : 'Hoàn tất',
                        },
                    ]}
                />
            </>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <InputSearchAndFilter onPressFilter={() => {}} />
            <MyFlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                renderItem={renderItem}
            />
        </View>
    );
};

export default DisbursementHistoryScreen;
