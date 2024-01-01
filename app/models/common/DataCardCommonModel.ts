import { CheckStatusActive, CheckStatusText, PriceFormat } from 'app/shared/constants';
import { TextStyle } from 'react-native';

export default class DataCardCommonModel {
    title?: string;
    value?: string | Date | number;
    styleValue?: TextStyle;
    status?: CheckStatusText;
    statusTitle?: CheckStatusActive;
    styleTextInput?: TextStyle;
    styleTitle?: TextStyle;
    fixTitle?: string;
    contentRight?: string;
    currency?: boolean;
    format?: PriceFormat;
    onPressValue?: ()=> void;
    constructor() {
        this.title = '';
        this.value = '';
        this.styleValue = {};
        this.status;
        this.statusTitle;
        this.styleTextInput = {};
        this.styleTitle = {};
        this.contentRight = '';
        this.currency = false;
        this.format = PriceFormat.Comma;
        this.onPressValue= ()=>{};
    }

    static parseFromJson = (data: any): DataCardCommonModel => {
        const obj = new DataCardCommonModel();
        const {
            title,
            value,
            styleValue,
            status,
            statusTitle,
            styleTextInput,
            styleTitle,
            contentRight,
            currency,
            format
        } = data;
        obj.title = title;
        obj.currency = currency;
        obj.value = value;
        obj.styleValue = styleValue;
        obj.status = status;
        obj.statusTitle = statusTitle;
        obj.styleTextInput = styleTextInput;
        obj.styleTitle = styleTitle;
        obj.contentRight = contentRight;
        obj.format = format;
        return obj;
    };
}
