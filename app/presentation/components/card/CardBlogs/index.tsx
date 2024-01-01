import { getString } from 'app/presentation/localization';
import { Images, theme } from 'app/presentation/theme';
import { neutral } from 'app/presentation/theme/Colors';
import Dimensions from 'app/presentation/theme/Dimensions';
import { fontFamily } from 'app/presentation/theme/Typography';
import { CheckStatusText } from 'app/shared/constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppButton, ButtonType } from '../../appbutton/AppButton';
import ImageRenderer from '../../image/ImageRenderer';
import LineItem from '../../items/LineItem';
import TextPrimary from '../../text/TextPrimary';

interface ICardBlogs {
    image?: any;
    percent?: number;
    title?: string;
    onPressBtnRegister?: () => void;
    onPressBtnDetail?: () => void;
    area?: string;
    valueProject?: number;
}
const CardBlogs = (props: ICardBlogs) => {
    const {
        image,
        percent = 0,
        title,
        valueProject = 0,
        area,
        onPressBtnRegister,
        onPressBtnDetail,
    } = props;
    return (
        <View style={styles.cardBlogsContainer}>
            {!image && (
                <ImageRenderer
                    style={styles.cardBlogsImg}
                    source={image ? image : Images.Default.Base}
                />
            )}
            <View style={styles.cardBlogsContent}>
                <TextPrimary style={styles.cardBlogsTextPrimary}>
                    {title}
                </TextPrimary>
                <LineItem
                    value={area}
                    title={getString('area')}
                    status={CheckStatusText.SecondaryBrand}
                />
                <LineItem
                    value={valueProject}
                    title={getString('valueProject')}
                    status={CheckStatusText.SecondaryBrand}
                    currency
                />
                <LineItem
                    styleTextInput={{
                        borderBottomColor: `${theme.color.grayBackgroundColor}`,
                        borderBottomWidth: 1,
                    }}
                    value={`${percent}%`}
                    title={getString('remainingInvestmentRate')}
                    status={CheckStatusText.SecondaryBrand}
                />
                <View style={styles.cardBlogsBtn}>
                    <AppButton
                        styleBtn={{ flex: 1 }}
                        name={getString('signup')}
                        type={ButtonType.SquareBorderRed}
                        onPress={onPressBtnRegister}
                    />
                    <AppButton
                        styleBtn={{
                            flex: 1,
                            marginLeft: Dimensions.Spacing.large,
                        }}
                        name={getString('detail')}
                        type={ButtonType.SquareRed}
                        onPress={onPressBtnDetail}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    cardBlogsContainer: {
        backgroundColor: neutral.white,
        borderRadius: Dimensions.Spacing.small,
    },
    cardBlogsContent: {
        paddingHorizontal: Dimensions.Spacing.large,
        paddingVertical: Dimensions.Spacing.large,
    },
    cardBlogsImg: {
        width: '100%',
        height: Dimensions.moderateScale(194),
        borderTopRightRadius: Dimensions.Spacing.tiny,
        borderTopLeftRadius: Dimensions.Spacing.tiny,
    },
    cardBlogsBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Dimensions.Spacing.medium,
    },
    cardBlogsTextPrimary: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Medium,
        color: neutral.black,
        marginBottom: Dimensions.Spacing.small,
    },
});
export default CardBlogs;
