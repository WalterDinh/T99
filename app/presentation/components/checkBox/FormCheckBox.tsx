import {View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Colors, theme} from 'app/presentation/theme';
import styled from 'styled-components';
import images from 'app/assets/images';
import Dimensions from 'app/presentation/theme/Dimensions';
import TextPrimary from '../text/TextPrimary';

interface IProps {
  value?: boolean;
  onPress: (data: boolean) => void;
  title?: string;
  radioType?: boolean;
  containerStyle?: ViewStyle;
}
const FormCheckBox = (props: IProps) => {
  const {value = false, onPress, title, radioType, containerStyle} = props;
  const [isChecked, setCheckValue] = useState(value);

  const onChangeValue = () => {
    onPress(!isChecked);
    setCheckValue(!isChecked);
  };
  useEffect(() => {
    setCheckValue(value);
  }, [value]);

  const renderSource = useMemo(() => {
    if (isChecked && radioType) return images.Icons.radio1; 
    if (!isChecked && radioType) return images.Icons.radio2; 
    if (isChecked && !radioType) return images.Icons.checkBox1; 
    return images.Icons.checkBox2; 
  }, [isChecked, radioType]);

  return (
    <View style={[styles.container,containerStyle ]}>
      <TouchableOpacity onPress={onChangeValue}>
        <ImageIconCircle source={renderSource} />
      </TouchableOpacity>
      <TextPrimary style={styles.styleText}>{title}</TextPrimary>
    </View>
  );
};
const ImageIconCircle = styled.Image`
  width: 18;
  height: 18;
`;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleText: {
    marginLeft: Dimensions.Spacing.medium,
    fontSize: Dimensions.FontSize.large,
    fontWeight: '400',
    color: Colors.neutral.black,
  },
});
export default FormCheckBox;
