import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import React from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import DoneScreen from 'app/presentation/components/donescreen';
import Img from 'app/assets/images';
import { BackgroundImage, TextPrimary } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    AppStackParamList,
    AuthStackParamList,
} from 'app/presentation/navigation/routes/routeParams';
import { useDispatch } from 'react-redux';
import { logoutUserSuccess } from 'app/presentation/redux/actions/customer/auth';
import CustomerRepository from 'app/data/repository/customer';
import { EventActions } from 'app/shared/helper/EventEmitter';

interface IProps {
    navigation: StackNavigationProp<
        AppStackParamList & AuthStackParamList,
        'DonePassword'
    >;
    route?: any;
}
const index = (props: IProps) => {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const { id, title, titleContent, titleContent2 } = route.params;

    const handleSubmit = () => {
        new CustomerRepository().logoutUser().then(() => {
            dispatch(logoutUserSuccess());
            DeviceEventEmitter.emit(EventActions.logout);
        });
    };
    return (
        <View style={styles.container}>
            <BackgroundImage source={Img.Backgrounds.Background}>
                <View style={styles.content}>
                    <View style={styles.mainContent}>
                        <DoneScreen
                            title={title}
                            titleContent={titleContent}
                            titleContent2={
                                titleContent2 || getString('pleaseLoginToUse')
                            }
                        />
                    </View>
                    <AppButton
                        name={getString('login')}
                        onPress={handleSubmit}
                        styleBtn={styles.btn}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
    },
    content: {
        flex: 1,
        paddingTop: Dimensions.Spacing.extraLarge,
        paddingHorizontal: Dimensions.moderateScale(22),
    },
    mainContent: {
        flex: 1,
        marginTop: Dimensions.moderateScale(56),
    },
    title: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.extraExtraHuge,
        color: theme.color.textColor,
        lineHeight: 41,
        letterSpacing: 0.35,
    },
    description: {
        fontFamily: theme.font.Regular,
        fontSize: Dimensions.FontSize.large,
        color: theme.color.labelColor,
        paddingTop: Dimensions.Spacing.medium,
        lineHeight: 22,
        letterSpacing: -0.28,
    },
    btn: {
        marginBottom: Dimensions.bottomPadding,
    },
});
