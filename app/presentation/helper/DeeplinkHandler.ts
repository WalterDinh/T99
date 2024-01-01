import {getConfig} from 'app/config';
import {DeepLinkKeys, DeepLinkRoutes} from 'app/shared/constants';
import NavigationService from 'app/shared/helper/NavigationService';
import AppManager from 'app/shared/managers/AppManager';
import qs from 'query-string';

type ParamsKeys = 'offers' | 'articles' | 'mini-courses';

class DeeplinkHandler {
    shouldIgnoreDeeplink = (url: string): boolean => {
        if(url.includes('auth0')) return true;
        const configs = getConfig();
        if (!configs) return false;
        if (url.startsWith(configs?.dynamicLinkUrl)) return true;
        return false;
    }


    handleDeeplinkUrl = (url: string): boolean => {
        const configs = getConfig();
        const extracted = qs.parseUrl(url);
        const _url = extracted.url;
        if(this.shouldIgnoreDeeplink(_url)) {
            console.info('Ignore deeplink: ', extracted);
            return true;
        }
        const deeplinkScheme = `${configs.deeplinkScheme}://`;
        const isDeeplink = _url.startsWith(deeplinkScheme);
        const paramsString: any = _url.replace(`${configs.deeplinkScheme}://`, '').replace('https://', '').split('/') || [];
        if(!isDeeplink) {
            paramsString.shift();
        }
        if(paramsString.length === 0) {
            return true;
        }
        console.info('Deeplink: ', paramsString, extracted);
        const key: ParamsKeys = paramsString[0]
        const paramsValue = paramsString[1]
        const routeName = DeepLinkRoutes?.[key]
        const objectParams: any = {}
        if(paramsValue) {
            objectParams[DeepLinkKeys?.[key]] = paramsValue
        }

        const tabRoutes = [DeepLinkRoutes['courses'], DeepLinkRoutes['my-pocket'], DeepLinkRoutes['connect'], DeepLinkRoutes['profile']];
        let deeplinkConsumed = false;

        if(routeName === DeepLinkRoutes.articles || routeName === DeepLinkRoutes.offers) {
            if(AppManager.appState.credentialsReadyForAuth) {
                // @ts-ignore
                NavigationService.push(routeName, objectParams);
                deeplinkConsumed = true;
            } 
        }
        
        return deeplinkConsumed;
    }
}

export default new DeeplinkHandler();