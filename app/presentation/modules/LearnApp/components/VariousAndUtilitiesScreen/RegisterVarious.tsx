import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import Img from '../../../../../assets/images';
import { getString } from 'app/presentation/localization';
import { Colors, Dimensions, theme } from 'app/presentation/theme';
import styled from 'styled-components';

interface IProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    imgPath?: any;
    unread?: boolean;
    changeAccountVerification?: () => void;
    changeSmartOpt2?: () => void;
    changeOfferPackage?: () => void;
}

const RegisterVarious = (props: IProps) => {
    const {
        style,
        title,
        changeAccountVerification,
        changeSmartOpt2,
        changeOfferPackage,
    } = props;
    return (
        <View style={[styles.container, style]}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.formIcon}
                    onPress={changeAccountVerification}
                    disabled
                >
                    <ImageIconCircle
                        source={Img.Icons.IconFingerPrint}
                        style={{ width: 20, height: 23 }}
                    />
                    <TextPrimary style={styles.titleIcon}>
                        {getString('accountVerification')}
                    </TextPrimary>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.formIcon}
                    onPress={changeSmartOpt2}
                    disabled
                >
                    <ImageIconCircle
                        source={Img.Icons.LockIcon}
                        style={{ width: 20, height: 23 }}
                    />
                    <TextPrimary style={styles.titleIcon}>
                        {getString('smartOpt2')}
                    </TextPrimary>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.formIcon}
                    onPress={changeOfferPackage}
                    disabled
                >
                    <ImageIconCircle
                        source={Img.Icons.GifIcon}
                        style={{ width: 20, height: 23 }}
                    />
                    <TextPrimary style={styles.titleIcon}>
                        {getString('offerPackage')}
                    </TextPrimary>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterVarious;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.moderateScale(16),
        paddingHorizontal: Dimensions.moderateScale(16),
    },
    header: {},
    content: {},
    formIcon: {
        flexDirection: 'row',
        paddingVertical: Dimensions.moderateScale(16),
        paddingHorizontal: Dimensions.moderateScale(22),
        borderWidth: 1,
        borderColor: Colors.neutral.grayScale,
        marginBottom: Dimensions.moderateScale(16),
        borderRadius: Dimensions.moderateScale(12),
    },
    titleIcon: {
        lineHeight: Dimensions.moderateScale(18),
        fontFamily: theme.font.Medium,
        marginLeft: Dimensions.moderateScale(10),
    },
});
