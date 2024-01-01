import React from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';
interface IContentRightCommon {
  styleView?: StyleProp<TextStyle>;
  styleText?: StyleProp<TextStyle>;
  value?: string;
}
const ContentRightCommon = (props: IContentRightCommon) => {
  const {styleView, styleText, value} = props;
  return (
    <View style={styleView}>
      <Text style={styleText}>{value}</Text>
    </View>
  );
};
export default ContentRightCommon;
