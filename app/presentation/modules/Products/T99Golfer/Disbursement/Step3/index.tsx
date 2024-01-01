import { StackNavigationProp } from '@react-navigation/stack'
import SignatureScreen from 'app/presentation/components/Sign'
import { getString } from 'app/presentation/localization'
import { DisburParamList } from 'app/presentation/navigation/routes/routeParams'
import { Dimensions, theme } from 'app/presentation/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const dataCard = [
  {
    title: getString('profileCode'),
    value: 'HD00012312312',
    styleTextInput: {
      fontFamily: theme.font.Regular,
      borderTopWidth: 1,
    },
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15, },
  },
  {
    title: getString('disbursementAmount'),
    value: '200000000',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    currency: true,
  },
  {
    title: getString('requestDate'),
    value: '29/06/2022',
    styleValue: { fontFamily: theme.font.Regular, fontSize: 15 },
    styleTextInput: {
      fontFamily: theme.font.Regular,
      borderBottomWidth: 1,
      borderColor: theme.color.borderColor,
    },
  },
];

interface IProps {
  navigation: StackNavigationProp<
    DisburParamList,
    'DisbursementStep3'
  >;
}

const index = (props: IProps) => {
  const { navigation } = props;


  const handleOK = (signature: string) => {
    
    navigation.replace('T99doneProduct',
      {
        id: 'HD0000012312312',
        title: getString('successfullyDisbursedRegistration'),
        titleContent: getString('yourDisbursementRecordIsBeingReceived'),
        dataCard: dataCard,
      })
  };

  return (
    <View style={styles.container}>
      <SignatureScreen onOK={handleOK} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.backgroundColorVariant,
    paddingHorizontal: Dimensions.moderateScale(22),
  },
})