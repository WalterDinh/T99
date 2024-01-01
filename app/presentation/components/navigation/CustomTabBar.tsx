import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { getString } from 'app/presentation/localization';
import { Dimensions, Images, theme } from 'app/presentation/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextPrimary } from '..';
import { TabBarIcon } from './TabBarIcon';

export const CustomTabBar = (props: BottomTabBarProps) => {
    const { navigation, state, descriptors } = props;
    // const userReducer: IReducer<UserModel> = useSelector(UserSelectors.selectProfileReducer);
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const { name: routeName } = route;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let source: number;
                let title: string;
                if (routeName === 'Home') {
                    source = isFocused
                        ? Images.Icons.TabBar.Active.Home
                        : Images.Icons.TabBar.InActive.Home;
                    title = getString('home');
                } else if (routeName === 'Contract') {
                    source = isFocused
                        ? Images.Icons.TabBar.Active.Contract
                        : Images.Icons.TabBar.InActive.Contract;
                    title = getString('contract');
                } else if (routeName === 'LoanAmount') {
                    source = isFocused
                        ? Images.Icons.TabBar.Active.Amount
                        : Images.Icons.TabBar.InActive.Amount;
                    title = getString('file');
                } else if (routeName === 'Asset') {
                    source = isFocused
                        ? Images.Icons.TabBar.Active.Asset
                        : Images.Icons.TabBar.InActive.Asset;
                    title = getString('asset');
                } else {
                    source = isFocused
                        ? Images.Icons.TabBar.Active.Setting
                        : Images.Icons.TabBar.InActive.Setting;
                    title = getString('setting');
                }

                return (
                    <TouchableOpacity
                        key={routeName}
                        activeOpacity={1}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.item}
                    >
                        <TabBarIcon
                            source={source}
                            resizeMode={'contain'}
                            name={routeName}
                        />
                        <TextPrimary
                            style={[
                                styles.title,
                                {
                                    color: isFocused
                                        ? theme.color.navigationTintColor
                                        : theme.color.colorSecondary,
                                },
                            ]}
                        >
                            {title}
                        </TextPrimary>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        backgroundColor: '#fff',
        paddingBottom: Dimensions.IphoneXHelper.getBottomSpace() - 8,
        borderTopColor: '#E8E8E8',
        borderTopWidth: 0.5,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Dimensions.FontSize.semiSmall,
        fontFamily: theme.font.Regular,
        marginTop: Dimensions.Spacing.small,
        color: '#BBBBBB',
    },
});
