import { RouteProp } from '@react-navigation/native';
import WebViewComponent from 'app/presentation/components/WebViewComponent';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import React from 'react';
import { View } from 'react-native';
interface IWebViewScreen {
    route?: RouteProp<AppStackParamList, 'WebViewScreen'>;
    url?: string;
}
const WebViewScreen = (props: IWebViewScreen) => {
    const { route, url } = props;

    return (
        <View style={{flex:1}}>
            <WebViewComponent url={route?.params.url} />
        </View>
    );
};
export default WebViewScreen;
