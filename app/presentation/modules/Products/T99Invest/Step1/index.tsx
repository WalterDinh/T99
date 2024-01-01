import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import * as Yup from 'yup';
import Collateral from '../../Components/Collateral';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { T99InvestContext } from 'app/presentation/navigation/routes/app/T99InvestStack';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    propertyType: Yup.number().min(0, getString('thisFieldRequired')),
    assetGroup: Yup.string().required(getString('thisFieldRequired')),
    assetName: Yup.string().required(getString('thisFieldRequired')),
    province: Yup.string().required(getString('thisFieldRequired')),
    district: Yup.string().required(getString('thisFieldRequired')),
});

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { setDataAssetInfo, setLoanFee, dataAssetInfo } =
        useContext(T99InvestContext);

    const onSubmit = (values: any) => {
        setDataAssetInfo(values);
        if (values?.assetName?.id !== dataAssetInfo?.assetName?.id) {
            setLoanFee({
                discountCode: '',
                loan: 0,
                insuranceFee: 0,
                otherFee: 0,
                periodMoneyAmount: 0,
                sumInterest: 0,
                totalAmountMoney: 0,
                period: 'tháng',
                loanTime: 0,
            });
        }
        changeCurrentIndexTab(1);
    };
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.content}>
                <Collateral
                    onSubmit={onSubmit}
                    initValues={{
                        assetGroup: { key: '', label: '' },
                        assetName: {
                            id: '',
                            maxLendingMoney: 0,
                            minLendingMoney: 0,
                            productName: '',
                        },
                        propertyType: 2,
                    }}
                    // validationSchema={ValidationSchema}
                    groupAssetType={2}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        marginHorizontal: Dimensions.moderateScale(22),
        paddingTop: Dimensions.Spacing.small,
    },
    process: {
        marginTop: -8,
        paddingTop: 0,
        paddingHorizontal: Dimensions.moderateScale(22),
        borderBottomColor: theme.color.borderColor,
        borderBottomWidth: 2,
    },
    btnStyle: {
        marginBottom: Dimensions.bottomPadding,
    },
});
