import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import { InAppNotificationHelper } from '../../../shared/helper/InAppNotificationHelper';
import React from 'react';
import styled from 'styled-components';
import {getString} from '../../localization';

export default class ViewConnectionStatus extends React.PureComponent<any, any> {

    _isConnected = false;
    _subscription?: any;

    constructor(props: any) {
        super(props);
    }


    isConnected = () => {
        return this._isConnected;
    };


    componentDidMount() {
        this._subscription = NetInfo.addEventListener(this._handleConnectivityChange);
    }

    componentWillUnmount() {
        if(this._subscription) {
            this._subscription();
        }
    }

    _handleConnectivityChange = (state: NetInfoState) => {
        console.info('connectivity change', state);

        this._isConnected = state.isConnected ?? false;

        if(!this._isConnected) {
            const offlineText = getString('lostInternetConnection');
            const tryText = getString('pleaseTryAgain');
            InAppNotificationHelper.showError(offlineText, tryText);
        }
    };

    render() {
        return (
            <ViewContainer />
        );
    }
}

const ViewContainer = styled.View`
    width: 0;
    height: 0;
`;

