import { getString } from 'app/presentation/localization';
import { T99PawnContext } from 'app/presentation/navigation/routes/app/T99PawnStack';
import { Dimensions, theme } from 'app/presentation/theme';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import Collateral from '../../Components/Collateral';

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
    const { setDataAssetInfo, dataAssetInfo, setLoanFee } = useContext(T99PawnContext);

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
                    initValues={{
                        propertyType: 1,
                        assetGroup: { key: '', label: '' },
                        assetName: {
                            id: '',
                            maxLendingMoney: 0,
                            minLendingMoney: 0,
                            productName: '',
                        },
                    }}
                    onSubmit={onSubmit}
                    // validationSchema={ValidationSchema}
                    groupAssetType={1}
                />
            </View>
        </KeyboardAwareScrollView>
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
