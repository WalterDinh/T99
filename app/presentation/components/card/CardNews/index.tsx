import images from 'app/assets/images';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { CheckStatusActive } from 'app/shared/constants';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import ImageRenderer from '../../image/ImageRenderer';
import StatusActive from '../../items/StatusActive';
import TextPrimary from '../../text/TextPrimary';
interface ICardNews {
    title?: string;
    image?: any;
    time?: string;
    onPressCard?: () => void;
    highlight?: boolean;
    keyObject?: Array<{}>;
}

const CardNews = (props: ICardNews) => {
    //! State
    const { highlight, image, title, time, onPressCard, keyObject } = props;

    //! Function
    const renderButtonStatus = ({ item }: any) => (
        <StatusActive
            title={item?.title}
            status={CheckStatusActive.OutlineGray}
        />
    );
    //! Render
    return (
        <CardNewsContainer onPress={onPressCard}>
            <View
                style={
                    !highlight
                        ? styles.cardNewsHeaderFlex
                        : styles.cardNewsHeader
                }
            >
                {!image && (
                    <ImageRenderer
                        style={
                            !highlight
                                ? styles.cardNewsImgFlex
                                : styles.cardNewsImg
                        }
                        source={image ? image : Images.Default.Base}
                    />
                )}
                <TextPrimary
                    style={
                        !highlight
                            ? styles.cardNewsTitleFlex
                            : styles.cardNewsTitle
                    }
                >
                    {title}
                </TextPrimary>
            </View>

            <View style={styles.cardNewsFooter}>
                <TextPrimary style={styles.cardNewsFooterHour}>
                    {time}
                </TextPrimary>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{
                        justifyContent: 'flex-end',
                        flex: 1,
                    }}
                    data={keyObject}
                    renderItem={renderButtonStatus}
                    // keyExtractor={item => item?.id}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: Dimensions.Spacing.small }} />
                    )}
                />
                {highlight && (
                    <View style={styles.statusActive}>
                        <StatusActive
                            title={'+'}
                            status={CheckStatusActive.OutlineGray}
                        />
                    </View>
                )}
            </View>
        </CardNewsContainer>
    );
};
const CardNewsContainer = styled.TouchableOpacity`
    padding-top: ${Dimensions.Spacing.medium};
    padding-bottom: ${Dimensions.Spacing.medium};
    padding-left: ${Dimensions.Spacing.medium};
    padding-right: ${Dimensions.Spacing.medium};
    font-family: ${theme.font.Regular};
    border-radius: ${Dimensions.Spacing.small};
    background-color: ${neutral.white};
`;

const styles = StyleSheet.create({
    cardNewsHeader: {},
    cardNewsHeaderFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardNewsImg: {
        width: '100%',
        height: Dimensions.moderateScale(194),
        borderRadius: Dimensions.moderateScale(10),
        marginBottom: Dimensions.Spacing.small,
    },
    cardNewsImgFlex: {
        width: Dimensions.moderateScale(95),
        height: Dimensions.moderateScale(67),
        borderRadius: Dimensions.moderateScale(10),
        marginRight: Dimensions.Spacing.medium,
    },
    cardNewsTitle: {
        fontSize: Dimensions.FontSize.large,
        color: neutral.black,
    },
    cardNewsTitleFlex: {
        flex: 1,
    },
    cardNewsFooter: {
        marginTop: Dimensions.Spacing.small,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardNewsFooterHour: {
        fontFamily: theme.font.Medium,
        fontSize: Dimensions.FontSize.semiSmall,
        color: neutral.s400,
        marginRight: Dimensions.Spacing.larger,
    },
    statusActive: {
        marginLeft: Dimensions.Spacing.small,
    },
});
export default CardNews;
