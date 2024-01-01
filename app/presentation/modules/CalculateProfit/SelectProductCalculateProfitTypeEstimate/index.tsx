import {
    BackgroundImage,
    TextPrimary,
} from 'app/presentation/components';
import { Dimensions, theme } from 'app/presentation/theme';
import Images from 'app/assets/images/index';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'ProductCalculateProfitStackParamList'>;
}
const SelectProductCalculateProfitTypeEstimate = (props: IProps) => {
    const {navigation} = props;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <View style={{ borderTopColor: theme.color.colorSeparator, borderTopWidth: 1 }}>
                    <View style={{marginHorizontal: Dimensions.moderateScale(22), marginTop: Dimensions.Spacing.extraLarge, marginBottom: Dimensions.Spacing.tiny}}>
                        <TextPrimary style={styles.title}>
                            {getString('chooseProductCalculateProfitTypeEstimate')}
                        </TextPrimary>
                    </View>
                    <AppButton
                        iconStyle={styles.icon}
                        textStyle={styles.inputField}
                        styleBtn={styles.btnStyle}
                        iconLeft={Images.Icons.Golf}
                        name={getString('t99Golf')}
                        type={ButtonType.SquareBorderGray}
                        onPress={() => navigation.navigate('InterestInformation')}

                    />
                    <AppButton
                        iconStyle={styles.icon}
                        textStyle={styles.inputField}
                        styleBtn={styles.btnStyle}
                        iconLeft={Images.Icons.Building}
                        name={getString('t99Pledge')}
                        type={ButtonType.SquareBorderGray}
                        onPress={() => navigation.navigate('InterestInformation')}

                    />
                    <AppButton
                        iconStyle={styles.icon}
                        textStyle={styles.inputField}
                        styleBtn={styles.btnStyle}
                        iconLeft={Images.Icons.Wallet}
                        name={getString('t99RealEstate')}
                        type={ButtonType.SquareBorderGray}
                        onPress={() => navigation.navigate('InterestInformation')}

                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default SelectProductCalculateProfitTypeEstimate;
