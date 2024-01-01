import { ImageRenderer, TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
const SelectTypeAuthentication = () => {
    const handleAsset = () => {
        Alert.alert('asset!')
    }
    const handleMoney = () => {
        Alert.alert('money!')
    }
    return (
        <View style={styles.container}>
            <TextPrimary style={styles.title}>{getString('selectAuthenticationType')}</TextPrimary>
            <TouchableOpacity
            onPress={handleMoney}
                style={styles.content}
            >
                <ImageRenderer
                    style={styles.contentImage}
                    source={Images.Icons.IconMoney}
                />
                <TextPrimary style={styles.titleMoney}>
                    {getString('asset')}
                </TextPrimary>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleAsset}
                style={styles.content}
            >
                <ImageRenderer
                    style={styles.contentImage}
                    source={Images.Icons.IconCardAdd}
                />
                <TextPrimary style={styles.titleMoney}>
                    {getString('earnings')}
                </TextPrimary>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: neutral.white,
        color: neutral.black,
        fontFamily: theme.font.Regular,
        paddingTop: Dimensions.Spacing.large,
        paddingHorizontal:Dimensions.moderateScale(22),

    },
    title: { fontSize: Dimensions.FontSize.extraExtraLarge, lineHeight: Dimensions.moderateScale(25) },
    titleMoney: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(22),
    },
    content:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: Dimensions.Spacing.large,
        backgroundColor: neutral.white,
        borderWidth: 1,
        borderColor: neutral.s125,
        borderRadius: Dimensions.Spacing.large,
        marginTop: Dimensions.Spacing.extraLarge,
    },
    contentImage: { height: Dimensions.moderateScale(22.67), width: Dimensions.moderateScale(26.67), marginBottom:Dimensions.moderateScale(17)  }
});
export default SelectTypeAuthentication;
