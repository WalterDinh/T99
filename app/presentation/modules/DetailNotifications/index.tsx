import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import DoneScreen from 'app/presentation/components/donescreen'
import { AppButton } from 'app/presentation/components/appbutton/AppButton'
import { Dimensions, theme } from 'app/presentation/theme'
import { getString } from 'app/presentation/localization'
import Img from '../../../assets/images'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from 'app/presentation/navigation/routes/routeParams'
import { IconType } from 'app/presentation/components/notificationitem/IconNotification'

interface IProps {
    navigation: StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
    route: any;
}

const index = (props: IProps) => {
    const { navigation, route } = props;
    const { id,
        title,
        titleTime,
        titleContent,
        typeCategory,
        iconType } = route.params;

    const checkIcon = () => {
        let sourceIcon = Img.Icons.NotiDone;
        switch (iconType) {
            case IconType.Close:
                sourceIcon = Img.Icons.NotiReject;
                break;
            case IconType.CheckDone:
                sourceIcon = Img.Icons.EmptyWalletTick;
                break;
            case IconType.CheckDoneGray:
                sourceIcon = Img.Icons.EmptyWalletTick;
                break;
            case IconType.Update:
                sourceIcon = Img.Icons.UpdateCircle;
                break;
            default:
                sourceIcon;
        }
        return sourceIcon;
    }
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <DoneScreen
                    source={checkIcon()}
                    title={title}
                    time={titleTime}
                    titleContent={titleContent}
                    styleContainer={styles.containerDoneScreen}
                    styleTitle={styles.styleTitle}
                />
            </ScrollView>
            <AppButton
                styleBtn={{ marginBottom: Dimensions.bottomPadding }}
                name={getString('backToHome')}
                onPress={() => navigation.popToTop()}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
        paddingHorizontal: 22,
    },
    containerDoneScreen: {
        flex: 1,
        paddingTop: 80,
    },
    styleTitle: {
        marginTop: Dimensions.Spacing.small,
        marginBottom: Dimensions.Spacing.small,
    },
})