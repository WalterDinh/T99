import { ModalSlideFromBottomIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { MyFlatList, TextPrimary } from 'app/presentation/components';
import CommonCard from 'app/presentation/components/card/CommonCard';
import InputSearchAndFilter from 'app/presentation/components/input/InputSearchAndFilter';
import { BaseModal } from 'app/presentation/components/modal/ModalBase';
import { ModalFilter } from 'app/presentation/components/modal/ModalFilter';
import { getString } from 'app/presentation/localization';
import { theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckStatusActive, CheckStatusText, PriceFormat } from 'app/shared/constants';

import React, { useState } from 'react';
import { View } from 'react-native';
import ContentFilterTransactionHistory from './components/ContentFilter';
const TransactionHistoryScreen = () => {
    const [isShow, setShowModal] = useState(false);
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
                            title: getString('account'),
                            value: '12312312412512412',
                            styleValue: {
                                fontSize: Dimensions.FontSize.extraExtraLarge,
                            },
                            status: CheckStatusText.SecondaryBrand,
                        },
                        {
                            title: getString('transaction'),
                            value: '1000000000',
                            styleValue: { fontFamily: theme.font.Medium },
                            currency: true,
                            format: PriceFormat.Plus,
                            status: CheckStatusText.SecondaryBrand,
                        },
                        {
                            title: getString('transactionType'),
                            value: 'Giải ngân',
                        },
                        {
                            title: getString('status'),
                            statusTitle:
                                index % 2
                                    ? CheckStatusActive.Gray
                                    : CheckStatusActive.GreenBackgroundWhite,
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
            <InputSearchAndFilter onPressFilter={() => setShowModal(true)} />
            <MyFlatList
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                renderItem={renderItem}
            />
            <ModalFilter
                isVisible={isShow}
                onHideModal={() => setShowModal(false)}
            >
                <ContentFilterTransactionHistory />
            </ModalFilter>
        </View>
    );
};

export default TransactionHistoryScreen;
