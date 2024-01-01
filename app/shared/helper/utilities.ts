import {AppUpgradeVersionModel} from 'app/models/common/PlatformSettings';
import {Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getString} from '../../presentation/localization';
import {YOUTUBE_ID_REGEX} from '../constants';
import qs from 'query-string';
import {LinkingHelper} from '.';
import {AllRouteParamList} from 'app/presentation/navigation/routes/routeParams';

export default class Utilities {
    static delay = (duration = 1000): Promise<any> => {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, duration);
        }));
    };

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    static getRandomArbitrary = (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    };

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */

    static getRandomInt = (min: number, max: number): number => {
        const _min = Math.ceil(min);
        const _max = Math.floor(max);
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    };

    /**
     * Show alert with delay default to prevent loading indicator
     * @param title
     * @param message
     * @param delay
     * @param onPress
     */
    static showAlert(title: string, message: string, delay = 200, onPress?: () => void, opts = {}) {
        if(delay && delay > 0) {
            setTimeout(() => {
                Alert.alert(
                    title,
                    message,
                    [{
                        text: 'OK', onPress: () => {
                            if(Utilities.isFunction(onPress)) {
                                onPress!();
                            }
                        }
                    }],
                    {cancelable: true, ...opts}
                );
            }, delay);
        } else {
            Alert.alert(
                title,
                message,
                [{
                    text: 'OK', onPress: () => {
                        if(Utilities.isFunction(onPress)) {
                            onPress!();
                        }
                    }
                }],
                {cancelable: true, ...opts}
            );
        }
    }

    /**
     * Show confirmation dialog
     * @param title
     * @param message
     * @param approveText
     * @param cancelText
     * @param onApprove
     * @param onCancel
     */
    static showComfirmationAlert(message: string, onApprove: () => void, onCancel?: () => void,
        title?: string,
        approveText?: string,
        cancelText?: string) {
        const _title = title ? title : getString('info');
        const _approveText = approveText ? approveText : 'OK';
        const _cancelText = cancelText ? cancelText : getString('cancel');
        Alert.alert(
            _title,
            message,
            [
                {
                    text: _cancelText, onPress: onCancel
                },
                {
                    text: _approveText, onPress: onApprove
                }
            ],
            {cancelable: true}
        );
    }

    /**
     *
     * @param func
     * @returns {*|boolean}
     */
    static isFunction(func: any) {
        return Boolean(func && typeof func === 'function');
    }

    /**
     * convert array string to string with comma
     * @param data
     */
    static convertArrayStringToString(data: Array<string>, space: boolean) {
        let text = '';
        const length = data.length;
        if(length > 0) {
            const temp = space ? ', ' : ',';
            for(let i = 0; i <= length - 2; i++) {
                text = text + data[i] + temp;
            }
            text = text + data[length - 1];
        }
        return text;
    }

    static getYoutubeVideoIDFromUrl = (url: string): string => {
        const matches = url.match(YOUTUBE_ID_REGEX);
        if(matches) {
            return matches[1];
        }
        return '';
    }

    static getLoyaltyNowMemberId = (auth0Id: string): string => {
        return auth0Id;
    }

    static getAuth0IdFromLoyaltyNowId = (loyaltyNowId: string): string => {
        return loyaltyNowId.replace('googleoauth2', 'google-oauth2');
    }

    static hash = (string: string): number => {
        let hash = 0, i, chr;
        for(i = 0; i < string.length; i++) {
            chr = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    static checkAppVersion = (appVersionUpgrade: AppUpgradeVersionModel): {neededUpdate: boolean, mandatory: boolean, upgradeVersionName: string} => {
        const {ios, android} = appVersionUpgrade;
        const upgradedVersion = Platform.select({
            ios,
            android
        })!;
        const {version, mandatory} = upgradedVersion;
        if(!version || !version.split('-')[0]) {
            return {
                neededUpdate: false,
                mandatory: false,
                upgradeVersionName: ''
            };
        }
        const upgradeVersionName = version.split('-')[0];
        const versionName = DeviceInfo.getVersion();
        const needUpdate = upgradeVersionName > versionName;

        return {
            neededUpdate: needUpdate,
            mandatory,
            upgradeVersionName
        };
    }

    static createGroups = (arr: any[], numGroups = 2): any[][] => {
        const perGroup = Math.ceil(arr.length / numGroups);
        return new Array(numGroups)
            .fill('')
            .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
    }

    static createCustomSizeImageUrl = (url: string, width: number, height: number): string => {
        const {url: rootUrl, query} = qs.parseUrl(url);
        query['width'] = String(width);
        query['height'] = String(height);
        query['mode'] = 'crop';

        return `${rootUrl}?${qs.stringify(query)}`;
    }

    static addZeroToNumberLessTen(deg: any) {
        return ('0' + deg).slice(-2);
    }

    static convertTimeToMS(d: any) {
        d = Number(d);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);

        return Utilities.addZeroToNumberLessTen(m) + ':' + Utilities.addZeroToNumberLessTen(s);
    }

    static suggestSignupWithWeb = () => {
        Alert.alert(
            getString('dontHaveAccount'),
            getString('unfortunately'),
            [{
                text: getString('openWeb'), onPress: () => {
                    const params = 'login';
                    // LinkingHelper.openWebWithOtp(params);
                }
            },
            {
                text: getString('cancel')
            },
            ],
            {cancelable: true}
        );
    };

    static selectLottieAnimationName = (name: string): string => {
        return Platform.OS === 'ios' ? `Animations/${name}` : name;
    }

    static lightenDarkenColor = (col: string, amt: number) => {

        let usePound = false;

        if(col[0] == '#') {
            col = col.slice(1);
            usePound = true;
        }

        // eslint-disable-next-line prefer-const
        let num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if(r > 255) r = 255;
        else if(r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if(b > 255) b = 255;
        else if(b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if(g > 255) g = 255;
        else if(g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);

    }

    static toHHMMSS = (secs: number) => {
        const sec_num = secs;
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? '0' + v : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(':')
    }

    static extractConversationGuid = (guid?: string): {courseSlug: string | undefined, } => {
        if(guid) {
            const listIds = guid?.replace('group_', '').split('_');
            let courseSlug = guid;
            if(!!listIds && listIds.length > 1) {
                courseSlug = listIds[0];
            }

            return {
                courseSlug,
            }
        }

        return {
            courseSlug: undefined
        };
    }

    static generateTestID = (screenName: keyof AllRouteParamList, id: string): string => {
        return `${DeviceInfo.getBundleId()}.${screenName}:id/${id}`;
    }

    static queryMulti = (key: string, array: string[]) => {
        return array.reduce((prev: string, n: string, index: number) => {
            return index === 0 ? prev + `${key}=` + n : prev + `&${key}=` + n
        }, '');
    }

    static checkTypeNullAble = (thisVar: any, typeofThisVar: 'array' | 'object' | 'boolean' | 'function' | 'number' | 'string' | 'undefined'): boolean => {
        if(typeofThisVar === 'array') {
            return Boolean(thisVar == undefined || thisVar == null || Array.isArray(thisVar));
        }
        return Boolean(thisVar == undefined || thisVar == null || typeof thisVar == typeofThisVar);
    }
}
