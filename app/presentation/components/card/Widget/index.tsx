import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import ImageRenderer from '../../image/ImageRenderer';
import TextPrimary from '../../text/TextPrimary';

interface IWidget {
    title?: string;
    image?: any;
    onPress?: () => void;
}

const Widget = (props: IWidget) => {
    //! State
    const { image, title, onPress } = props;

    //! Function

    //! Render
    return (
        <WidgetContainer onPress={onPress}>
            <View style={styles.widgetHeader}>
                {!image && (
                    <ImageRenderer
                        style={styles.widgetImg}
                        source={image ? image : Images.Default.Base}
                    />
                )}
                <TextPrimary style={styles.widgetTitle}>{title}</TextPrimary>
                <View style={{ marginLeft: 35 }}>
                    <ImageRenderer source={Images.Icons.Outlined} />
                </View>
            </View>
        </WidgetContainer>
    );
};
const WidgetContainer = styled.TouchableOpacity`
    padding-top: ${Dimensions.Spacing.medium};
    padding-bottom: ${Dimensions.Spacing.medium};
    padding-left: ${Dimensions.Spacing.medium};
    padding-right: ${Dimensions.Spacing.medium};
    font-family: ${theme.font.Regular};
    border-radius: ${Dimensions.Spacing.small};
    background-color: ${neutral.white};
`;

const styles = StyleSheet.create({
    widgetHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    widgetImg: {
        width: Dimensions.moderateScale(95),
        height: Dimensions.moderateScale(67),
        borderRadius: Dimensions.moderateScale(10),
        marginRight: Dimensions.Spacing.medium ,
    },
    widgetTitle: {
        flex: 1,
    },
});
export default Widget;
