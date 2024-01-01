import {DeviceEventEmitter} from 'react-native';

export const EventNames = {
    showInAppNotification: 'showInAppNotification',
    updateTabBarBadge: 'updateTabBarBadge',
};

export const EventActions = {
    activeOffer: 'activeOffer',
    shareOffer: 'shareOffer',
    shareArticle: 'shareArticle',
    logout: 'logoutApp'
};

export default DeviceEventEmitter;
