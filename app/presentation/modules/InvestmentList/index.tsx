import { useNavigation } from '@react-navigation/native';
import { MyFlatList } from 'app/presentation/components';
import CommonCard from 'app/presentation/components/card/CommonCard';
import InputSearchAndFilter from 'app/presentation/components/input/InputSearchAndFilter';
import { ModalFilter } from 'app/presentation/components/modal/ModalFilter';
import { getString } from 'app/presentation/localization';
import {
    CheckModeHeader,
    CheckStatusActive
} from 'app/shared/constants';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ContentFilterContract from './components/ContentFilter';
import dataInvestment from './dataInvestment';

const InvestmentList = () => {
    const [isShow, setShowModal] = useState(false);
    const navigation = useNavigation();
    const done = 's';
    const renderItem = ({ item, index }: any) => {
        return (
            <CommonCard
            customStyleHeaderCardContainer ={
                {
                    paddingBottom: 8,
                    marginBottom: 0
                }
            }
                key={index}
                headerStatus={
                    !!done
                        ? CheckStatusActive.Success
                        : CheckStatusActive.Warning
                }
                titleHeaderStatus={
                    !!done ? getString('processed') : getString('noProcess')
                }
                checkMode={CheckModeHeader?.TwoActive}
                headerTitleTopHalf={item.titleHeader}
                headerTitleBottomHalf={item.id}
                dataCard={dataInvestment}
                onPress={() =>
                    navigation.navigate('InvestmentDetail', {
                        itemId: item.id,
                        itemTitleHeader: item.titleHeader,
                        itemHeaderDone: !!done
                            ? CheckStatusActive.Success
                            : CheckStatusActive.Warning,
                        itemTitleHeaderStatus: !!done
                            ? getString('processed')
                            : getString('noProcess'),
                    })
                }
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <InputSearchAndFilter onPressFilter={() => setShowModal(true)} />
            <MyFlatList
                showsVerticalScrollIndicator={false}
                data={dataInvestment}
                renderItem={renderItem}
            />
             <ModalFilter
                isVisible={isShow}
                onHideModal={() => setShowModal(false)}
            >
                <ContentFilterContract />
            </ModalFilter>
        </View>
    );
};

export default InvestmentList;

const styles = StyleSheet.create({});
