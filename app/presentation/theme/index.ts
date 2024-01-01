import ImageAssets from '../../assets/images';
import Dimens from './Dimensions';
import {themeDefault} from 'app/presentation/theme/ThemeDefault';
import {ITheme} from 'app/presentation/theme/ThemeInterface';
import * as mColors from './Colors';

export interface IFontSize {
    tiny: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    huge: number;
    extraHuge: number;
    extraGiant: number;
}

export let theme: ITheme = {
    ...themeDefault
};

export const Images = ImageAssets;

export const Dimensions = Dimens;

export const Colors = mColors;

export const Themes = {
    themeDefault
};

export const createTheme = (_theme: ITheme): ITheme => {
    theme = {..._theme};

    return theme;
};

export const getAppTheme = (): ITheme => theme;