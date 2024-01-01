import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import styled from 'styled-components';
import images from 'app/assets/images';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';

interface IProps {
    title: string;
}
const ScreenNotAccount = (props: IProps) => {
    const { title } = props;
    return (
        <View style={styles.container}>
            <View style={styles.formImage}>
                <ImageIconCircle
                    style={{
                        width: 128,
                        height: 128,
                    }}
                    source={images.Icons.imageInfoPerson}
                />
            </View>
            <TextPrimary style={styles.textTitle}>{title}</TextPrimary>
        </View>
    );
};

export default ScreenNotAccount;
const ImageIconCircle = styled.Image``;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: Dimensions.moderateScale(136),
    },
    formImage: {
        marginBottom: Dimensions.moderateScale(32),
        backgroundColor: Colors.neutral.s200,
        padding: Dimensions.moderateScale(26),
        borderRadius: Dimensions.moderateScale(100),
    },
    textTitle: {
        fontSize: Dimensions.moderateScale(20),
        color: Colors.secondary.brand,
        textAlign: 'center',
    },
});
