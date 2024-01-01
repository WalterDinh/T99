import { StackNavigationProp } from '@react-navigation/stack';
import { BackgroundImage } from 'app/presentation/components';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import DoneScreen from 'app/presentation/components/donescreen';
import { getString } from 'app/presentation/localization';
import {
    AuthStackParamList,
    ForgotPasswordStackParamList
} from 'app/presentation/navigation/routes/routeParams';
import React from 'react';
import { View } from 'react-native';
import Img from '../../../../assets/images';
import { createPasswordDoneStyle } from '../styles';

interface IProps {
    navigation: StackNavigationProp<
        ForgotPasswordStackParamList & AuthStackParamList,
        'ForgotPasswordStep4'
    >;
}
const CreatePasswordDone = (props: IProps) => {
    const { navigation } = props;
    const handleSubmit = () => {
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'WelcomeScreen' }],
        // });
        // navigation.navigate('LoginScreen');
        navigation.goBack();
    };
    return (
        <View style={createPasswordDoneStyle.container}>
            <BackgroundImage source={Img.Backgrounds.Background}>
                <View style={createPasswordDoneStyle.content}>
                    <View style={createPasswordDoneStyle.mainContent}>
                        <DoneScreen
                            title={getString('createNewPasswordSuccess')}
                            titleContent={getString('youCreatedNewPassword')}
                            titleContent2={getString('pleaseLoginToUse')}
                        />
                    </View>
                    <AppButton
                        name={getString('login')}
                        onPress={handleSubmit}
                        styleBtn={createPasswordDoneStyle.btn}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default CreatePasswordDone;
