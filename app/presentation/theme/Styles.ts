import {StyleSheet} from 'react-native';

export const globalViewStyles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            height: 4,
            width: 0
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    shadowAround: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    dummyShadowForAndroid: {        
        elevation: 0,
    },
});