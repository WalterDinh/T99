import {
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import * as React from 'react';
import Dimensions from 'app/presentation/theme/Dimensions';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import { TabView } from 'react-native-tab-view';
import OnlineContract from './OnlineContract';
import OfflineContract from './OfflineContract';
import { TextPrimary } from 'app/presentation/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';

const listTab = [
    {
        status: getString('contractOnline'),
    },
    {
        status: getString('contractOffline'),
    },
];

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'ManageLoanAmount'>;
}
const ManageLoanAmount = (props: IProps) => {
    const { navigation } = props;
    const layout = useWindowDimensions();
    const [currentIndexTab, changeCurrentIndexTab] = React.useState(0);
    const [routes] = React.useState([
        { key: 'online', title: getString('contractOnline') },
        { key: 'offline', title: getString('contractOffline') },
    ]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'online': {
                return <OnlineContract navigation={navigation} />;
            }
            case 'offline': {
                return <OfflineContract navigation={navigation} />;
            }
        }
    };

    const tabBarScreen = () => {
        return (
            <View style={styles.container}>
                {listTab.map((e, index) => (
                    <TouchableOpacity
                        style={[
                            styles.formTabBar,
                            currentIndexTab === index &&
                                styles.formTabBarActive,
                        ]}
                        onPress={() => {
                            changeCurrentIndexTab(index);
                        }}
                    >
                        <TextPrimary
                            style={[
                                styles.textTab,
                                currentIndexTab === index &&
                                    styles.textTabActive,
                            ]}
                        >
                            {index === 0
                                ? getString('contractOnline')
                                : getString('contractOffline')}
                        </TextPrimary>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <TabView
            navigationState={{ index: currentIndexTab, routes }}
            renderScene={renderScene}
            onIndexChange={changeCurrentIndexTab}
            initialLayout={{ width: layout.width }}
            renderTabBar={tabBarScreen}
            lazy
            swipeEnabled={false}
            pagerStyle={{ backgroundColor: '#E5E5E5' }}
            style={styles.tabContainer}
        />
    );
};

export default ManageLoanAmount;

const styles = StyleSheet.create({
    tabContainer:{
        backgroundColor: Colors.neutral.white,
        borderTopWidth: 1,
        borderColor: Colors.neutral.grayScale,
        flex: 1,
    },
    FormTabItem: {},
    tabItem: {
        paddingHorizontal: Dimensions.moderateScale(32),
        paddingVertical: Dimensions.moderateScale(8),
        marginRight: Dimensions.moderateScale(12),
    },
    commonCard: {},
    formItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingVertical: Dimensions.moderateScale(8),
        borderColor: Colors.neutral.grayScale2,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: Dimensions.moderateScale(22),
        marginVertical: Dimensions.moderateScale(12),
    },
    formTabBar: {
        borderWidth: 1,
        paddingVertical: Dimensions.moderateScale(8),
        paddingHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(20),
        marginRight: 12,
        borderColor: '#D2232A40',
    },
    formTabBarActive: {
        backgroundColor: Colors.primary.s600,
    },
    textTab: {
        color: Colors.primary.brand,
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
    textTabActive: {
        color: Colors.neutral.white,
    },
});
