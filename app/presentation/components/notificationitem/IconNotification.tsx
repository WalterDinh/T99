import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { theme, Dimensions } from 'app/presentation/theme';
import Img from '../../../assets/images/index'
import ImageRenderer from '../image/ImageRenderer';
export enum IconType {
  Check = 'Check',
  CheckDone = 'CheckDone',
  CheckDoneGray = 'CheckDoneGray',
  Update = 'Update',
  Close = 'Close',
}

export const IconNotification = (props: { iconType?: IconType }) => {
  const { iconType } = props ?? {};
  const checkType = () => {
    let urlImage = Img.Icons.Reader
    switch (iconType) {
      case IconType.Check:
        urlImage = Img.Icons.CheckMark
        break;

      case IconType.CheckDone:
        urlImage = Img.Icons.CheckMarkDone
        break;

      case IconType.CheckDoneGray:
        urlImage = Img.Icons.CheckMarkDone2
        break;

      case IconType.Update:
        urlImage = Img.Icons.Reader
        break;

      case IconType.Close:
        urlImage = Img.Icons.CloseCircle
        break;

      default:
        urlImage
    }
    return (
      <ImageRenderer style={iconNotificationStyles.iconImage} source={urlImage} />
    );
  };

  return <View style={iconNotificationStyles.icon}>{checkType()}</View>;
};

const iconNotificationStyles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Dimensions.Spacing.small,
    borderRadius: 20,
    backgroundColor: theme.color.backgroundColorSecondaryVariant,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
