import { PriceFormat } from 'app/shared/constants';
import numeral from 'numeral';

export default class CurrencyHelper {
    static getCurrencySymbol = (currencyCode: string) => {
        return '$';
    };

    static getFormattedPrice = (
        price: number,
        currencyCode = 'usd',
    ): string => {
        const symbol = CurrencyHelper.getCurrencySymbol(currencyCode);
        if (price) {
            const format = PriceFormat.Default;
            return `${symbol}${numeral(price).format(format)}`;
        }
        return `${symbol}0.00`;
    };

    static convertPrice = (price: number, rate: number): number => {
        return price * rate;
    };
    static getCurrencySymbolVnd = (currencyCode: string) => {
        return 'VND';
    };

    static getFormattedPriceVnd = (
        price: number,
        currencyCode = 'vnd',
        format: PriceFormat = PriceFormat.Comma,
    ): string => {
        const symbol = CurrencyHelper.getCurrencySymbolVnd(currencyCode);
        if (typeof price=='number') {
            return `${numeral(Number(price)).format(format)} ${symbol}`;
        }
        return `0${symbol}`;
    };
}
