import { useEffect, useRef, useState } from 'react';
import BackgroundTimer from '../helper/BackgroundTimer';

export const useDidMount = (callback: () => void) => {
    const didmountRef = useRef<boolean>(false);
    useEffect(() => {
        if (!didmountRef.current) {
            didmountRef.current = true;
            callback();
        }
    }, [callback]);
};

export const useCountDown = (remainingTime: number) => {
    const [time, setTime] = useState(remainingTime);
    const interval = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        setTime(remainingTime);
        interval.current = setInterval(() => {
            setTime((prevState) => {
                const _time = Math.max(prevState - 1, 0);
                if (_time === 0 && interval.current) {
                    clearInterval(interval.current);
                    interval.current = undefined;
                }

                return _time;
            });
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [setTime, remainingTime]);

    return time;
};

export const useCountDownBackground = (remainingTime: number) => {
    const [time, setTime] = useState(remainingTime);
    const interval = useRef<any>();

    useEffect(() => {
        if (interval.current) {
            BackgroundTimer.clearInterval(interval.current);
        }
        setTime(remainingTime);

        interval.current =  BackgroundTimer.setInterval(() => {
            setTime((prevState) => {
                const _time = Math.max(prevState - 1, 0);
                if (_time === 0 && interval.current) {
                    BackgroundTimer.clearInterval(interval.current);
                }
                return _time;
            });
        }, 1000);

        return () => {
            if (interval.current) {
                BackgroundTimer.clearInterval(interval.current);
            }
        };
    }, [setTime, remainingTime]);

    return time;
};
