import React, { memo, useRef, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import Image from 'app/assets/images/index';
import Dimensions from 'app/presentation/theme/Dimensions';
import { theme } from 'app/presentation/theme';
import TextPrimary from '../text/TextPrimary';
import { getString } from 'app/presentation/localization';
import { neutral } from 'app/presentation/theme/Colors';

interface InputSearchAndFilterProps extends TextInputProps {
    onPressFilter: () => void;
    onSearch: (text: string) => void;
}
const InputSearchAndFilter = (props: InputSearchAndFilterProps) => {
    const { onPressFilter, onSearch } = props;

    const [text, setText] = useState('');
    const onPressSearch = () => {
        onSearch && onSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor={neutral.s400}
                    placeholder={getString('search')}
                    style={[styles.input]}
                    value={text}
                    onChangeText={setText}
                    {...props}
                />
                <TouchableOpacity onPress={onPressSearch}>
                    <ImageRenderer
                        style={styles.icon}
                        source={Image.Icons.SearchFilled}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={onPressFilter}
                style={styles.filterContainer}
            >
                <TextPrimary
                    style={{
                        color: theme.color.colorPrimary,
                        fontFamily: theme.font.Medium,
                    }}
                >
                    {getString('filter')}
                </TextPrimary>
                <ImageRenderer
                    style={[styles.icon, { paddingLeft: 4 }]}
                    source={Image.Icons.Filter}
                />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 22,
        paddingVertical: 16,
        backgroundColor: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: theme.color.grayBackgroundColor,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    input: {
        fontSize: Dimensions.FontSize.extraLarge,
        fontFamily: theme.font.Regular,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginBottom: 0,
        flex: 1,
    },
});

export default memo(InputSearchAndFilter);
