import {
    NavigationContainer,
    NavigationContainerRef,
    NavigationState,
} from '@react-navigation/native';
import { createTheme, Themes } from './presentation/theme';
import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    EmitterSubscription,
    Linking,
    Platform,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getConfig } from './config';
import GeneralSelector from './presentation/redux/selectors/general';

import DeeplinkHandler from './presentation/helper/DeeplinkHandler';
import { AllRouteParamList } from './presentation/navigation/routes/routeParams';
import ViewConnectionStatus from './presentation/components/view/ViewConnectionStatus';
import LoadingManager from './shared/helper/LoadingManager';
import AppManager from './shared/managers/AppManager';
import ConnectionManager from './shared/managers/ConnectionManager';
import { StorageGatewayFactory } from './data/gateway/storage';
import { RootStack } from './presentation/navigation';
import { LoadingViewOnly } from './presentation/components';
import NavigationService from './shared/helper/NavigationService';
import Toast from 'react-native-toast-message';
import { toastConfig } from './shared/helper/ConfigToast';
import {initAppActionTypes, initApplication} from 'app/presentation/redux/actions/general/appInitiation';
import { NativeModules } from 'react-native';

const splashScreen = NativeModules.SplashScreen;
interface Props {
    languageReducer: any;
    initAppReducer: any;
    initApplication: () => void;
}

interface State {
    isLoading: boolean;
}

const mapStateToProps = (state: any) => ({
    languageReducer: GeneralSelector.selectLanguageReducer(state),
    initAppReducer: GeneralSelector.selectInitAppReducer(state)
});

const actions = {
    initApplication
};
class RootContainer extends Component<Props, State> {
    currentRouteName?: keyof AllRouteParamList;
    deeplinkUrl?: string;
    subscription: any;
    linkingSubcription?: EmitterSubscription;
    dynamicLinksSubscription?: () => void;

    constructor(props: Props) {
        super(props);
        this.makeAppTheme();
        this.state = {
            isLoading: true,
        };
    }

    private makeAppTheme = () => {
        return createTheme(Themes.themeDefault);
    };

    handleLinkParams = (url: string) => {
        const consumed = DeeplinkHandler.handleDeeplinkUrl(url);

        if (consumed) {
            this.deeplinkUrl = undefined;
        }
    };

    componentDidMount() {
        this.props.initApplication();
        this._listenDeeplink();
    }

    componentDidUpdate(prevPropss: Props, prevState: State) {
        const {initAppReducer} = this.props;
        const prevInitAppReducer = prevPropss.initAppReducer;
        if(initAppReducer.actionType != prevInitAppReducer.actionType) {
            setTimeout(() => {
                splashScreen.hide();
            }, 4500);
        }
    }

    componentWillUnmount() {
        this.linkingSubcription?.remove();
        this.dynamicLinksSubscription?.();
    }

    _setPendingDeeplink = (url: string) => {
        if (DeeplinkHandler.shouldIgnoreDeeplink(url)) return;
        this.deeplinkUrl = url;
    };

    _listenDeeplink = async () => {
        const storageGateway = StorageGatewayFactory.createWithDefaultClient();
        const response = await storageGateway.doGet('isOpenSettings');

        Linking.getInitialURL()
            .then((ev) => {
                if (ev) {
                    if (
                        AppManager.appState.credentialsReadyForAuth ||
                        AppManager.appState.credentialsReadyForUnauth
                    ) {
                        this.handleLinkParams(ev);
                    } else {
                        this._setPendingDeeplink(ev);
                    }
                }
            })
            .catch((err) => {
                console.warn('An error occurred', err);
            });

        if (Boolean(response.data)) {
            this.deeplinkUrl = response.data;
            storageGateway.doUpdate('isOpenSettings', '');
        }

        this.linkingSubcription = Linking.addListener('url', (res) => {
            const url = res.url;
            if (url) {
                if (
                    AppManager.appState.credentialsReadyForAuth ||
                    AppManager.appState.credentialsReadyForUnauth
                ) {
                    this.handleLinkParams(url);
                } else {
                    this._setPendingDeeplink(url);
                }
            }
        });

        if (
            !AppManager.appState.credentialsReadyForAuth &&
            !AppManager.appState.credentialsReadyForUnauth
        ) {
            this.subscription = DeviceEventEmitter.addListener(
                'credentialsReadyForAuth',
                () => {
                    if (this.deeplinkUrl) {
                        this.handleLinkParams(this.deeplinkUrl);
                    }
                },
            );
            this.subscription = DeviceEventEmitter.addListener(
                'credentialsReadyForUnauth',
                () => {
                    if (this.deeplinkUrl) {
                        this.handleLinkParams(this.deeplinkUrl);
                    }
                },
            );
        }
    };

    onNavigationStateChange = (
        navigationState: NavigationState | undefined,
    ) => {
        if (navigationState) {
            const previousRouteName = this.currentRouteName;
            const currentRouteName =
                (NavigationService.topLevelNavigator?.getCurrentRoute()?.name ??
                    '') as keyof AllRouteParamList;
            this.currentRouteName = currentRouteName as keyof AllRouteParamList;

            if (currentRouteName && previousRouteName !== currentRouteName) {
            }
        }
    };

    render() {
        return (
            <GestureHandlerRootView style={styles.container}>
                <NavigationContainer
                    ref={(ref: NavigationContainerRef<any>) =>
                        NavigationService.setTopLevelNavigator(ref)
                    }
                    onStateChange={this.onNavigationStateChange}
                >
                    <StatusBar
                        barStyle={Platform.select({
                            android: 'light-content',
                            ios: 'dark-content',
                        })}
                    />
                    <RootStack />
                    <ViewConnectionStatus
                        ref={(ref: ViewConnectionStatus) =>
                            ConnectionManager.setConnectionStatus(ref)
                        }
                    />
                    <LoadingViewOnly
                        ref={(ref: LoadingViewOnly) =>
                            LoadingManager.setLoadingRef(ref)
                        }
                    />
                    <Toast position={'bottom'} config={toastConfig} />
                </NavigationContainer>
            </GestureHandlerRootView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(mapStateToProps, actions)(RootContainer);
