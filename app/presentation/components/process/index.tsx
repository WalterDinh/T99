import { StyleSheet, Text, View, Button, StyleProp, ViewStyle, Alert } from 'react-native';
import React from 'react';
import { Dimensions, theme } from 'app/presentation/theme';
import TextPrimary from '../text/TextPrimary';

interface IProps {
  screenPosition: number;
  totalScreen: number;
  titleTopHalf?: boolean;
  title?: string;
  styleTitle?: StyleProp<ViewStyle>;
  styleProcess?: StyleProp<ViewStyle>;
infoStyles?: StyleProp<ViewStyle>;
}

export const Process = (props: IProps) => {
  const { screenPosition, totalScreen, title, titleTopHalf, styleTitle, styleProcess, infoStyles } =
    props;

  const listProcessItem = [];
  for (let i = 0; i < totalScreen; i++) {
    listProcessItem.push(i);
  }

  const steps = () => (
    <View style={processStyles.steps}>
      <TextPrimary style={[processStyles.title, styleTitle]}>{title}</TextPrimary>
      <TextPrimary style={[processStyles.title, processStyles.fractions]}>
        {screenPosition}/{totalScreen}
      </TextPrimary>
    </View>
  );

  return (
    <View style={processStyles.container}>
      <View style={[processStyles.info,infoStyles]}>
        {titleTopHalf && steps()}
        <View style={processStyles.process}>
          {listProcessItem.map((item, index) => {
            const isFirst = index == 0;
            const inActive = index >= screenPosition ; 
            return (<View
              key={index}
              style={[
                processStyles.processActive,
                titleTopHalf && {marginBottom: 0, marginTop: 8},
                styleProcess,
                isFirst && { marginLeft: 0 },
                inActive && { backgroundColor: theme.color.backgroundColorSecondary },
              ]}
            />)
            })}
        </View>
        {!titleTopHalf && steps()}
      </View>
    </View>
  );
};

const processStyles = StyleSheet.create({
  container: {},

  info: {
    paddingVertical: Dimensions.Spacing.large,
    backgroundColor: theme.color.backgroundColorVariant,
  },

  process: {
    flexDirection: 'row',
  },
  processActive: {
    flex: 1,
    height: 4,
    backgroundColor: theme.color.successColorPrimary,
    borderRadius: 2,
    marginLeft: Dimensions.Spacing.medium,
    marginBottom: Dimensions.Spacing.extraLarge,
  },

  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: theme.font.Bold,
    fontSize: Dimensions.FontSize.medium,
    lineHeight: Dimensions.moderateScale(18),
    color: theme.color.colorSecondary,
  },

  fractions: {
    fontFamily: theme.font.Medium,
  },
});
