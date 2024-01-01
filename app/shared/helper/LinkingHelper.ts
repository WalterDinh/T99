import {getConfig} from 'app/config';
import CustomerRepository from 'app/data/repository/customer';
import ResponseModel from 'app/models/common/ResponseModel';
import {Linking} from 'react-native';


export const MESSENGER_URI = 'fb-messenger://';
export const USER_MESSENGER_URI = `${MESSENGER_URI}user-thread/`;
export const GOOGLE_MAPS_SEARCH_URI = `https://www.google.com/maps/search/`;
export default class LinkingHelper {
    static openUrl = (url: string) => {
        return new Promise(((resolve, reject) => {
            let _url = url;
            if(!url.startsWith('http')) {
                _url = `https://${url}`;
            }
            Linking.openURL(_url).then(resolve).catch(reject);
        }));
    };

    static openMessenger = (facebookId: string) => {
        const url = `${USER_MESSENGER_URI}${facebookId}`;
        return LinkingHelper.openUrl(url);
    };

    static buildGoogleMapSearchWithCoordinates = (lat: number, lng: number, placeId?: string) => {
        return GOOGLE_MAPS_SEARCH_URI + `?api=1&query=${lat},${lng}${placeId ? `&query_place_id=${placeId}` : ''}`;
    };

    static buildGoogleMapSearchWithAddress = (address: string, placeId?: string) => {
        return GOOGLE_MAPS_SEARCH_URI + `?api=1&query=${encodeURI(address)}${placeId ? `&query_place_id=${placeId}` : ''}`;
    };

    static buildOpenWebPageWithParams = (params: string) => {
        return getConfig().universalLink + `${params}`;
    }

    static openGoogleMapWithCoordinates = (lat: number, lng: number, placeId?: string) => {
        const uri = LinkingHelper.buildGoogleMapSearchWithCoordinates(lat, lng, placeId);
        return LinkingHelper.openUrl(uri);
    };

    static openGoogleMapWithAddress = (address: string, placeId?: string) => {
        const uri = LinkingHelper.buildGoogleMapSearchWithAddress(address, placeId);
        return LinkingHelper.openUrl(uri);
    };

    static phoneCall = (phoneNumber: string) => {
        Linking.openURL(`tel://${phoneNumber}`);
    };

    static mailTo = (mail: string) => {
        Linking.openURL(`mailto://${mail}`);
    };

    static buildHubspotResignupFormUrl = (): string => {
        return `${getConfig().universalLink}resignup`
    }

    static openWebPage = (params: string) => {
        const uri = LinkingHelper.buildOpenWebPageWithParams(params);
        return LinkingHelper.openUrl(uri);
    };

}
