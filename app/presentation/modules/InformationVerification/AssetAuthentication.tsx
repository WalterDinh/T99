import { StackNavigationProp } from '@react-navigation/stack';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import DoneScreen from 'app/presentation/components/donescreen';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { Images, theme } from 'app/presentation/theme';
import { neutral, secondary } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';
interface IAssetAuthenticationProps {
    navigation: StackNavigationProp<AppStackParamList, 'AssetAuthentication'>;
    props?: any;
}
const AssetAuthentication = (props: IAssetAuthenticationProps) => {
    const { navigation } = props;
    const handleClickButton = () => {
        navigation.navigate('AddProperty');
    };
    return (
        <View style={styles.container}>
            <DoneScreen styleTitleHeader={styles.styleTitleHeader} styleImg={{ marginBottom: 0 }} titleHeader={getString('propertyInformation')} source={Images.Backgrounds.BackgroundImageVerification} title={getString('youDoNotHavePropertyInformation')} styleTitle={styles.note} />
            <AppButton
                name={getString('addAsset')}
                type={ButtonType.CircleBorderRed}
                onPress={handleClickButton}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingBottom: Dimensions.moderateScale(60),
    },
    containerHaveValue: {
        flex: 1,
        backgroundColor: neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.Spacing.large,
        borderRadius: Dimensions.Spacing.small,
    },
    note: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        lineHeight: Dimensions.moderateScale(25),
        textAlign: 'center',
        color: secondary.brand,
        paddingTop: Dimensions.moderateScale(32),
        fontFamily: theme.font.Regular,
    },
    styleTitleHeader: {
        fontSize: Dimensions.FontSize.extraExtraLarge,
        fontFamily: theme.font.Regular
    }
});
export default AssetAuthentication;
