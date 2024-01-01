import images from 'app/assets/images';
import LoanRepository from 'app/data/repository/loan';
import { GetListAssetAsyncUseCase } from 'app/domain/customer/loan/GetListAssetAsyncUseCase';
import { getString } from 'app/presentation/localization';
import { Colors, theme } from 'app/presentation/theme';
import Dimensions from 'app/presentation/theme/Dimensions';
import LoadingManager from 'app/shared/helper/LoadingManager';
import Utilities from 'app/shared/helper/utilities';
import React, { useEffect } from 'react';
import {
    FlatList,
    Modal,
    Platform,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import ImageRenderer from '../image/ImageRenderer';
import InputSearch from '../input/InputSearch';
import TextPrimary from '../text/TextPrimary';
import { modalPickerAssetStyles } from './ModalPicker.styles';
import Toast from 'react-native-toast-message';
import { StatusToast } from 'app/shared/constants';


let componentIndex = 0;

interface Props {
    onChange?: (item: any) => void;
    onChangeTextSearch?: (text: string) => void;
    onModalOpen?: () => void;
    onModalClose?: () => void;
    keyExtractor: (item: any, index?: number) => string;
    idExtractor: (item: any, index?: number) => string;
    valueExtractor: (item: any, index?: number) => Array<any>;
    labelExtractor: (item: any, index?: number) => string;
    labelChildExtractor: (item: any, index?: number) => string;
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
    isShowChildren?: boolean;
    assetGroup?: { key: string; label: string };
    changeAssetType?: boolean;
}

interface State {
    modalVisible?: boolean;
    selected?: string;
    selectedChild?: string;
    cancelText?: string;
    changedItem?: any;
    dataShow: Array<any>;
    textSearch: string;
    isShow: boolean;
}

const defaultProps = {
    keyExtractor: (item: any) => item.key,
    idExtractor: (item: any) => item.id,
    labelExtractor: (item: any) => item.label,
    labelChildExtractor: (item: any) => item.productName,
    valueExtractor: (item: any) => item.value,
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
    keyboardShouldPersistTaps: 'never',
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
    isShowChildren: false,
    assetGroup: undefined,
    changeAssetType: undefined,
};




export default class ModalSelectorAsset extends React.PureComponent<Props, State> {
    modal?: any;

    static defaultProps = defaultProps;

    constructor(props: Props) {
        super(props);

        this.state = {
            modalVisible: props.visible,
            selected: props.initValue,
            selectedChild: props.initValue,
            cancelText: props.cancelText,
            textSearch: '',
            dataShow: [],
            changedItem: undefined,
            isShow: false,
        };
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const newState: State = {
            dataShow: prevState.dataShow,
            textSearch: this.state.textSearch,
            isShow: this.state.isShow,
        };
        let doUpdate = false;
        if (prevProps.initValue !== this.props.initValue) {
            newState.selected = this.props.initValue;
            newState.selectedChild = this.props.initValue;
            doUpdate = true;
        }
        if (prevProps.assetGroup !== this.props.assetGroup) {
            this.getDataShow();
            doUpdate = true;
        }
        if (prevState.textSearch !== this.state.textSearch) {
            this.getDataShow();
            doUpdate = true;
        }
        if (prevProps.changeAssetType !== this.props.changeAssetType) {
            newState.dataShow = [];
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

    getDataShow = () => {
        if (!Boolean(this.props.assetGroup)) return;
        LoadingManager.setLoading(true);
        new GetListAssetAsyncUseCase(new LoanRepository(), { assetGroupId: this.props.assetGroup?.key || '', search: this.state.textSearch.trim() })
            .execute()
            .then((res) => {

                // if (
                //     res?.status === 200 &&
                //     res?.data?.success &&
                //     res?.data?.data
                // ) {
                //     const dataListParse = res?.data.data.map(e => ListAssetAsyncModel.parseFromJson(e));
                //     setDataList(dataListParse);
                //     setAssetAsyncs(dataListParse || []);
                // } else {
                //     Toast.show({
                //         type: StatusToast.Error,
                //         text2: getString([
                //             `errors.${res?.data?.message}`,
                //             'errorMessageCommon',
                //         ]),
                //     });
                // }                
                this.setState({ dataShow: res });
            })
            .catch((err) => {
                Toast.show({
                    type: StatusToast.Error,
                    text2: getString([
                        `errors.${err?.message}`,
                        'errorMessageCommon',
                    ]),
                });
            })
            .finally(() => {
                LoadingManager.setLoading(false);
            });
    };

    onChange = (item: any) => {
        if (this.props.labelExtractor) {
            this.setState(
                {
                    selected: this.props.labelExtractor(item),
                    isShow: !this.props.isShowChildren,
                },
            );
        }
    };

    onChangeChild = (item: any) => {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
        if (this.props.labelChildExtractor) {
            this.setState(
                {
                    selected: this.props.labelChildExtractor(item),
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
                style={[modalPickerAssetStyles.sectionStyle, this.props.sectionStyle]}
            >
                <TextPrimary
                    style={[
                        modalPickerAssetStyles.sectionTextStyle,
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
                    paddingHorizontal: Dimensions.moderateScale(12),
                    paddingTop: Dimensions.Spacing.medium,
                }}
            >
                <InputSearch
                    onChangeText={this.onSearch}
                    value={this.state.textSearch}
                    placeholderOpacity
                    placeholder={getString('search')}
                    containerStyle={{ borderColor: 'red', borderRadius: 20, borderWidth: 1}}
                />
            </View>
        );
    };

    renderOption = (option: any, isLastItem?: boolean) => {
        const optionLabel = this.props.labelExtractor(option);
        const optionValue = this.props.valueExtractor(option);
        const isSelectedItem = optionLabel === this.state.selected;
        return (
            <TouchableOpacity
                onPress={() => this.onChange(option)}
                activeOpacity={this.props.touchableActiveOpacity}
                accessible={this.props.accessible}
                accessibilityLabel={option.accessibilityLabel || undefined}
                {...this.props.passThruProps}
            >
                {this.props.renderItem ? (
                    this.props.renderItem(option)
                ) : (
                    <>
                        <View
                            style={[
                                modalPickerAssetStyles.optionStyle,
                                this.props.optionStyle,

                            ]}
                        >
                            <TextPrimary
                                style={[
                                    modalPickerAssetStyles.optionTextStyle,
                                    this.props.optionTextStyle,
                                    isSelectedItem &&
                                    this.props.selectedItemTextStyle,
                                ]}
                            >
                                {optionLabel}

                            </TextPrimary>
                            <ImageRenderer style={{ height: 4, width: 8 }} resizeMode={'contain'} source={images.Icons.AngleDown} />
                        </View>

                        {isSelectedItem && (
                            optionValue.map((item: any) => {
                                const optionChillLabel = this.props.labelChildExtractor(item);

                                const isSelectedItemChild = optionChillLabel === this.state.selected;

                                return (
                                    <TouchableOpacity
                                        key={this.props.idExtractor(item)}
                                        onPress={() => this.onChangeChild(item)}
                                        activeOpacity={this.props.touchableActiveOpacity}
                                        accessible={this.props.accessible}
                                        accessibilityLabel={item.accessibilityLabel || undefined}
                                        {...this.props.passThruProps}
                                    >
                                        {this.props.renderItem ? (
                                            this.props.renderItem(item)
                                        ) : (
                                            <View
                                                style={[
                                                    modalPickerAssetStyles.optionChildStyle,
                                                    isSelectedItemChild && {
                                                        borderBottomColor:
                                                            theme.color.colorSecondaryVariant,
                                                    },
                                                ]}
                                            >
                                                <TextPrimary
                                                    style={[
                                                        modalPickerAssetStyles.optionTextStyle,
                                                        this.props.optionTextStyle,
                                                        isSelectedItemChild &&
                                                        this.props.selectedItemTextStyle,
                                                    ]}
                                                >
                                                    {item.productName}
                                                </TextPrimary>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )
                            })
                        )}
                    </>
                )}
            </TouchableOpacity>
        );
    };

    renderOptionList = () => {
        const { keyExtractor, containerTestId } = this.props;
        const closeOverlay = this.props.backdropPressToClose;
        return (
            <TouchableWithoutFeedback
                // testID={containerTestId}
                // key={'modalSelector' + componentIndex++}
                onPress={() => {
                    if (closeOverlay) this.close();
                }}
            >
                <View style={[modalPickerAssetStyles.overlayStyle, this.props.overlayStyle]}>
                    <View
                        style={[
                            modalPickerAssetStyles.optionContainer,
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
                                <View
                                    style={modalPickerAssetStyles.dataEmpty}
                                >
                                    <TextPrimary
                                        style={[modalPickerAssetStyles.optionTextStyle]}
                                    >
                                        {getString('noData')}
                                    </TextPrimary>
                                </View>
                            }
                            keyExtractor={keyExtractor}
                            listKey={'modal_picker_list'}
                        />
                    </View>

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
            >
                {this.renderOptionList()}
            </Modal>
        );
    }
}
