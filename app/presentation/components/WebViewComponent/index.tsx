import LoadingManager from 'app/shared/helper/LoadingManager';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';
interface IWebViewComponent {
    url?: any;
    style?: StyleProp<ViewStyle>;
}
const WebViewComponent = (props: IWebViewComponent) => {
    //! State
    const { url, style } = props;
    return (
        <WebView
            onLoadStart={() => LoadingManager.setLoading(true)}
            onLoadEnd={() => LoadingManager.setLoading(false)}
            source={{ uri: url }}
            style={[{ flex: 1 }, { style }]}
        />
    );
};
export default WebViewComponent;
