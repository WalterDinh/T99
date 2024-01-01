import React, { Component } from 'react';
import { DeviceEventEmitter, EmitterSubscription, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { configureLocalization } from './presentation/localization';
import { store } from './presentation/redux/store';
import RootContainer from './RootContainer';
import AppManager from './shared/managers/AppManager';

interface Props {}

interface State {}

class App extends Component<Props, State> {
    subscription?: EmitterSubscription;
    constructor(props: Props) {
        super(props);

        // Ignore log notification by message:
        LogBox.ignoreAllLogs();
        configureLocalization('vn');

        this.subscription = DeviceEventEmitter.addListener(
            'credentialsReadyForAuth',
            () => {
                AppManager.appState.credentialsReadyForAuth = true;
            },
        );

        this.subscription = DeviceEventEmitter.addListener(
            'credentialsReadyForUnauth',
            () => {
                AppManager.appState.credentialsReadyForUnauth = true;
            },
        );

        this.subscription = DeviceEventEmitter.addListener(
            'credentialsWhenLogout',
            () => {
                if (AppManager.appState.credentialsReadyForAuth) {
                    AppManager.appState.credentialsReadyForAuth = false;
                }
                if (!AppManager.appState.credentialsReadyForUnauth) {
                    AppManager.appState.credentialsReadyForUnauth = true;
                }
            },
        );
    }
    componentWillUnmount() {
        this.subscription?.remove();
    }

    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        );
    }
}

export default App;
