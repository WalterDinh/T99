import { View } from 'react-native';
import React from 'react';
import Img from '../../../../assets/images';
import { BackgroundImage } from 'app/presentation/components';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { styles } from './styles';
import DoneScreen from 'app/presentation/components/donescreen';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    AppStackParamList,
    EkycParamList,
} from 'app/presentation/navigation/routes/routeParams';
import Images from 'app/assets/images/index';
interface IProps {
    navigation: StackNavigationProp<
        EkycParamList & AppStackParamList,
        'EkycSuccess'
    >;
}
const EkycSuccessScreen = (props: IProps) => {
    const { navigation } = props;
    const onNavigateToHome = () => {
        navigation.popToTop();
        navigation.popToTop();
    };
    const onNavigateToGolfer = () => {
        onNavigateToHome();
        navigation.navigate('T99golferStack');
    };
    return (
        <View style={styles.container}>
            <BackgroundImage source={Img.Backgrounds.Background}>
                <View style={styles.content}>
                    <View style={styles.mainContent}>
                        <DoneScreen
                            source={Images.Icons.IconSuccess}
                            title={getString('ekycSuccessTitle')}
                            titleContent={getString('doYouWantToContinueApplyLoan')}
                        />
                    </View>
                    <AppButton
                        name={getString('golferCredits')}
                        onPress={onNavigateToGolfer}
                        styleBtn={{marginBottom: 16}}
                    />
                    <AppButton
                        type={ButtonType.CircleBorderRed}
                        name={getString('backToHome')}
                        onPress={onNavigateToHome}
                        styleBtn={styles.btn}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default EkycSuccessScreen;
