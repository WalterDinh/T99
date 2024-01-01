import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import Img from 'app/assets/images'
import { applyOpacity } from 'app/presentation/theme/Colors';
import TextPrimary from '../text/TextPrimary';

export enum NotiType {
  Warning = 'Warning',
  Error = 'Error',
  Success = 'Success',
}
interface IProps {
  notiType: NotiType;
  title: string;
  sourceIcon?: string;
  titleSub?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleSubtitle?: StyleProp<ViewStyle>;
}
const FormNoti = (props: IProps) => {
  const {notiType, title, titleSub, styleContainer, styleTitle, styleSubtitle, sourceIcon } = props;
  let titleColor = {};
  let backgroundColor = {};
  let icon;

  switch (notiType) {
    case NotiType.Warning:
      titleColor = { color: theme.color.warningColor }
      backgroundColor = { backgroundColor: applyOpacity(theme.color.warningColor, 0.05) }
      icon = Img.Icons.vector;
      break;

    case NotiType.Error:
      titleColor = { color: theme.color.errorColor }
      backgroundColor = { backgroundColor: applyOpacity(theme.color.errorColor, 0.05) }
      icon = Img.Icons.vector2;
      break;

    case NotiType.Success:
      titleColor = { color: theme.color.successColorPrimary }
      backgroundColor = { backgroundColor: applyOpacity(theme.color.successColorPrimary, 0.05) }
      icon = Img.Icons.vector3;
      break;

    default:
      titleColor = { color: theme.color.warningColor }
      backgroundColor = { backgroundColor: applyOpacity(theme.color.warningColor, 0.05) }
      icon = Img.Icons.vector;
      break;
    }
      return (
        <View style={[styles.container, backgroundColor, styleContainer]}>
          <View>
            <ImageIconCircle source={sourceIcon || icon} />
          </View>
          <View style={styles.title}>
            <TextPrimary style={[styles.styleTitleHead, titleColor, styleTitle]}>{title}</TextPrimary>
            {titleSub && <TextPrimary style={[styles.styleTitleContent, styleSubtitle]}>{titleSub}</TextPrimary>}
          </View>
        </View>
      );
};
const ImageIconCircle = styled.Image`
  width: 24;
  height: 24;
`;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Dimensions.Spacing.medium,
    borderRadius: Dimensions.Spacing.tiny,
    alignItems: 'center',
    backgroundColor: applyOpacity(theme.color.errorColor, 0.05),
  },
  title: {
    flex: 1,
    marginLeft: Dimensions.Spacing.medium,
  },
  styleTitleHead: {
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.large,
    lineHeight: 22,
  },
  styleTitleContent: {
    color: Colors.neutral.s400,
    fontFamily: theme.font.Regular,
    fontSize: Dimensions.FontSize.large,
    lineHeight: Dimensions.FontSize.large,
    marginTop: Dimensions.Spacing.tiny,
  },
});
export default FormNoti;
