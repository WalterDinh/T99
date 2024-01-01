import ViewConnectionStatus from 'app/presentation/components/view/ViewConnectionStatus';

export default class ConnectionManager {

    static connectionStatusRef?: ViewConnectionStatus;

    static setConnectionStatus = (connectionStatusRef: ViewConnectionStatus) => {
        ConnectionManager.connectionStatusRef = connectionStatusRef;
    };

    static isConnected = () => {
        return ConnectionManager.connectionStatusRef && ConnectionManager.connectionStatusRef.isConnected();
    };

}
