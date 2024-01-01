class LocationHelper {
    isPermissionAsked = false;

    requestPermissionAndGetLocation = (shouldShowLocationPopup = true): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            resolve(undefined);
            // let locationGranted = await PermissionHelper.getInstance().checkPermission(PermissionHelper.Permissions.InUseLocation);
            // if(locationGranted === 'unavailable' && shouldShowLocationPopup) {
            //     Utilities.showComfirmationAlert('Your location service is off. Benefit needs your location to get the best offers for you. Do you want to enable?',
            //         async () => {
            //             await openSettings();
            //             reject({message: 'Location service is not available'});
            //         }, () => {
            //             reject({message: 'Location service is not available'});
            //         }, 'Location service is not available');
            //     return;
            // }
            // if(locationGranted === 'denied' && !this.isPermissionAsked) {
            //     this.isPermissionAsked = true;
            //     locationGranted = await PermissionHelper.getInstance().requestPermission(PermissionHelper.Permissions.InUseLocation);
            // }


            // if(locationGranted === 'granted' || locationGranted === 'limited') {
            //     Geolocation.getCurrentPosition(
            //         async (position) => {
            //             const userLocation: GeoCoordinates | undefined = position.coords;
            //             if(userLocation) {
            //                 new CustomerRepository().saveUserLocation(userLocation);
            //                 resolve(userLocation);
            //             }
            //         },
            //         (error) => {
            //             // See error code charts below.
            //             reject(error);
            //         },
            //         {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
            //     );
            // } else {
            //     const userLocation = (await new CustomerRepository().getUserLocation()).data;
            //     resolve(userLocation);
            // }
        });
    }

    getSavedLocation = async (): Promise<any> => {
        return Promise.resolve(undefined);
        // return (await new CustomerRepository().getUserLocation()).data;
    }
}

export default new LocationHelper();