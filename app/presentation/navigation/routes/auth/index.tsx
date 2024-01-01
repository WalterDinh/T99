import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import WelcomeScreens from 'app/presentation/modules/WelcomeScreens/ScreenWelcome';
import {
    createDefaultStackNavigationOptions,
    createLeftTitleHeaderOptions,
} from '../../header/config';
import {
    AppStackParamList,
    AuthStackParamList,
    ForgotPasswordStackParamList,
    LearnAppParamList,
} from '../routeParams';
import ScreenOpenAccount from 'app/presentation/modules/ScreenLogin/ScreenLogin';
import {
    Step1,
    Step2,
    Step3,
    Step4,
} from 'app/presentation/modules/ForgotPassword';
import SignUp from 'app/presentation/modules/SignUp';
import ForgotPasswordHaveEkyc from 'app/presentation/modules/ForgotPassword/ForgotPasswordHaveEkyc';
import { getString } from 'app/presentation/localization';
import SearchAutocomplete from 'app/presentation/modules/MapScreen/SearchAutocomplete';
import MapScreen from 'app/presentation/modules/MapScreen';
import ScreenCenterSupport from 'app/presentation/modules/ScreenCenterSupport/ScreenCenterSupport';
import ScreenLogin2 from 'app/presentation/modules/ScreenLogin2/ScreenLogin2';
import PrivacyAndPolicy from 'app/presentation/modules/PrivacyAndPolicy';
import SignupSuccess from 'app/presentation/modules/SignUp/SignupSuccess';
import SetPassword from 'app/presentation/modules/SignUp/SetPassword';
import VerifyOtp from 'app/presentation/modules/ForgotPassword/Step2';
import WebViewScreen from 'app/presentation/modules/WebViewScreen';
import LearnAppScreen from 'app/presentation/modules/LearnApp';
import SendOtpSignup from 'app/presentation/modules/SignUp/SendOtp';

const Stack = createStackNavigator<AuthStackParamList>();
const LearnAppStack = createStackNavigator<LearnAppParamList>();

const ForgotStack = createStackNavigator<ForgotPasswordStackParamList>();

interface AuthStackProps {
    navigation: StackNavigationProp<AppStackParamList, 'AuthStack'>;
}

const ForgotPasswordStack = () => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <ForgotStack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'ForgotPasswordStep1'}
        >
            <ForgotStack.Screen
                name={'ForgotPasswordHaveEkyc'}
                component={ForgotPasswordHaveEkyc}
            />
            <ForgotStack.Screen
                name={'ForgotPasswordStep1'}
                component={Step1}
            />
            <ForgotStack.Screen
                name={'ForgotPasswordStep2'}
                component={Step2}
            />
            <ForgotStack.Screen
                name={'ForgotPasswordStep3'}
                component={Step3}
            />
            <ForgotStack.Screen
                name={'ForgotPasswordStep4'}
                component={Step4}
            />
        </ForgotStack.Navigator>
    );
};

const LearnApp = () => {
    const defaultOptions = createDefaultStackNavigationOptions();
    return (
        <LearnAppStack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'LearnApp'}
        >
            <LearnAppStack.Screen name="LearnApp" component={LearnAppScreen} />
        </LearnAppStack.Navigator>
    );
};

export const AuthStack = (props: AuthStackProps) => {
    const defaultLeftTitle = createLeftTitleHeaderOptions(() =>
        props.navigation.goBack(),
    );
    const defaultOptions = createDefaultStackNavigationOptions();

    return (
        <Stack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={'WelcomeScreen'}
        >
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreens}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'OnboardingScreen'}
                component={ScreenOpenAccount}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'ForgotPasswordStack'}
                component={ForgotPasswordStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={'LoginScreen'}
                component={ScreenLogin2}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={'VerifyOtp'} component={VerifyOtp} />
            <Stack.Screen name={'SignUpScreen'} component={SignUp} />
            <Stack.Screen
                name={'MapScreen'}
                component={MapScreen}
                options={{
                    title: getString('transactionOffice'),
                }}
            />
            <Stack.Screen
                name="SearchAutocomplete"
                component={SearchAutocomplete}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CenterSupport"
                component={ScreenCenterSupport}
            />
            <Stack.Screen
                name="PrivacyAndPolicy"
                component={PrivacyAndPolicy}
                options={{
                    ...defaultLeftTitle,
                    title: getString('privacyAndPolicy'),
                }}
            />
            <Stack.Screen
                name="SignupSuccess"
                component={SignupSuccess}
                options={{ headerShown: true, title: '' }}
            />
            <Stack.Screen
                name="SetPassword"
                component={SetPassword}
                options={{ headerShown: true, title: getString('setPassword') }}
            />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen
                name="LearnAppScreen"
                component={LearnAppScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SendOtpSignup" component={SendOtpSignup} />
        </Stack.Navigator>
    );
};
