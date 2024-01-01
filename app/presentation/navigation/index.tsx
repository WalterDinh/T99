import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { AppStack } from './routes/app/AppStack';
import { AuthStack } from './routes/auth';
import { AppStackParamList } from './routes/routeParams';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';
import useAutoLogout from '../hooks/useAutoLogout';
import { View } from 'react-native';

const Stack = createSharedElementStackNavigator<AppStackParamList>();

interface IProps {}

export const RootStack = (props: IProps) => {
    const profileReducer = useSelector(CustomerSelectors.selectProfileReducer);
    return (
        <Stack.Navigator
            initialRouteName={'AuthStack'}
            screenOptions={{
                headerMode: 'screen',
                presentation: 'card',
                headerShown: false,
                animationTypeForReplace: 'push',
            }}
        >
            {profileReducer?.data ? (
                    <Stack.Screen
                        name={'AppStack'}
                        component={AppStack}
                        options={{ headerShown: false }}
                    />
            ) : (
                <Stack.Screen
                    name={'AuthStack'}
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
};

export const createAppRoot = () => {
    return () => <RootStack />;
};
