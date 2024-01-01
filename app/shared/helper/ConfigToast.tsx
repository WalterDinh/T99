/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextPrimary } from 'app/presentation/components';
import Dimensions from 'app/presentation/theme/Dimensions';
import Alert from 'app/presentation/components/alert/Alert';
import { StatusToast } from '../constants';
import { getString } from 'app/presentation/localization';

export const toastConfig = {
    success: ({ text1, text2 }: any) => (
        <Alert
            styleContainer={[styles.errorFullStyle, styles.boxShadow]}
            type={StatusToast.Success}
            notice={text2}
            note={text1 || getString('success')}
        />
    ),
    error: ({ text1, text2 }: any) => (
        <Alert
        styleContainer={[styles.errorFullStyle, styles.boxShadow]}
        type={StatusToast.Error}
            notice={text2}
            note={text1 || getString('error')}
        />
    ),
    warning: ({ text1, text2 }: any) => (
        <Alert
        styleContainer={[styles.errorFullStyle, styles.boxShadow]}
        type={StatusToast.Warning}
            notice={text2}
            note={text1 || getString('notification')}
        />
    ),
    noti: (props: any) => {
        return (
            <View style={[styles.notiFullStyle, styles.boxShadow]}>
                {/* <MyIcon.Bell fill={color.primary} /> */}
                <View>
                    <TextPrimary
                        style={{
                            fontWeight: 'bold',
                            fontSize: Dimensions.FontSize.medium,
                        }}
                    >
                        {props.text1}
                    </TextPrimary>
                    {props.text2 && (
                        <TextPrimary
                            style={{ fontSize: Dimensions.FontSize.medium }}
                            numberOfLines={4}
                        >
                            {props.text2}
                        </TextPrimary>
                    )}
                </View>
            </View>
        );
    },
};

const styles = StyleSheet.create({
    errorFullStyle: {
        width: '90%',
        minHeight: 72,
        // borderLeftColor: theme.color.colorPrimary,
        // backgroundColor: theme.color.backgroundColorPrimary,
        // borderStyle: 'solid',
        // borderWidth: 0,
        // borderLeftWidth: 5,
        // borderRadius: 5,
        // backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    notiFullStyle: {
        width: '100%',
        minHeight: 50,
        flexDirection: 'row',
        borderLeftColor: 'white',
        backgroundColor: 'white',
        borderStyle: 'solid',
        paddingTop: Dimensions.getStatusBarHeight(true) + 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
