import {
    BackgroundImage,
    Input,
    TextPrimary,
} from 'app/presentation/components';
import { Dimensions, theme } from 'app/presentation/theme';
import Images from 'app/assets/images/index';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import {
    AppButton,
    ButtonType,
} from 'app/presentation/components/appbutton/AppButton';
import { getString } from 'app/presentation/localization';
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { Field, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputForm from 'app/presentation/components/input/InputForm';
import { DropdownInput } from 'app/presentation/components/input/DropdownInput';
import Validators from 'app/shared/helper/validators';
import isEmpty from 'lodash.isempty';
import _ from 'lodash';

//! Validation Schema
const ValidationSchema = Yup.object().shape({
    money: Yup.number()
        .required(getString('thisFieldRequired')),
    interestType: Yup.string()
        .required(getString('thisFieldRequired')),
    // period: Yup.string()
    //     .required(getString('thisFieldRequired')),
    // period2: Yup.string()
    //     .required(getString('thisFieldRequired')),
    // calculation: Yup.string()
    //     .required(getString('thisFieldRequired')),
    // principalRepaymentCycle: Yup.string()
    //     .required(getString('thisFieldRequired')),
    // interestPaymentCycle: Yup.string()
    //     .required(getString('thisFieldRequired')),


});


interface IProps {
    navigation: StackNavigationProp<AppStackParamList, 'InterestInformation'>;
}
const InterestInfo = (props: IProps) => {
    const { navigation } = props;
    const onSubmit = () => { navigation.navigate('EstimatedInterestRate') }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginTop: Dimensions.Spacing.extraLarge, marginBottom: Dimensions.Spacing.tiny }}>
                    <TextPrimary style={styles.title}>
                        {getString('enterInterestCalculationInformation')}
                    </TextPrimary>
                </View>
                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{
                            money: '',
                            interestType: '',
                            period: '',
                            period2: '',
                            calculation: '',
                            principalRepaymentCycle: '',
                            interestPaymentCycle: '',

                        }}
                        initialTouched={{ money: true, interestType: true }}

                        // validationSchema={ValidationSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validateOnMount={false}
                        onSubmit={onSubmit}
                        initialErrors={{
                            money: '',
                            interestType: '',
                        }}
                    >
                        {({ values, handleSubmit, isValid }) => {

                            return (
                                <>
                                    <KeyboardAwareScrollView
                                        keyboardShouldPersistTaps="handled"
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <Field
                                            name="money"
                                            label={getString('money')}
                                            isRequire
                                            placeholder={getString('enterMoneyPlaceholder')}
                                            component={InputForm}
                                            iconRight={
                                                <TextPrimary style={styles.iconRightField}>| VND</TextPrimary>
                                            }
                                            keyboardType='numeric'

                                        />

                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <Field
                                                name='period'
                                                label={getString('period')}
                                                isRequire
                                                style={{ flex: 1, marginRight: 8 }}
                                                placeholder={'12'}
                                                component={DropdownInput}
                                                onPress={() => null}
                                                value={''}
                                            />
                                            <Field
                                                name='period2'
                                                label=''
                                                style={{ flex: 1 }}
                                                placeholder={getString('monthPlaceholder')}
                                                component={DropdownInput}
                                                onPress={() => null}
                                                value={''}
                                            />
                                        </View>
                                        <Field
                                            name="interestType"
                                            label={getString(
                                                'interestType',
                                            )}
                                            isRequire
                                            placeholder={getString('fixedInterestPlaceholder')}
                                            component={InputForm}
                                        />
                                        <Field
                                            name="calculation"
                                            label={getString(
                                                'calculation',
                                            )}
                                            isRequire
                                            placeholder={getString('accordingToTheDecreasingBalancePlaceholder')}
                                            component={DropdownInput}
                                            value={''}
                                        />
                                        <Field
                                            name="principalRepaymentCycle"
                                            label={getString(
                                                'principalRepaymentCycle',
                                            )}
                                            isRequire
                                            placeholder={getString('monthPlaceholder')}
                                            component={DropdownInput}
                                            value={''}

                                        />
                                        <Field
                                            name="interestPaymentCycle"
                                            label={getString(
                                                'interestPaymentCycle',
                                            )}
                                            isRequire
                                            placeholder={getString('monthPlaceholder')}
                                            component={DropdownInput}
                                            value={''}

                                        />
                                    </KeyboardAwareScrollView>
                                    <View style={{ paddingTop: 5 }}>
                                        <AppButton
                                            type={
                                                (!!values.money && !!values.interestPaymentCycle
                                                )
                                                    ? undefined
                                                    : ButtonType.CircleBorderGray
                                            }
                                            onPress={handleSubmit}
                                            // disabled={!isValid}
                                            textStyle={styles.inputField}
                                            styleBtn={styles.btnStyle}
                                            name={getString('interestCalculator')}
                                        />
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </View>
        </View>
    );
};

export default InterestInfo;
