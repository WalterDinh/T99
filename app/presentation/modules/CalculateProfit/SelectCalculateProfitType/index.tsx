import {
    BackgroundImage,
    TextPrimary,
} from 'app/presentation/components';
import { theme } from 'app/presentation/theme';
import Images from 'app/assets/images/index';
import React from 'react';
import { Alert, View } from 'react-native';
import { styles } from './styles';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';

interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'CalculateProfitStackParamList'>;
}
const SelectCalculateProfitTypeScreen = (props: IProps) => {
    const { navigation } = props;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackgroundImage source={Images.Backgrounds.Background}>
                <View style={{ flex: 1, alignItems: 'center', borderTopColor: theme.color.colorSeparator, borderTopWidth: 1 }}>
                    <TextPrimary style={styles.title}>
                        {getString('chooseTypeToCalculateInterest')}
                    </TextPrimary>
                    <AppButton
                        iconStyle={styles.icon}
                        textStyle={styles.inputField}
                        styleBtn={styles.btnStyle}
                        iconLeft={Images.Icons.Cash}
                        name={getString('calculatingLoanInterest')}
                        type={ButtonType.SquareBorderGray}
                        onPress={() => navigation.navigate('ProductCalculateProfitStackParamList')}
                    />
                    <AppButton
                        iconStyle={styles.icon}
                        textStyle={styles.inputField}
                        styleBtn={styles.btnStyle}
                        iconLeft={Images.Icons.BriefCase}
                        name={getString('calculatingDepositInterest')}
                        type={ButtonType.SquareBorderGray}
                        onPress={() => navigation.navigate('ProductCalculateProfitStackParamList')}
                    />
                </View>
            </BackgroundImage>
        </View>
    );
};

export default SelectCalculateProfitTypeScreen;
