import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import CommonCard from 'app/presentation/components/card/CommonCard';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';

const height = Dimensions.screenHeight();
const DetailsLoanExtension = ({ route }: any) => {
    const { itemId, itemTitleHeader, code } = route.params;
    const navigation = useNavigation();
    return (
        <View
            style={{
                backgroundColor: Colors.neutral.white,
                flex: 1,
                // justifyContent: 'space-between',
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.formInfoLoan}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('loanInformationExtension')}
                    </TextPrimary>
                </View>
                <CommonCard
                    disabled
                    headerTitleTopHalf={itemTitleHeader}
                    headerTitleBottomHalf={code}
                    styleCommonCard={{
                        // marginBottom: Dimensions.moderateScale(220),
                        flex: 1,
                    }}
                    dataCard={[
                        {
                            title: getString('extendMonths'),
                            value: '1 tháng',
                        },
                        {
                            title: getString('newTerm'),
                            value: '30/07/2022',
                        },
                        {
                            title: getString('principal'),
                            value: '150000000',
                            currency: true,
                        },
                        {
                            title: getString('interest'),
                            value: '25000000',
                            currency: true,
                        },
                        {
                            title: getString('overdueFee'),
                            value: '10000000',
                            currency: true,
                        },
                        {
                            title: getString('allAmountPayment'),
                            value: '185000000',
                            currency: true,
                            styleValue: {
                                fontSize: Dimensions.moderateScale(15),
                                color: Colors.primary.brand,
                                fontFamily: theme.font.Bold,
                            },
                        },
                    ]}
                />
                <View
                    style={{
                        marginHorizontal: Dimensions.moderateScale(22),
                        marginBottom: Dimensions.bottomPadding,
                    }}
                >
                    <AppButton
                        type={ButtonType.SquareRed}
                        name={getString('confirm')}
                        textStyle={{
                            fontSize: 17,
                            fontFamily: theme.font.Medium,
                        }}
                        styleBtn={{
                            // marginBottom: Dimensions.bottomPadding,
                            borderRadius: Dimensions.moderateScale(22),
                            paddingVertical: Dimensions.moderateScale(12),
                        }}
                        onPress={() => navigation.navigate('RequestSuccess')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailsLoanExtension;

const styles = StyleSheet.create({
    formInfoLoan: {
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Dimensions.moderateScale(22),
        paddingVertical: Dimensions.moderateScale(16),
        borderBottomWidth: 1,
        borderColor: Colors.neutral.grayScale,
    },
    textInfoLoan: {
        fontSize: Dimensions.moderateScale(12),
        fontFamily: theme.font.Medium,
    },
});
