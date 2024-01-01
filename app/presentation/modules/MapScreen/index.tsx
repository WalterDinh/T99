import Geolocation from '@react-native-community/geolocation';
import { StackNavigationProp } from '@react-navigation/stack';
import Images from 'app/assets/images';
import CommonRepository from 'app/data/repository/common';
import { GetTransactionPointUseCase } from 'app/domain/common/organization/GetTransactionPointUseCase';
import InputSearch from 'app/presentation/components/input/InputSearch';
import BottomSheet from '@gorhom/bottom-sheet';
import { getString } from 'app/presentation/localization';
import { AuthStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Colors, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { StatusToast } from 'app/shared/constants';
import LoadingManager from 'app/shared/helper/LoadingManager';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    DeviceEventEmitter,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { MFMapView, MFMarker } from 'react-native-map4d-map';
import Toast from 'react-native-toast-message';
import ItemMap from './ItemMap';
import { TextPrimary } from 'app/presentation/components';
import { moderateScale } from 'react-native-size-matters';

interface IProps {
    navigation: StackNavigationProp<AuthStackParamList, 'MapScreen'>;
}
const MapScreen = (props: IProps) => {
    //! State
    const { navigation } = props;
    const refSubscription = useRef<any>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => [110, '50%'], []);
    const [open, setOpen] = useState(true);
    const refMap = useRef<any>();
    const [listTransactionOffice, setListTransactionOffice] = useState<any>({});
    const [position, setPosition] = useState({
        latitude: '',
        longitude: '',
    });

    //! Function
    const onModalClose = () => {
        setOpen(!open);
    };

    useEffect(() => {
        refSubscription.current = DeviceEventEmitter.addListener(
            'selectMarker',
            (location) => {                
                if (location) {
                    onPressItemMap(location);
                    setPosition(location);
                }
            },
        );
        return () => refSubscription.current.remove();
    }, []);

    const arr1 = useMemo(
        () =>
            (`${position && position.latitude}`
                ? [...listTransactionOffice?.listNear, ...[position]] || []
                : listTransactionOffice?.listNear || []
            ).map((el, i) => {
                // if (`!${el.lat}`) {
                //     return null;
                // }
                return {
                    ...el,
                    category: 'Gần bạn',
                };
            }),
        [position, listTransactionOffice],
    );

    const onPressRightIcon = () => {
        navigation.navigate('SearchAutocomplete', onPressItemMap);
    };

    const onPressItemMap = (option: any) => {
        !!refMap.current &&
            refMap.current.animateCamera({
                center: {
                    latitude: option?.lat,
                    longitude: option?.lng,
                },
                zoom: 16,
                bearing: 0,
                tilt: 0,
            });
    };
    //! Effect
    useEffect(() => {
        LoadingManager.setLoading(true);
        new GetTransactionPointUseCase(new CommonRepository(), {
            lat: 21.0380658,
            lng: 105.7729948,
        })
            .execute()
            .then((res) => {
                if (res?.data?.success && res?.data?.data) {
                    setListTransactionOffice(res?.data?.data || {});
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
    }, []);
    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === 'ios') {
                Geolocation.requestAuthorization();
                Geolocation.setRNConfiguration({
                    skipPermissionRequests: false,
                    authorizationLevel: 'whenInUse',
                });
            }

            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        };
        requestPermissions();
        try {
            Geolocation.getCurrentPosition((pos) => {
                const crd = pos.coords;
                !!refMap.current &&
                    refMap.current.animateCamera({
                        center: {
                            latitude: crd.latitude,
                            longitude: crd.longitude,
                        },
                        zoom: 16,
                        bearing: 0,
                        tilt: 0,
                    });
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    //! Render
    return (
        <>
            <SafeAreaView style={styles.safeView}>
                <View style={styles.searchInput}>
                    <InputSearch
                        disabled={true}
                        placeholder={getString('search')}
                        iconRightPath={Images.Icons.SearchFilled}
                        // handleInputSearch={onPressRightIcon}
                        // onPressRightIcon={onPressRightIcon}
                        onPressIn={onPressRightIcon}
                    />
                </View>

                <MFMapView
                    style={styles.container}
                    showsMyLocation={true}
                    ref={refMap}
                >
                    {listTransactionOffice?.listNear?.map((el: any) => {
                        return (
                            <MFMarker
                                coordinate={{
                                    latitude: el.lat,
                                    longitude: el.lng,
                                }}
                                draggable={false}
                                anchor={{ x: 0.5, y: 1.0 }}
                                visible={true}
                                userData={{
                                    name: 'Marker 1',
                                    arr: [1, 5, 9],
                                    obj: { x: 10, y: 11 },
                                }}
                                onPress={(event: any) => {
                                    console.log(
                                        'on press marker:',
                                        event.nativeEvent,
                                    );
                                }}
                                zIndex={20}
                            />
                        );
                    })}
                </MFMapView>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    handleComponent={(rest) => (
                        <View {...rest} style={styles.handleContainer}>
                            <View style={styles.indicator} />
                        </View>
                    )}
                    snapPoints={snapPoints}
                >
                    <ScrollView
                        contentContainerStyle={styles.modal}
                        showsVerticalScrollIndicator={false}
                    >
                        <TextPrimary style={styles.category}>
                            {getString('theNearestTransactionOffice')}
                        </TextPrimary>
                        {arr1.map((option: any) => (
                            <ItemMap
                                onPress={() => onPressItemMap(option)}
                                subtitle={option.address}
                                title={option.name}
                            />
                        ))}
                    </ScrollView>
                </BottomSheet>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%',
        backgroundColor: neutral.white,
    },
    container: {
        flex: 1,
    },

    listItem: {
        flex: 1,
    },
    category: {
        fontSize: Dimensions.FontSize.small,
        textTransform: 'uppercase',
        color: neutral.s400,
        paddingLeft: Dimensions.moderateScale(22),
        paddingBottom: Dimensions.moderateScale(10),
        paddingTop: Dimensions.moderateScale(10),
        lineHeight: Dimensions.Spacing.large,
        letterSpacing: 0.07,
        fontFamily: theme.font.Medium,
    },
    modal: {
        backgroundColor: 'white',
        height: Dimensions.screenHeight() * 0.4,
    },
    indicator: {
        top: 8,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 4,
        width: 32,
        height: 4,
        backgroundColor: '#848687',
    },
    handleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(20),
    },
    searchInput: {
        paddingHorizontal: Dimensions.moderateScale(22),
        position: 'absolute',
        top: Dimensions.Spacing.large,
        zIndex: 1,
        right: 0,
        left: 0,
        shadowColor: Colors.neutral.s600,
        shadowOpacity: 0.2,
    },
});

export default MapScreen;
