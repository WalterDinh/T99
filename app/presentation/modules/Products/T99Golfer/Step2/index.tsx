import { StackNavigationProp } from '@react-navigation/stack'
import { TextPrimary } from 'app/presentation/components'
import { Process } from 'app/presentation/components/process'
import { getString } from 'app/presentation/localization'
import { T99golfParamList } from 'app/presentation/navigation/routes/routeParams'
import { Dimensions, theme } from 'app/presentation/theme'
import { ProductsType } from 'app/shared/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
import EstimatedLoan from '../../Components/EstimatedLoan'
import LoanInformation from '../../Components/LoanInformation'


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
    T99golfParamList,
    'T99GolferStep2'
  >;
}

const index = (props: IProps) => {
  const { navigation } = props;
  const onSubmit = (values: object) => {
    navigation.navigate('T99GolferStep3')
  }
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Process
        infoStyles={styles.process}
        styleProcess={{ marginTop: Dimensions.Spacing.extraLarge }}
        title={getString('loanInformation')}
        totalScreen={3}
        screenPosition={1}
      />
      <View style={styles.content}>
        <LoanInformation
          onSubmit={onSubmit}
          note={
            <TextPrimary style={styles.textNote}>{getString('notice')}{getString('loanAmountMustBeAtLeastFrom')}
              <TextPrimary style={[styles.textNote, styles.textNoteBold]}> 100.000.000 VNĐ </TextPrimary>
              {getString('andMustNotExceed')}<TextPrimary style={[styles.textNote, styles.textNoteBold]}> 1.000.000.000 VNĐ</TextPrimary>
            </TextPrimary>}
          noteStyle={{ marginTop: -6 }}
          initValues={{
            loan: '',
            unit: '',
            period: '',
            paymentMethod: '',
            promoCode: '',
          }}
          type={ProductsType.Golfer}
          // validationSchema={ValidationSchema}
          children={
            <>
            <View style={{paddingTop: Dimensions.Spacing.large}}></View>
              <EstimatedLoan type={ProductsType.Golfer} />
            </>
          }
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default index

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
  textNote: {
    color: theme.color.labelColor,
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.small,
    paddingBottom: Dimensions.Spacing.small,
  },
  textNoteBold: {
    fontFamily: theme.font.Bold,
  },
  btnStyle: {
    marginBottom: Dimensions.bottomPadding,
  },
})