import NavigationService from 'app/shared/helper/NavigationService';
import {AllRouteParamList} from '../navigation/routes/routeParams';

export type RouteParams<RouteName extends keyof AllRouteParamList> = {route?: keyof AllRouteParamList, routeParams?: Partial<AllRouteParamList[RouteName]>};

export interface IRouteAdapter {
    convertToRouteParams: (data: any) => RouteParams<keyof AllRouteParamList>;
}

class RouteManager {
    continueRoute?: keyof AllRouteParamList;
    continueRouteParams?: any;

    consumeContinueRouteIfPossible = (): boolean => {
        if(this.continueRoute) {
            NavigationService.navigate(this.continueRoute, this.continueRouteParams);
            this.continueRoute = undefined;
            this.continueRouteParams = undefined;

            return true;
        }
        return false;
    }
}

export default new RouteManager();