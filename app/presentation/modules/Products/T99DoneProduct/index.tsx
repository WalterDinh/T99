import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions, theme } from 'app/presentation/theme'
import DoneScreen from 'app/presentation/components/donescreen'
import Img from 'app/assets/images'
import { BackgroundImage, TextPrimary } from 'app/presentation/components'
import { AppButton } from 'app/presentation/components/appbutton/AppButton'
import { getString } from 'app/presentation/localization'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParamList } from 'app/presentation/navigation/routes/routeParams'
import CommonCard from 'app/presentation/components/card/CommonCard'
import { SafeAreaView } from 'react-native-safe-area-context'



interface IProps {
  navigation: StackNavigationProp<
    AppStackParamList,
    'T99doneProduct'
  >,
  route?: any;
}
const index = (props: IProps) => {
  const { navigation, route } = props

  const { id,
    title,
    titleContent,
    dataCard } = route.params;

  const handleSubmit = () => {
    navigation.popToTop()
  }
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <BackgroundImage source={Img.Backgrounds.Background}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.mainContent}>
            <DoneScreen
              source={Img.Icons.imageRequestSuccess}
              title={title}
              titleContent={typeof (titleContent) === 'string'
                ? <TextPrimary style={styles.titleContent}>
                  {titleContent}
                </TextPrimary>
                : titleContent}
            />
            <CommonCard
              disabled
              styleCommonCard={styles.commonCard}
              dataCard={dataCard}
            />
          </View>
          <AppButton
            name={getString('backToHome')}
            onPress={handleSubmit}
            styleBtn={styles.btn}
          />
        </ScrollView>
      </BackgroundImage>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.backgroundColorVariant
  },
  content: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: Dimensions.moderateScale(22),
  },
  mainContent: {
    flex: 1,
    paddingTop: Dimensions.moderateScale(80),
  },
  title: {
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.extraExtraHuge,
    color: theme.color.textColor,
  },
  description: {
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.large,
    color: theme.color.labelColor,
    paddingTop: Dimensions.Spacing.medium,
  },
  titleContent: {
    marginTop: Dimensions.Spacing.large,
    fontFamily: theme.font.Regular,
    color: theme.color.labelColor,
    fontSize: Dimensions.FontSize.extraLarge,
    textAlign: 'center',
  },
  hotlineStyle: {
    color: theme.color.labelColor,
    fontFamily: theme.font.Bold,
    fontSize: Dimensions.FontSize.extraLarge,
  },
  commonCard: {
    backgroundColor: theme.color.backgroundColorTransparent,
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: Dimensions.Spacing.large,
    paddingBottom: Dimensions.Spacing.large,
  },
  btn: {
    marginBottom: Dimensions.bottomPadding
  },

})