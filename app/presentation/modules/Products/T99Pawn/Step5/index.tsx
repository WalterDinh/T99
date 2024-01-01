import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';
import * as Yup from 'yup';
import ChooseTradeRoom from '../../Components/ChooseTradeRoom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { T99PawnContext } from 'app/presentation/navigation/routes/app/T99PawnStack';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    province: Yup.object().required(getString('thisFieldRequired')),
    transactionOffice: Yup.object().required(getString('thisFieldRequired')),
    // dayTransaction: Yup.string().required(getString('thisFieldRequired')),
});

interface IProps {
    changeCurrentIndexTab: (index: number) => void;
}

const index = (props: IProps) => {
    const { changeCurrentIndexTab } = props;
    const { setAdditionalInformation } = useContext(T99PawnContext);

    const onSubmit = (values: any) => {
        setAdditionalInformation(values);
        changeCurrentIndexTab(5);
    };
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <ChooseTradeRoom
                initValues={{
                    dayTransaction: '',
                    transactionOffice: '',
                    province: '',
                }}
                onSubmit={onSubmit}
                validationSchema={ValidationSchema}
            />
        </KeyboardAwareScrollView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.backgroundColorVariant,
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
