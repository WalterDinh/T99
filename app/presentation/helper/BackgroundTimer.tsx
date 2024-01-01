import {
    DeviceEventEmitter,
    NativeAppEventEmitter,
    Platform,
} from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';

const EventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
});

class BackgroundTimer {
    static backgroundListener: any;
    static backgroundTimer: number;
    static setInterval(callback: () => void, delay: number) {
        _BackgroundTimer.start();
        this.backgroundListener =
            EventEmitter &&
            EventEmitter().addListener('backgroundTimer', () => {
                this.backgroundTimer = _BackgroundTimer.setInterval(
                    callback,
                    delay,
                );
            });
        return this.backgroundListener;
    }

    static clearInterval(timer: { remove: () => void }) {
        if (timer) timer.remove();
        if (this.backgroundTimer)
            _BackgroundTimer.clearInterval(this.backgroundTimer);
        _BackgroundTimer.stop();
    }
}

export default BackgroundTimer;
