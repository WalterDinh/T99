import { TextPrimary } from 'app/presentation/components';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Img from '../../../../../assets/images';
import { Item } from './Item';
import { styles } from './styles';


interface IProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    imgPath?: any,
    unread?: boolean,
    onClickPayments?: () => void;
    onClickResort?: () => void;
    onClickBookGolf?: () => void;
    onClickFashionLuxury?: () => void;
    onClickLifeUtilities?: () => void;

}

const Utilities = (props: IProps) => {
    const { style, title, onClickPayments, onClickResort, onClickBookGolf, onClickFashionLuxury, onClickLifeUtilities } = props
    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <TextPrimary style={styles.titleFeature}>{title}</TextPrimary>
                {/* <TouchableOpacity style={styles.btnTitle}>
                    <TextPrimary style={styles.titleBtnTitle}>
                        {getString('sortFeatures')}
                    </TextPrimary>
                    <ImageRenderer source={Img.Icons.Soft} style={styles.iconTitle} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.content}>
                <Item onPress= {onClickPayments} text={getString('contractPayments')} source={Img.Icons.Payment} />
                <Item onPress= {onClickBookGolf} text={getString('bookGolf')} source={Img.Icons.BookGolf} styleBtn={{ marginHorizontal: Dimensions.Spacing.large }} />
                <Item onPress= {onClickFashionLuxury} text={getString('fashionLuxury')} source={Img.Icons.FashionLuxury} />
            </View>
            <View style={styles.content}>
                <Item onPress= {onClickLifeUtilities} text={getString('lifeUtilities')} source={Img.Icons.Payment} />
                <Item onPress={onClickResort} text={getString('risemountResort')} source={Img.Icons.RisemountResort} styleBtn={{ marginHorizontal: Dimensions.Spacing.large }} />
                {/* <Item text={getString('seeMore')} source={Img.Icons.Seemore} /> */}
                <View style={{flex:1}}></View>
            </View>
        </View>
    )
}

export default Utilities
