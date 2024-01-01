type Neutral =
    | 'white'
    | 's100'
    | 's125'
    | 's140'
    | 's150'
    | 's175'
    | 's190'
    | 's200'
    | 's250'
    | 's300'
    | 's400'
    | 's500'
    | 's600'
    | 's700'
    | 's800'
    | 's900'
    | 'black'
    | 'grayScale'
    | 'grayScale2'
    | 'grayScale4'
    | 'r125';

export const neutral: Record<Neutral, string> = {
    white: '#ffffff',
    s100: '#EAEDF2',
    s125: '#EFF1F5',
    s140: '#FCFCFC',
    s150: '#F4F4F4',
    s175: '#F3F4F5',
    s190: '#E8E8E8',
    s200: '#E5E5E5',
    s250: '#C4C4C4',
    s300: '#999999',
    s400: '#818181',
    s500: '#515154',
    s600: '#38383a',
    s700: '#2d2c2e',
    s800: '#212123',
    s900: '#080808',
    black: '#0E0E0E',
    grayScale: '#F3F4F5',
    grayScale2: '#E8E8E8',
    grayScale4: ' #818181',
    r125: '#C00000',
};

type Primary = 'brand' | 's600' | 's700';
export const primary: Record<Primary, string> = {
  brand: '#D2232A',
  s600: '#E31837',
  s700: '#9A0000',
};

type Secondary = 'brand' | 's200' | 's600' | 'whiteGray';
export const secondary: Record<Secondary, string> = {
  s200: '#788190',
  brand: '#041E5E',
  s600: '#8e9DC1',
  whiteGray: '#eff1f5',
};

type Danger = 'brand';
export const danger: Record<Danger, string> = {
    brand: '#F94134',
};

type Success = 'brand';
export const success: Record<Success, string> = {
    brand: '#6AA84F',
};

type Warning = 'brand';
export const warning: Record<Warning, string> = {
    brand: '#F48120',
};

export const applyOpacity = (hexColor: string, opacity: number): string => {
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

type Transparent = 'clear' | 'lightGray' | 'darkGray';
export const transparent: Record<Transparent, string> = {
    clear: 'rgba(255, 255, 255, 0)',
    lightGray: applyOpacity(neutral.s300, 0.4),
    darkGray: applyOpacity(neutral.s800, 0.8),
};

export const shadeColor = (hexColor: string, percent: number): string => {
    const redGamut: number = parseInt(hexColor.slice(1, 3), 16);
    const greenGamut: number = parseInt(hexColor.slice(3, 5), 16);
    const blueGamut: number = parseInt(hexColor.slice(5, 7), 16);

    const rgb: Array<number> = [redGamut, greenGamut, blueGamut];

    const toShadedGamut = (gamut: number): number => {
        return Math.floor(Math.min(gamut * (1 + percent / 100), 255));
    };

    const toHex = (gamut: number): string => {
        return gamut.toString(16).length === 1
            ? `0${gamut.toString(16)}`
            : gamut.toString(16);
    };

    const shadedRGB: Array<number> = rgb.map(toShadedGamut);
    const shadedHex: Array<string> = shadedRGB.map(toHex);

    const hexString: string = shadedHex.join('');

    return `#${hexString}`;
};


