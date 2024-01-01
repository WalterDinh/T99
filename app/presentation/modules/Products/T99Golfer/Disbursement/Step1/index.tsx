import { StackNavigationProp } from '@react-navigation/stack'
import Images from 'app/assets/images'
import { BackgroundImage } from 'app/presentation/components'
import Alert from 'app/presentation/components/alert/Alert'
import { AppButton } from 'app/presentation/components/appbutton/AppButton'
import UsageLimitCard from 'app/presentation/components/card/UsageLimitCard'
import { getString } from 'app/presentation/localization'
import { DisburParamList } from 'app/presentation/navigation/routes/routeParams'
import { Dimensions, theme } from 'app/presentation/theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'
import FormContract from '../../../../ContractManagement/FormContract'


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
    'DisbursementStep1'
  >;
}

const index = (props: IProps) => {
  const { navigation } = props;
  const onSubmit = () => {
    navigation.navigate('DisbursementStep2')
  }
  return (
    <View style={styles.container}>
      <BackgroundImage source={Images.Backgrounds.Background}>
        <View style={styles.content}>
          <UsageLimitCard
            title={getString('yourAvailabilityLimit')} 
            subtitle={'100.000.000 ' + getString('vnd')}
            time='26/09/2023'
            name='Nguyễn Thị A'
            styleContainer={styles.containerCard}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContent} contentContainerStyle={{flexGrow: 1}}>
            <View style={{ flex: 1 }}>
              <Alert
                note={getString('mind') + ':'}
                notice={getString('t99TradingHours')}
                styleContainer={styles.alert}
              />
              <FormContract
                styleContainer={styles.containerFom}
                source={Images.Icons.documentText}
                title={getString('signUpToIncreaseYourLimit')}
                onPress={() => {navigation.navigate('SignUpIncreaseLimit') }}
              />

              <FormContract
                styleContainer={styles.containerFom}
                source={Images.Icons.CardCoin}
                title={getString('disbursementHistory')}
                onPress={() => { navigation.navigate('DisbursementHistory')}}
              />
            </View>
            <AppButton 
            styleBtn={styles.btnStyle} 
            name={getString('disbursementNow')} 
            iconRight={Images.Icons.RightIconWhite}
            iconStyle={styles.iconStyle}
            onPress={onSubmit} />
          </ScrollView>
        </View>
      </BackgroundImage>
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
    marginTop: Dimensions.Spacing.extraLarge,
    paddingHorizontal: Dimensions.Spacing.large,
    paddingBottom: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  alert:{
    marginBottom: Dimensions.Spacing.large,
    marginTop: Dimensions.Spacing.large,
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
    marginHorizontal: 0,
  },
  btnStyle: {
    marginBottom: Dimensions.bottomPadding,
    marginTop: Dimensions.Spacing.large,
  },
  iconStyle:{
    width: 20,
    height: 20,
  }
})