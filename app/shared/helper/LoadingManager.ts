import LoadingViewOnly from 'app/presentation/components/loading/LoadingViewOnly';

export default class LoadingManager {
    private static loadingRef?: LoadingViewOnly;

    static setLoadingRef = (ref: LoadingViewOnly) => {
        LoadingManager.loadingRef = ref;
    };

    static setLoading = (loading: boolean) => {
        if (LoadingManager.loadingRef) {
            LoadingManager.loadingRef.setLoading(loading);
        }
    };
}
