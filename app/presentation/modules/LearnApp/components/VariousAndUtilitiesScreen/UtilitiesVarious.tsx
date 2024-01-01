import {
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import Img from '../../../../../assets/images';
import { getString } from 'app/presentation/localization';
import { Dimensions } from 'app/presentation/theme';
import { styles } from './styles';
import { Item } from './Item';

interface IProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    imgPath?: any;
    unread?: boolean;
    onClickPayments?: () => void;
    disabled?: boolean
}

const UtilitiesVarious = (props: IProps) => {
    const { style, title, onClickPayments, disabled} = props;
    return (
        <View style={[styles.container, style]}>
            <View style={styles.content}>
                <Item
                    disabled={disabled}
                    onPress={onClickPayments}
                    text={getString('pay')}
                    source={Img.Icons.Payment}
                />
                <Item
                    disabled={disabled}
                    text={getString('bookGolf')}
                    source={Img.Icons.BookGolf}
                    styleBtn={{ marginHorizontal: Dimensions.Spacing.large }}
                />
                <Item
                    disabled={disabled}
                    text={getString('fashionLuxury')}
                    source={Img.Icons.FashionLuxury}
                />
            </View>
            <View style={[styles.content,{marginTop:32}]}>
                <Item
                    disabled={disabled}
                    text={getString('lifeUtilities')}
                    source={Img.Icons.Payment}
                />
                <Item
                    disabled={disabled}
                    text={getString('riesountResort')}
                    source={Img.Icons.RisemountResort}
                    styleBtn={{ marginHorizontal: Dimensions.Spacing.large }}
                />
            </View>
        </View>
    );
};

export default UtilitiesVarious;
