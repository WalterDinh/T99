import images from 'app/assets/images';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import Utilities from 'app/shared/helper/utilities';
import React from 'react';
import {
    FlatList,
    Modal,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import InputSearch from '../input/InputSearch';
import TextPrimary from '../text/TextPrimary';
import styles from './ModalPicker.styles';

let componentIndex = 0;

interface Props {
    data: Array<any>;
    onChange?: (item: any) => void;
    onModalOpen?: () => void;
    onModalClose?: () => void;
    keyExtractor: (item: any, index?: number) => string;
    labelExtractor: (item: any, index?: number) => string;
    visible?: boolean;
    closeOnChange?: boolean;
    initValue?: string;
    animationType?: string;
    style?: any;
    selectStyle?: any;
    selectTextStyle?: any;
    optionStyle?: any;
    optionTextStyle?: any;
    optionContainerStyle?: any;
    sectionStyle?: any;
    childrenContainerStyle?: any;
    touchableStyle?: any;
    touchableActiveOpacity?: number;
    sectionTextStyle?: any;
    selectedItemTextStyle?: any;
    cancelContainerStyle?: any;
    cancelStyle?: any;
    cancelTextStyle?: any;
    overlayStyle?: any;
    cancelText?: string;
    disabled?: boolean;
    supportedOrientations?: string;
    keyboardShouldPersistTaps?: 'always' | 'handled' | 'never' | boolean;
    showSearch?: boolean;
    backdropPressToClose?: boolean;
    accessible?: boolean;
    scrollViewAccessibilityLabel?: string;
    cancelButtonAccessibilityLabel?: string;
    passThruProps?: any;
    modalOpenerHitSlop?: any;
    customSelector?: React.ReactElement;
    containerTestId?: any;
    itemTestId?: any;
    renderItem?: (item: any) => void;
    styleModal?: any;
}

interface State {
    modalVisible?: boolean;
    selected?: string;
    cancelText?: string;
    changedItem?: any;
    dataShow: Array<any>;
    textSearch: string;
}

const defaultProps = {
    data: [],
    keyExtractor: (item: any) => item.key,
    labelExtractor: (item: any) => item.label,
    visible: false,
    closeOnChange: true,
    initValue: 'Select me!',
    animationType: Platform.OS === 'android' ? 'fade' : 'slide',
    style: {},
    selectStyle: {},
    selectTextStyle: {},
    optionStyle: {},
    optionTextStyle: {
        color: Colors.neutral.black,
    },
    optionContainerStyle: {},
    sectionStyle: {},
    childrenContainerStyle: {},
    touchableStyle: {},
    touchableActiveOpacity: 0.7,
    sectionTextStyle: {},
    selectedItemTextStyle: { fontFamily: theme.font.Medium },
    cancelContainerStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'Cancel',
    disabled: false,
    supportedOrientations: ['portrait', 'landscape'],
    keyboardShouldPersistTaps: 'always',
    backdropPressToClose: true,
    accessible: false,
    scrollViewAccessibilityLabel: undefined,
    cancelButtonAccessibilityLabel: undefined,
    passThruProps: {},
    modalOpenerHitSlop: { top: 0, bottom: 0, left: 0, right: 0 },
    customSelector: undefined,
    renderItem: undefined,
    styleModal: undefined,
    showSearch: false,
};

export default class ModalSelector extends React.Component<Props, State> {
    modal?: any;

    static defaultProps = defaultProps;

    constructor(props: Props) {
        super(props);

        this.state = {
            modalVisible: props.visible,
            selected: props.initValue,
            cancelText: props.cancelText,
            textSearch: '',
            dataShow: props.data,
            changedItem: undefined,
        };
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const newState: State = {
            dataShow: this.props.data,
            textSearch: this.state.textSearch,
        };
        let doUpdate = false;
        if (prevProps.initValue !== this.props.initValue) {
            newState.selected = this.props.initValue;
            doUpdate = true;
        }
        if (prevProps.data !== this.props.data) {
            doUpdate = true;
        }
        if (prevState.textSearch !== this.state.textSearch) {
            if (this.state.textSearch === '') {
                newState.dataShow = this.props.data;
            } else {
                const data = this.props.data.filter((elm: any) =>
                    elm.label
                        .toLocaleLowerCase()
                        .includes(this.state.textSearch.toLocaleLowerCase()),
                );
                newState.dataShow = data;
            }
            doUpdate = true;
        }

        if (prevProps.visible !== this.props.visible) {
            newState.modalVisible = this.props.visible;
            doUpdate = true;
        }
        if (doUpdate) {
            this.setState(newState);
        }
    }

    onChange = (item: any) => {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
        if (this.props.labelExtractor) {
            this.setState(
                {
                    selected: this.props.labelExtractor(item),
                    changedItem: item,
                },
                () => {
                    if (this.props.closeOnChange) {
                        this.close();
                    }
                },
            );
        }
    };

    onSearch = (text: string) => {
        this.setState({ textSearch: text });
    };

    getSelectedItem() {
        return this.state.changedItem;
    }

    close = () => {
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
        this.setState({
            modalVisible: false,
        });
    };

    open = () => {
        if (this.props.onModalOpen) {
            this.props.onModalOpen();
        }
        this.setState({
            modalVisible: true,
            changedItem: undefined,
        });
    };

    renderSection = (section: any) => {
        return (
            <View
                key={this.props.keyExtractor(section)}
                style={[styles.sectionStyle, this.props.sectionStyle]}
            >
                <TextPrimary
                    style={[
                        styles.sectionTextStyle,
                        this.props.sectionTextStyle,
                    ]}
                >
                    {this.props.labelExtractor(section)}
                </TextPrimary>
            </View>
        );
    };

    renderHeaderSearch = () => {
        return (
            <View
                style={{
                    paddingHorizontal: Dimensions.moderateScale(22),
                    paddingTop: Dimensions.Spacing.medium,
                }}
            >
                <InputSearch
                    onChangeText={this.onSearch}
                    placeholderOpacity
                    value={this.state.textSearch}
                    placeholder={getString('search')}
                    iconRightPath={images.Icons.CloseFilled}
                />
            </View>
        );
    };

    renderOption = (option: any, isLastItem?: boolean) => {
        const optionLabel = this.props.labelExtractor(option);
        const isSelectedItem = optionLabel === this.state.selected;

        return (
            <TouchableOpacity
                key={this.props.keyExtractor(option)}
                onPress={() => this.onChange(option)}
                activeOpacity={this.props.touchableActiveOpacity}
                accessible={this.props.accessible}
                accessibilityLabel={option.accessibilityLabel || undefined}
                {...this.props.passThruProps}
            >
                {this.props.renderItem ? (
                    this.props.renderItem(option)
                ) : (
                    <View
                        style={[
                            styles.optionStyle,
                            this.props.optionStyle,
                            isSelectedItem && {
                                borderBottomColor:
                                    theme.color.colorSecondaryVariant,
                            },
                            isLastItem && { borderBottomWidth: 0 },
                        ]}
                    >
                        <TextPrimary
                            style={[
                                styles.optionTextStyle,
                                this.props.optionTextStyle,
                                isSelectedItem &&
                                    this.props.selectedItemTextStyle,
                            ]}
                        >
                            {optionLabel}
                        </TextPrimary>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    renderOptionList = () => {
        const { keyExtractor, containerTestId } = this.props;
        const closeOverlay = this.props.backdropPressToClose;
        return (
            <TouchableWithoutFeedback
                testID={containerTestId}
                key={'modalSelector' + componentIndex++}
                onPress={() => {
                    if (closeOverlay) this.close();
                }}
            >
                <View style={[styles.overlayStyle, this.props.overlayStyle]}>
                    <View
                        style={[
                            styles.optionContainer,
                            this.props.optionContainerStyle,
                        ]}
                    >
                        {this.props.showSearch && this.renderHeaderSearch()}
                        <FlatList
                            data={this.state.dataShow}
                            keyboardShouldPersistTaps={
                                this.props.keyboardShouldPersistTaps
                            }
                            showsVerticalScrollIndicator={false}
                            accessible={this.props.accessible}
                            accessibilityLabel={
                                this.props.scrollViewAccessibilityLabel
                            }
                            renderItem={({ item, index }) =>
                                this.renderOption(
                                    item,
                                    index === this.state.dataShow.length - 1,
                                )
                            }
                            ListEmptyComponent={
                                <View style={styles.dataEmpty}>
                                    <TextPrimary
                                        style={[
                                            styles.optionTextStyle,
                                            { paddingTop: 60 },
                                        ]}
                                    >
                                        {getString('noData')}
                                    </TextPrimary>
                                </View>
                            }
                            keyExtractor={keyExtractor}
                            listKey={'modal_picker_list'}
                        />
                    </View>
                    {/* {this.props.data && this.props.data.length === 0 ? (
                        <View
                            style={[
                                styles.cancelContainer,
                                this.props.cancelContainerStyle,
                            ]}
                        >
                            <TouchableOpacity
                                onPress={this.close}
                                activeOpacity={
                                    this.props.touchableActiveOpacity
                                }
                                accessible={this.props.accessible}
                                accessibilityLabel={
                                    this.props.cancelButtonAccessibilityLabel
                                }
                            >
                                <View
                                    style={[
                                        styles.cancelStyle,
                                        this.props.cancelStyle,
                                    ]}
                                >
                                    <TextPrimary
                                        style={[
                                            styles.cancelTextStyle,
                                            this.props.cancelTextStyle,
                                        ]}
                                    >
                                        {this.props.cancelText}
                                    </TextPrimary>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : null} */}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    render() {
        return (
            <Modal
                transparent
                ref={(element) => (this.modal = element)}
                supportedOrientations={['portrait']}
                visible={this.state.modalVisible}
                onRequestClose={this.close}
                animationType={'slide'}
                // onDismiss={() => {
                //     if(this.state.changedItem && this.props.onChange) {
                //         this.props.onChange(this.state.changedItem);
                //     }
                // }}
            >
                {this.renderOptionList()}
            </Modal>
        );
    }
}
