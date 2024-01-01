import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { EkycParamList } from 'app/presentation/navigation/routes/routeParams';
import BannerHeader from './components/Header';
import ContentEkycOnboarding from './components/Content';
import Images from 'app/assets/images';
import styled from 'styled-components';
import Dimensions from 'app/presentation/theme/Dimensions';

interface IProps {
    navigation: StackNavigationProp<EkycParamList, 'EkycOnboarding'>;
}
const EkycOnboardingScreen = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.buttonBack}
            >
                <ImageIconCircle
                    style={{ tintColor: 'white' }}
                    source={Images.Icons.Back}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
            <BannerHeader />
            <ContentEkycOnboarding
                onPress={() =>
                    navigation.navigate('SelectDocumentVerification')
                }
            />
        </View>
    );
};
const ImageIconCircle = styled.Image`
    width: 18;
    height: 18;
`;
const styles = StyleSheet.create({
    buttonBack: {
        position: 'absolute',
        left: Dimensions.moderateScale(16),
        top: Dimensions.getStatusBarHeight(true) + 16,
        zIndex: 100,
    },
});
export default EkycOnboardingScreen;
