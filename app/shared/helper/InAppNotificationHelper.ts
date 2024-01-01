import EventEmitter, {EventNames} from './EventEmitter';

export class InAppNotificationHelper {
    static showSuccess = (title: string, message?: string) => {
        EventEmitter.emit(EventNames.showInAppNotification, {
            type:'success',
            title,
            message
        });
    }

    static showError = (title: string, message?: string) => {
        EventEmitter.emit(EventNames.showInAppNotification, {
            type:'error',
            title,
            message
        });
    }

    static showInfo = (title: string, message?: string) => {
        EventEmitter.emit(EventNames.showInAppNotification, {
            type:'info',
            title,
            message
        });
    }
}