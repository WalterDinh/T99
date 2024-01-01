import { StackNavigationProp } from '@react-navigation/stack';
import Image from 'app/assets/images/index';
import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput, View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ItemMap from '../../MapScreen/ItemMap';

export const dummyData = {
    header: 'Cửa hàng T99 gần bạn',
    dataArr: [
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '117 Nguyễn Văn Linh, quận Cầu Giấy',
            id: 1,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '249 Tô Hiệu, Cầu Giấy',
            id: 2,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở TP. HCM',
            subtitle: '202 Nguyễn Khánh Toàn, Cầu Giấy',
            id: 3,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '117 Nguyễn Văn Linh, quận Cầu Giấy',
            id: 1,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '249 Tô Hiệu, Cầu Giấy',
            id: 2,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở TP. HCM',
            subtitle: '202 Nguyễn Khánh Toàn, Cầu Giấy',
            id: 3,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '117 Nguyễn Văn Linh, quận Cầu Giấy',
            id: 1,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở Hà Nội',
            subtitle: '249 Tô Hiệu, Cầu Giấy',
            id: 2,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
        {
            title: 'Cơ sở TP. HCM',
            subtitle: '202 Nguyễn Khánh Toàn, Cầu Giấy',
            id: 3,
            latitude: 21.0317145,
            longitude: 105.7816781,
        },
    ],
};
interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'PayCashStore'>;
}

const PayCashStore = (props: IProps) => {
    //! State
    const { navigation } = props;
    //! Function
    const handleClick = () => {};
    //! Render
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={false}
                stickyHeaderIndices={[0]}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={neutral.s400}
                            placeholder={getString('search') + '...'}
                            style={[styles.input]}
                            // {...props}
                        />
                        <ImageRenderer
                            style={styles.icon}
                            source={Image.Icons.SearchFilled}
                        />
                    </View>
                    <TextPrimary style={styles.headerTitle}>
                        {dummyData.header}
                    </TextPrimary>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        {dummyData?.dataArr?.map((e, index) => {
                            const isLastItem =
                                dummyData?.dataArr?.length - 1 === index;
                            return (
                                <ItemMap
                                    containerStyle={styles.containerStyle}
                                    title={e?.title}
                                    subtitle={e?.subtitle}
                                    onPress={handleClick}
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
                        })}
                    </KeyboardAwareScrollView>
                </View>
            </ScrollView>
            <AppButton
                onPress={() => navigation.navigate('Home')}
                type={ButtonType.CircleBorderRed}
                name={getString('goBackHome')}
                styleBtn={{
                    marginBottom: Dimensions.bottomPadding,
                    marginTop: Dimensions.Spacing.large,
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    headerTitle: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        marginTop: Dimensions.moderateScale(24),
        marginBottom: Dimensions.Spacing.large,
        color: neutral.black,
        fontFamily: theme.font.Regular,
    },
    container: {
        backgroundColor: neutral.white,
        flex: 1,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    containerStyle: {
        marginLeft: 0,
        marginRight: 0,
    },
    icon: {
        width: Dimensions.FontSize.extraExtraLarge,
        height: Dimensions.FontSize.extraExtraLarge,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.color.grayBackgroundColor,
        borderWidth: 1,
        paddingVertical: Dimensions.moderateScale(10),
        paddingHorizontal: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.tiny,
        marginTop: Dimensions.moderateScale(42),
    },
    input: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Regular,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginBottom: 0,
        flex: 1,
    },
});
export default PayCashStore;
