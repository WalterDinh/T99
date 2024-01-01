import { StackNavigationProp } from '@react-navigation/stack'
import { TextPrimary } from 'app/presentation/components'
import { AppButton, ButtonType } from 'app/presentation/components/appbutton/AppButton'
import CommonCard from 'app/presentation/components/card/CommonCard'
import UsageLimitCard from 'app/presentation/components/card/UsageLimitCard'
import { getString } from 'app/presentation/localization'
import { DisburParamList } from 'app/presentation/navigation/routes/routeParams'
import { Dimensions, theme } from 'app/presentation/theme'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
import DisbursementRequest from '../../../Components/DisbursementRequest'

const dataCommonCardDisbursement = [
  {
    title: getString('disbursementAmount'),
    value: '80000000',
    styleTextInput: {
      fontFamily: theme.font.Regular
    },
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('totalInterestPayable'),
    value: '45000000',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('otherFees'),
    value: '5000000',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('insuranceFees'),
    value: '5000000',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('monthlyPaymentAmount'),
    value: '2000000',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('totalAmountToBePaid'),
    value: '105000000',
    styleValue: { fontFamily: theme.font.Medium, fontSize: 15, color: theme.color.colorPrimary },
    currency: true,
  },

]

//! Validation Schema
const ValidationSchema = Yup.object().shape({
  loan: Yup.number()
    .required(getString('thisFieldRequired')),
  unit: Yup.string()
    .required(getString('thisFieldRequired')),
  period: Yup.string()
    .required(getString('thisFieldRequired')),
});

interface IProps {
  navigation: StackNavigationProp<
    DisburParamList,
    'DisbursementStep2'
  >;
}

const index = (props: IProps) => {
  const { navigation } = props;
  const onSubmit = () => {
    navigation.navigate('DisbursementStep3')
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <UsageLimitCard
          title={getString('yourAvailabilityLimit')}
          subtitle={'100.000.000 ' + getString('vnd')}
          styleContainer={styles.containerCard}
        />
        <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.mainContent}
      contentContainerStyle={{ flexGrow: 1 }}
    >
          <View style={{ marginTop: Dimensions.Spacing.large }}>
            <DisbursementRequest
              onSubmit={onSubmit}
              note={
                <TextPrimary style={styles.textNote}>{getString('notice')}{getString('loanAmountMustBeAtLeastFrom')}
                  <TextPrimary style={[styles.textNote, styles.textNoteBold]}> 100.000.000 VNĐ </TextPrimary>
                  {getString('andMustNotExceed')}<TextPrimary style={[styles.textNote, styles.textNoteBold]}> 1.000.000.000 VNĐ</TextPrimary>
                </TextPrimary>}
              noteStyle={{ marginTop: -6 }}
              initValues={{
                amountToBeDisbursed: '',
                disbursementDate: '',
                disbursementPurpose: getString('cashConsumptionLoan'),
                methodPay: '',
                promoCode: '',
              }}
              // validationSchema={ValidationSchema}
              children={
                <>
                  <View style={styles.line} />
                  <View>
                    <TextPrimary style={styles.titleLoan}>
                      {getString('beneficiaryAccount')}
                    </TextPrimary>

                    <AppButton
                      styleBtn={styles.btn}
                      type={ButtonType.SquareBorderRed}
                      name={getString('addBeneficiaryAccount')}
                      onPress={() => { }}
                    />
                    <CommonCard
                      disabled
                      styleCommonCard={styles.commonCard}
                      dataCard={dataCommonCardDisbursement}
                    />
                  </View>

                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextPrimary style={styles.titleLoan}>
                    {getString('beneficiaryAccount')}
                  </TextPrimary>

                  <TouchableOpacity>
                    <View style={{ flexDirection: 'row'}}>
                      <TextPrimary style={styles.titleLoan}>
                        {getString('beneficiaryAccount')}
                      </TextPrimary>
                    </View>
                  </TouchableOpacity>
                </View> */}

                </>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Dimensions.Spacing.large,
  },
  containerCard: {
    marginHorizontal: Dimensions.moderateScale(14),
  },
  mainContent: {
    flex: 1,
    backgroundColor: theme.color.backgroundColorVariant,
    paddingHorizontal: Dimensions.Spacing.large,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: -106,
  },
  textNote: {
    color: theme.color.labelColor,
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.small,
    paddingBottom: Dimensions.Spacing.small,
  },
  textNoteBold: {
    fontFamily: theme.font.Bold,
  },
  containerFom: {
    margin: 0,
    marginTop: Dimensions.Spacing.small,
  },
  btnStyle: {
    marginBottom: Dimensions.bottomPadding,
    marginTop: Dimensions.Spacing.large,
  },

  commonCard: {
    paddingTop: Dimensions.moderateScale(11),
    paddingBottom: Dimensions.moderateScale(11),
    paddingRight: Dimensions.moderateScale(12),
    paddingLeft: Dimensions.moderateScale(12),
    backgroundColor: theme.color.backgroundColorSecondaryVariant,
    borderRadius: 8,
    marginBottom: Dimensions.Spacing.large,
  },
  titleLoan: {
    fontFamily: theme.font.Medium,
    fontSize: Dimensions.FontSize.small,
    marginBottom: Dimensions.Spacing.large,
    textTransform: 'uppercase',

  },
  btn: {
    marginBottom: Dimensions.Spacing.large,
  },
  line: {
    backgroundColor: theme.color.backgroundColorSecondary, 
    height: 8, 
    width: '100%', 
    marginBottom: Dimensions.Spacing.large, 
    marginTop: Dimensions.Spacing.small,
  },
})