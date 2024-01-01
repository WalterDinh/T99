import PawnStep1 from './Step1';
import PawnStep2 from './Step2';
import PawnStep3 from './Step3';
import PawnStep4 from './Step4';
import PawnStep5 from './Step5';
import PawnStep6 from './Step6';

import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import * as React from 'react';
import Dimensions from 'app/presentation/theme/Dimensions';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import {
    NavigationState,
    SceneRendererProps,
    TabView,
} from 'react-native-tab-view';

import { StackNavigationProp } from '@react-navigation/stack';
import { T99pawnParamList } from 'app/presentation/navigation/routes/routeParams';
import { Process } from 'app/presentation/components/process';
import styled from 'styled-components';
import Images from 'app/assets/images';

interface IProps {
    navigation: StackNavigationProp<T99pawnParamList, 'T99Pawn'>;
}

const CreateT99Pawn = (props: IProps) => {
    const { navigation } = props;
    const layout = useWindowDimensions();
    const [currentIndexTab, changeCurrentIndexTab] = React.useState(0);
    const [routes] = React.useState([
        { key: 'step1', title: getString('propertyInformation') },
        { key: 'step2', title: getString('propertyInformation') },
        { key: 'step3', title: getString('loanInformation') },
        { key: 'step4', title: getString('clientInformation') },
        { key: 'step5', title: getString('additionalInformation') },
        { key: 'step6', title: getString('additionalInformation') },
    ]);
    React.useLayoutEffect(() => {
            navigation.setOptions({
                headerLeft({ tintColor }) {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                changeCurrentIndexTab((elm) => {
                                    if (elm !== 0) {
                                        return elm - 1;
                                    }
                                    navigation.goBack();
                                    return 0
                                })
                            }
                            style={{
                                paddingLeft: Platform.select({
                                    ios: Dimensions.Spacing.extraLarge,
                                    android: Dimensions.Spacing.large,
                                }),
                                paddingRight: 10,
                            }}
                        >
                            <ImageIconCircle
                                source={Images.Icons.Back}
                                style={{ tintColor: tintColor }}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    );
                },
            });
    
    }, [currentIndexTab]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'step1': {
                return (
                    <PawnStep1 changeCurrentIndexTab={changeCurrentIndexTab} />
                );
            }
            case 'step2': {
                return (
                    <PawnStep2 changeCurrentIndexTab={changeCurrentIndexTab} />
                );
            }
            case 'step3': {
                return (
                    <PawnStep3 changeCurrentIndexTab={changeCurrentIndexTab} />
                );
            }
            case 'step4': {
                return (
                    <PawnStep4 changeCurrentIndexTab={changeCurrentIndexTab} />
                );
            }
            case 'step5': {
                return (
                    <PawnStep5 changeCurrentIndexTab={changeCurrentIndexTab} />
                );
            }
            case 'step6': {
                return (
                    <PawnStep6
                        navigation={navigation}
                        changeCurrentIndexTab={changeCurrentIndexTab}
                    />
                );
            }
        }
    };

    const tabBarScreen = (
        data: SceneRendererProps & {
            navigationState: NavigationState<{
                key: string;
                title: string;
            }>;
        },
    ) => {
        return (
            data?.navigationState?.index !== 5 && (
                <View style={styles.container}>
                    <Process
                        infoStyles={styles.process}
                        styleProcess={{
                            marginTop: Dimensions.Spacing.extraLarge,
                        }}
                        title={
                            data.navigationState.routes[
                                data.navigationState.index
                            ].title
                        }
                        totalScreen={5}
                        screenPosition={data.navigationState.index + 1}
                    />
                </View>
            )
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

export default CreateT99Pawn;
const ImageIconCircle = styled.Image`
    width: 18;
    height: 18;
`;

const styles = StyleSheet.create({
    tabContainer: {
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
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // paddingHorizontal: Dimensions.moderateScale(22),
        // marginVertical: Dimensions.moderateScale(12),
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
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
});
