import {Platform} from 'react-native';
import {request, check, PERMISSIONS, Permission, RESULTS} from 'react-native-permissions';

class PermissionHelper {
    static Permissions = {
        InUseLocation: Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        })!
    };

    static Results = RESULTS;

    static instance: PermissionHelper;

    static getInstance = () => {
        if(!PermissionHelper.instance) {
            PermissionHelper.instance = new PermissionHelper();
        }

        return PermissionHelper.instance;
    };

    checkPermission = (permission: Permission) => {
        return check(permission);
    }

    requestPermission = (permission: Permission) => {
        return request(permission);
    };
}

export default PermissionHelper;
