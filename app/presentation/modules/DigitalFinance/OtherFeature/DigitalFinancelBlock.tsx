import { StyleProp, View, ViewStyle } from 'react-native'
import React from 'react'
import { TextPrimary } from 'app/presentation/components';
import Img from 'app/assets/images'
import { Item } from './Item';
import { styles } from './styles';
import { getString } from 'app/presentation/localization';


interface IProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    imgPath?: any,
    unread?: boolean,
    onPress: (type: string) => void,
}
const dataDigitalFinancelBlock = [
    {
        text: getString('t99'),
        title: getString('golf'),
        source: Img.Icons.Golf,
        type: 'golf'
    },
    {
        text: getString('t99'),
        title: getString('pawn'),
        source: Img.Icons.Pawn,
        type: 'pawn'
    },
    {
        text: getString('t99'),
        title: getString('invest'),
        source: Img.Icons.Wallet,
        type: 'invest'
    },
    {
        text: getString('t99'),
        title: getString('saving'),
        source: Img.Icons.Crown,
        type: 'saving'
    },
]

const DigitalFinancelBlock = (props: IProps) => {
    const { style, title, onPress } = props
    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <TextPrimary style={styles.titleFeature}>{title}</TextPrimary>
            </View>
            <View style={styles.content}>
                {(dataDigitalFinancelBlock || [])?.map((item, index) => {
                    return <Item text={item?.text} title={item?.title} source={item?.source} onPressBlock={() => onPress(item?.type)} />
                }
                )}
            </View>
        </View>
    )
}

export default DigitalFinancelBlock
