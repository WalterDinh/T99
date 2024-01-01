import {StyleSheet, View, TouchableHighlight} from 'react-native';
import React from 'react';
import {IconNotification, IconType} from './IconNotification';
import {theme, Dimensions} from 'app/presentation/theme';
import TextPrimary from '../text/TextPrimary';


export enum CategoryType {
  Document = 'Document',
  Transaction = 'Transaction',
  Endow = 'Endow',
}
interface IProps {
  title: string;
  titleTime: string;
  unread?: boolean;
  iconType?: IconType;
  titleContent?: string;
  onPress?: () => void;
  typeCategory: CategoryType;
}

const NotificationItem = (props: IProps) => {
  const {unread, iconType, title, titleContent, titleTime, onPress, typeCategory} = props;
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={theme.color.backgroundColorThird}>
      <View
        style={[
          notificationStyles.container,
          unread && {
            backgroundColor: theme.color.backgroundColorThird,
          },
        ]}>
        <View
          style={[
            notificationStyles.unread,
            unread && {backgroundColor: theme.color.colorPrimary},
          ]}
        />
        <IconNotification iconType={iconType} />

        <View style={notificationStyles.content}>
          <TextPrimary numberOfLines={1} style={notificationStyles.title}>
            {title}
          </TextPrimary>
          <TextPrimary numberOfLines={2} style={notificationStyles.titleContent}>
            {titleContent}
          </TextPrimary>
          <TextPrimary style={notificationStyles.titleTime}>{titleTime}</TextPrimary>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default NotificationItem;

const notificationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: Dimensions.Spacing.large,
    paddingLeft: Dimensions.Spacing.medium,
    borderWidth: 1,
    borderColor: theme.color.backgroundColorSecondaryVariant,
    backgroundColor: theme.color.backgroundColorVariant,
  },
  unread: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  content: {
    flex: 1,
    marginLeft: Dimensions.Spacing.medium,
  },
  title: {
    color: theme.color.textColor,
    fontFamily: theme.font.Bold,
    fontSize: Dimensions.FontSize.medium,
  },
  titleContent: {
    color: theme.color.textColor,
    fontSize: Dimensions.FontSize.large,
    fontFamily: theme.font.Regular,
    lineHeight: 22,
    marginTop: 5,
  },
  
  titleTime: {
    color: theme.color.labelColor,
    fontFamily: theme.font.Medium,
    fontSize: Dimensions.FontSize.semiSmall,
    lineHeight: 14,
    marginTop: 5,
  },
});
