import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { TextPrimary } from 'app/presentation/components';
import images from 'app/assets/images';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';

interface IProps {
    onPressAddress?: () => void;
    onPressSeeList?: () => void;
}
const FormAddress = (props: IProps) => {
    const { onPressAddress, onPressSeeList } = props;
    return (
        <View>
            <View style={styles.formAddress}>
                <ImageIconCircle
                    source={images.Icons.location}
                    style={{ width: 24, height: 24 }}
                />
                <TextPrimary style={styles.textAddress}>
                    {getString('addressContact')}
                </TextPrimary>
            </View>
            <TouchableOpacity onPress={onPressAddress}>
                <TextPrimary style={styles.text}>
                    {getString('address2')}
                </TextPrimary>
            </TouchableOpacity>
            <View style={styles.formSeeList}>
                <TouchableOpacity onPress={onPressSeeList}>
                    <TextPrimary style={styles.textSeeList}>
                        {getString('seeTheList')}
                    </TextPrimary>
                </TouchableOpacity>
                <ImageIconCircle
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                    source={images.Icons.rightIcon}
                />
            </View>
        </View>
    );
};

export default FormAddress;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    formAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Dimensions.moderateScale(12),
    },
    textAddress: {
        paddingLeft: 10,
        fontSize: Dimensions.moderateScale(26),
        lineHeight: Dimensions.moderateScale(30),
        fontFamily: theme.font.Medium
    },
    text: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(24),
        color: Colors.secondary.brand,
    },
    formSeeList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Dimensions.moderateScale(9),
        backgroundColor: Colors.secondary.whiteGray,
        marginTop: Dimensions.moderateScale(12),
        marginBottom: Dimensions.moderateScale(32),
        borderRadius: Dimensions.moderateScale(4),
    },
    textSeeList: {
        color: Colors.primary.brand,
        lineHeight: Dimensions.moderateScale(18),
    },
});
