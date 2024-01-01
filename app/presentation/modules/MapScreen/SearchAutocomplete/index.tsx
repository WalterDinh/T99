import { StackNavigationProp } from '@react-navigation/stack';
import CommonRepository from 'app/data/repository/common';
import { GetSearchTransactionOfficeUseCase } from 'app/domain/common/organization/GetSearchTransactionOfficeUseCase';
import SearchTransactionOfficeModel from 'app/models/ListTransaction/SearchTransactionOfficeModel';
import { TextPrimary } from 'app/presentation/components';
import InputSearch from 'app/presentation/components/input/InputSearch';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import DebounceHelper from 'app/shared/helper/DebounceHelper';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useState } from 'react';
import {
    DeviceEventEmitter,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import ItemMap from '../ItemMap';
interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'SearchAutocomplete'>;
}
const SearchAutocomplete = (props: IProps) => {
    //! State
    const { navigation } = props;
    const [listTransactionOffice, setListTransactionOffice] = useState<
        Array<SearchTransactionOfficeModel>
    >([]);
    const [valueInput, setValueInput] = useState('');

    //!Function
    const handleClick = (location: {
        lat: number;
        lng: number;
        address: string;
        name: string;
    }) => {
        DeviceEventEmitter.emit('selectMarker', location);
        navigation.goBack();
    };

    const handleInputSearch = (value: string) => {
        if (value) {
            setValueInput(value);
            new DebounceHelper().debounce(() => {
                LoadingManager.setLoading(true);
                new GetSearchTransactionOfficeUseCase(new CommonRepository(), {
                    key: value,
                })
                    .execute()
                    .then((res) => {
                        if (res?.data?.success && res?.data?.data) {
                            setListTransactionOffice(res?.data.data);
                        } else {
                            Toast.show({
                                type: StatusToast.Error,
                                text2: getString([
                                    `errors.${res?.data?.message}`,
                                    'errorMessageCommon',
                                ]),
                            });
                        }
                    })
                    .catch((err) => {
                        Toast.show({
                            type: StatusToast.Error,
                            text2: getString([
                                `errors.${err?.message}`,
                                'errorMessageCommon',
                            ]),
                        });
                    })
                    .finally(() => {
                        LoadingManager.setLoading(false);
                    });
            }, 500);
        }
    };

    //!Effect

    return (
        <SafeAreaView style={styles.safeView}>
            <View
                style={{
                    paddingHorizontal: Dimensions.moderateScale(22),
                    paddingTop: Dimensions.Spacing.larger,
                }}
            >
                <View style={styles.searchInput}>
                    <InputSearch
                        placeholder={getString('search')}
                        iconRightPath={Images.Icons.CloseFilled}
                        iconLeft={Images.Icons.ChevronBack}
                        iconLeftStyle={{ marginRight: 10 }}
                        onPressLeftIcon={() => navigation.goBack()}
                        onChangeText={handleInputSearch}
                    />
                </View>
                {/* <InputSearch
                    onPressLeftIcon={handleClickLeft}
                    onPressRightIcon={handleClickRight}
                    placeholder={getString('search')}
                    placeholderOpacity
                    iconRightPath={Images.Icons.SearchFilled}
                /> */}
                {/* <View style={{ marginTop: Dimensions.moderateScale(24) }}>
                    <TextPrimary
                        style={{ fontSize: Dimensions.moderateScale(20) }}
                    >
                        {getString('t99StoreNearYou')}
                    </TextPrimary>
                </View> */}
            </View>
            {listTransactionOffice &&
            listTransactionOffice.length == 0 &&
            valueInput != '' ? (
                <TextPrimary style={styles.textNote}>
                    {getString('noData')}
                </TextPrimary>
            ) : (
                (listTransactionOffice || [])?.map(
                    (e: SearchTransactionOfficeModel, index: any) => {
                        const isLastItem =
                            listTransactionOffice.length - 1 === index;
                        return (
                            <ItemMap
                                key={e?.id}
                                title={e?.transactionName}
                                subtitle={e?.address}
                                onPress={() =>
                                    handleClick({
                                        ...JSON.parse(e?.location || '{}'),
                                        name: e?.transactionName,
                                        address: e?.address,
                                    })
                                }
                                border
                                itemMapStyle={
                                    isLastItem
                                        ? 'none'
                                        : {
                                              borderBottomWidth: 1,
                                              borderColor: neutral.s175,
                                          }
                                }
                            />
                        );
                    },
                )
            )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeView: { backgroundColor: neutral.white, flex: 1 },
    searchInput: {
        zIndex: 1,
        right: 0,
        left: 0,
        shadowColor: Colors.neutral.s600,
        shadowOpacity: 0.2,
    },
    textNote: {
        color: theme.color.textColor,
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraLarge,
        padding: Dimensions.Spacing.small,
        textAlign: 'center',
    },
});
export default SearchAutocomplete;
