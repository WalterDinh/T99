import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import images from 'app/assets/images';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';
import { getString } from 'app/presentation/localization';

const height = Dimensions.screenHeight();
const width = Dimensions.screenWidth();
interface IProps {
    handelApplication?: () => void;
    handelNews?: () => void;
    handelPGD?: () => void;
    handelAdvise?: () => void;
}
const FormFooter = (props: IProps) => {
    const { handelApplication, handelNews, handelPGD, handelAdvise } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handelApplication}
                style={styles.formItem}
            >
                <ImageIconCircle
                    source={images.Icons.outline1}
                    style={styles.image}
                />
                <TextPrimary style={styles.text}>
                    {getString('learnTheApp')}
                </TextPrimary>
            </TouchableOpacity>
            <TouchableOpacity onPress={handelNews} style={styles.formItem}>
                <ImageIconCircle
                    source={images.Icons.outline3}
                    style={styles.image}
                />
                <TextPrimary style={styles.text}>
                    {getString('news')}
                </TextPrimary>
            </TouchableOpacity>
            <TouchableOpacity onPress={handelPGD} style={styles.formItem}>
                <ImageIconCircle
                    source={images.Icons.outline4}
                    style={styles.image}
                />
                <TextPrimary style={styles.text}>
                    {getString('nearestPGD')}
                </TextPrimary>
            </TouchableOpacity>
            <TouchableOpacity onPress={handelAdvise} style={styles.formItem}>
                <ImageIconCircle
                    source={images.Icons.outline2}
                    style={styles.image}
                />
                <TextPrimary style={styles.text}>
                    {getString('advise')}
                </TextPrimary>
            </TouchableOpacity>
        </View>
    );
};

export default FormFooter;
const ImageIconCircle = styled.Image``;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.15,
        borderTopWidth: 0.2,
        borderTopColor: Colors.neutral.s600,
        paddingHorizontal: Dimensions.moderateScale(15),
        paddingTop: Dimensions.moderateScale(20),
        width: width,
    },
    formItem: {
        alignItems: 'center',
    },
    image: {
        width: Dimensions.moderateScale(24),
        height: Dimensions.moderateScale(24),
        marginBottom: Dimensions.moderateScale(5),
    },
    text: {
        color: Colors.neutral.s175,
        fontSize: 9,
    },
});
