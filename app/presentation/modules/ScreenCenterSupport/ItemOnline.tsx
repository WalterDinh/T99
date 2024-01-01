import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import { Colors } from 'app/presentation/theme';

interface IProps {
    title: String;
    value: String;
    paddingVertical?: any;
}
const ItemOnline = (props: IProps) => {
    const { title, value, paddingVertical } = props;
    return (
        <View style={[styles.container, { paddingVertical: paddingVertical }]}>
            <TextPrimary style={styles.text}>{title}</TextPrimary>
            <TouchableOpacity>
                <TextPrimary style={[styles.text,{color:Colors.secondary.brand}]}>{value}</TextPrimary>
            </TouchableOpacity>
        </View>
    );
};

export default ItemOnline;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: Dimensions.FontSize.large,
        lineHeight: Dimensions.moderateScale(24),
        color: Colors.neutral.black,
    },
});
