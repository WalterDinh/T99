import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Alert, DeviceEventEmitter, PanResponder } from 'react-native';
import { EventActions } from 'app/shared/helper/EventEmitter';
import { useSelector } from 'react-redux';
import CustomerSelectors from 'app/presentation/redux/selectors/customer';

export default () => {
    const profileReducer = useSelector(CustomerSelectors.selectProfileReducer);
    const token = profileReducer?.data;
    const lastInteraction = useRef(new Date());
    const [timeWentInactive, setTimeWentInactive] = useState<Date | null>(null);
    const inactivityTimer = useRef<boolean | NodeJS.Timeout | number>(false);
    const waitForInactivity = useRef<number>(0);

    const INACTIVITY_CHECK_INTERVAL_MS = 1000;

    useEffect(() => {
        return () => {
            clearInterval(inactivityTimer.current as number);
            inactivityTimer.current = false;
        };
    }, []);

    useEffect(() => {
        if (!!token) {
            //  300 secs
            const autoLogoutTime = 300;
            waitForInactivity.current = autoLogoutTime * 1000;
        }
    }, [token, waitForInactivity.current]);

    const performAutoLogout = useCallback(() => {
        DeviceEventEmitter.emit(EventActions.logout);
        Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn');
    }, []);

    const checkInactive = useCallback(() => {
        if (inactivityTimer.current) {
            return;
        }
        inactivityTimer.current = setInterval(() => {
            if (
                Math.abs(
                    new Date().valueOf() - lastInteraction.current.valueOf(),
                ) >= waitForInactivity.current
            ) {
                setIsInactive();
            }
        }, INACTIVITY_CHECK_INTERVAL_MS);
    }, []);

    useEffect(() => {
        if (!!token) {
            checkInactive();
        }
    }, [checkInactive, token]);

    const setIsActive = useCallback(() => {
        lastInteraction.current = new Date();
        if (timeWentInactive) {
            setTimeWentInactive(null);
        }

        if (!!token) {
            checkInactive();
        }
    }, [token]);

    const setIsInactive = () => {
        setTimeWentInactive(new Date());
        performAutoLogout();
        clearInterval(inactivityTimer.current as number);
        inactivityTimer.current = false;
    };

    const handleMoveShouldSetPanResponder = useCallback(() => {
        setIsActive();
        return false;
    }, [setIsActive]);

    const handleStartShouldSetPanResponder = useCallback(() => {
        setIsActive();
        return false;
    }, [setIsActive]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
                onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
                onStartShouldSetPanResponderCapture: () => false,
                onMoveShouldSetPanResponderCapture: () => false,
                onPanResponderTerminationRequest: () => true,
                onShouldBlockNativeResponder: () => false,
            }),
        [],
    );

    return {
        panResponder,
    };
};
