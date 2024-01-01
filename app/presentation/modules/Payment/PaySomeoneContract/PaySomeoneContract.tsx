import { TextPrimary } from 'app/presentation/components';
import {
    AppButton,
    ButtonType
} from 'app/presentation/components/appbutton/AppButton';
import InputForm from 'app/presentation/components/input/InputForm';
import { getString } from 'app/presentation/localization';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Field, Formik } from 'formik';
import React from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { styles } from './style';

const ValidationPaySomeoneContractSchema = Yup.object().shape({
    someContracts: Yup.string().required(getString('thisFieldRequired')),
});
const PaySomeoneContract = () => {
    //!State
    //! Function
    const handleSubmit = () => {
        Alert.alert('Submit Pay someone contract!');
    };
    //! Render
    return (
        <Formik
            initialValues={{
                someContracts: '',
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={handleSubmit}
            validationSchema={ValidationPaySomeoneContractSchema}
        >
            {({ handleBlur, handleSubmit, values, errors, isValid }) => {
                return (
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                        <View>
                        <TextPrimary style={styles.title}>
                            {' '}
                            {getString(
                                'chooseTheTypeOfContractPaymentForOthers',
                            )}{' '}
                        </TextPrimary>
                        <TextPrimary style={styles.note}>
                            {getString('pleaseEnter')} {''}
                            <TextPrimary style={styles.noteRed}>
                                {getString('someContracts')}
                            </TextPrimary>
                            {''}
                            {getString('providedByThePolicyholder')}
                        </TextPrimary>
                        <View style={styles.field}>
                            <Field
                                name="someContracts"
                                label={getString('someContracts')}
                                isRequire
                                component={InputForm}
                            />
                        </View>
                        </View>
                        <View style={{ marginBottom: Dimensions.bottomPadding }} >
                        <AppButton
                            onPress={handleSubmit}
                            name={getString('continue')}
                            type={ButtonType.CircleBorderGray}
                        />
                        </View>
                    </KeyboardAwareScrollView>
                   
                );
            }}
        </Formik>
    );
};
export default PaySomeoneContract;
