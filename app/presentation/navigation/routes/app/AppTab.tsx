import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomTabBar } from 'app/presentation/components/navigation/CustomTabBar';
import { getString } from 'app/presentation/localization';
import ContractManagementScreen from 'app/presentation/modules/ContractManagement';
import HomeScreen from 'app/presentation/modules/Home';
import SettingUser from 'app/presentation/modules/SettingUser';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
    createDefaultStackNavigationOptions,
    createLeftTitleHeaderOptions
} from '../../header/config';
import {
    AppTabParamList, AssetStackParamList, ContractParamList, HomeStackParamList, LoanAmountParamList, SettingParamList
} from '../routeParams';

import ManageHomeScreen from 'app/presentation/modules/ManageFileHome';
import ManageLoanAmount from 'app/presentation/modules/ManageFileHome/ManageLoanAmount';
import { theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Setting = createSharedElementStackNavigator<SettingParamList>();
const Home = createStackNavigator<HomeStackParamList>();
const Contract = createStackNavigator<ContractParamList>();
const Asset = createStackNavigator<AssetStackParamList>();
const LoanAmount = createStackNavigator<LoanAmountParamList>();

interface IProps {}

const LoanAmountStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();
    const leftTitleOptions = createLeftTitleHeaderOptions();

    return (
        <LoanAmount.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'LoanAmount'}
        >
            <LoanAmount.Screen
                name="LoanAmount"
                component={ManageHomeScreen}
                options={{
                    ...leftTitleOptions,
                    headerShown: true,
                    title: getString('file'),
                    headerTitleStyle: {
                        color: neutral.r125,
                        textTransform: 'uppercase',
                        fontSize: Dimensions.moderateScale(18),
                        fontFamily: theme.font.Medium,
                        lineHeight: Dimensions.moderateScale(22),
                        letterSpacing:0.36,
                        paddingVertical:Dimensions.moderateScale(6)
                    },
                }}
            />
            <LoanAmount.Screen
                name="ManageLoanAmount"
                component={ManageLoanAmount}
                options={{
                    ...leftTitleOptions,
                    headerShown: true,
                    title: getString('manageAmount'),
                    headerTitleStyle: {
                        color: neutral.r125,
                        textTransform: 'uppercase',
                        fontSize: Dimensions.moderateScale(22),
                        fontFamily: theme.font.Medium,
                        lineHeight: Dimensions.moderateScale(22),
                        letterSpacing:0.36,
                        paddingVertical:Dimensions.moderateScale(6)
                    },
                }}
            />
        </LoanAmount.Navigator>
    );
};

const AssetStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <Asset.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'Asset'}
        >
            <Asset.Screen
                name="Setting"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Asset.Navigator>
    );
};

const ContractStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();
    const leftTitleOptions = createLeftTitleHeaderOptions();

    return (
        <Contract.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'Contract'}
        >
            <Contract.Screen
                name="ContractManagementScreen"
                component={ContractManagementScreen}
                options={{
                    ...leftTitleOptions,
                    headerShown: true,
                    title: getString('contract'),
                }}
            />
        </Contract.Navigator>
    );
};

const SettingStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <Setting.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'Setting'}
        >
            <Setting.Screen
                name="Setting"
                component={SettingUser}
                options={{
                    headerShown: false,
                }}
            />
        </Setting.Navigator>
    );
};

export const AppTab = (props: IProps) => {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Contract"
                component={ContractStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="LoanAmount"
                component={LoanAmountStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Asset"
                component={AssetStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStack}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};
