import { TextPrimary } from 'app/presentation/components';
import { theme } from 'app/presentation/theme';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import { getString } from 'app/presentation/localization';
import _ from 'lodash';
import { CheckModeHeader } from 'app/shared/constants';
import CommonCard from 'app/presentation/components/card/CommonCard';

const data = [
    {
        title: 'Lãi',
        value: '1303000000',
        styleTextInput: {
            borderTopWidth: 1,
            borderTopColor: '#E8E8E8',
            fontFamily: theme.font.Regular
        },
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
        time: '01/06/2002',
        period: 'Kỳ 1',

    },
    {
        title: 'Phí',
        value: '1000000000',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
        time: '01/07/2021',
        period: 'Kỳ 2',
    },
    {
        title: 'Phí bảo hiểm',
        value: '50000',
        styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
        currency: true,
        time: '01/09/2022',
        period: 'Kỳ 3',

    },
]

const EstimatedInterestRate = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <TextPrimary style={styles.title}>
                        {getString('estimatedInterestRate')}
                    </TextPrimary>
                </View>

                <ScrollView>
                    {data.map((item, index) => {
                        return (
                            <CommonCard
                                key={index}
                                disabled
                                styleCommonCard={styles.commonCard}
                                checkMode={CheckModeHeader.Outline}
                                headerTitleTopHalf={item.period}
                                headerTitleBottomHalf={item.time}
                                dataCard={data}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default EstimatedInterestRate;
