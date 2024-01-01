import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import { getString } from 'app/presentation/localization';
import CommonCard from 'app/presentation/components/card/CommonCard';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import { AppButton } from 'app/presentation/components/appbutton/AppButton';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.screenHeight();
const SignUpIncreaseLimitScreen = ({ route }: any) => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formInfoLoan}>
                <TextPrimary style={styles.textInfoLoan}>
                    {getString('informationLoanAmount')}
                </TextPrimary>
            </View>
            <CommonCard
                headerTitleTopHalf={getString('golferCreditPackageTitle')}
                headerTitleBottomHalf={'HD000012312312312'}
                styleCommonCard={{ marginBottom: Dimensions.moderateScale(8) }}
                onPress={() => {}}
                dataCard={[
                    { title: getString('approvedLimit'), value: '1000000', currency: true },
                    {
                        title: getString('amountCanDisbursed'),
                        value: '1000000',
                        currency: true 
                    },
                ]}
            />
            <View style={styles.formInfoLoanEx}>
                <View style={styles.formInfoLoan}>
                    <TextPrimary style={styles.textInfoLoan}>
                        {getString('requestLimitIncrease').toUpperCase()}
                    </TextPrimary>

                    <DropdownInput
                        label={getString('limitToExport')}
                        placeholder="500.000.000 VND"
                        onPress={() => {}}
                        value={''}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginHorizontal: Dimensions.moderateScale(22),
                        marginBottom: Dimensions.bottomPadding,
                    }}
                >
                    <AppButton
                        name={getString('request')}
                        styleBtn={{
                            borderRadius: Dimensions.moderateScale(22),
                        }}
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    );
};

export default SignUpIncreaseLimitScreen;

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
    formInfoLoanEx: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    styleText: {
        fontSize: Dimensions.moderateScale(15),
    },
    formInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.moderateScale(22),
        alignItems: 'center',
        paddingBottom: Dimensions.moderateScale(28),
    },
    formNote: {
        paddingHorizontal: Dimensions.moderateScale(22),
        height: height,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale,
        paddingVertical: Dimensions.moderateScale(12),
        paddingHorizontal: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(4),
        marginTop: Dimensions.moderateScale(8),
        height: Dimensions.moderateScale(200),
        marginBottom: Dimensions.moderateScale(80),
    },
});
