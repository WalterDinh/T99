import {DateTimeFormat} from 'app/shared/constants';
import {Dayjs} from 'dayjs';

export default class TimeUtils {
    public static formatCustomOptionDateTime = (date: Dayjs) => {
        return date.format(DateTimeFormat.FullDateTime);
    };

    public static formatCustomOptionDate = (date: Dayjs) => {
        return date.format(DateTimeFormat.FullDate);
    };

    public static formatForwardSlashDate = (date: Dayjs) => {
        return date.format(DateTimeFormat.FullDateForwardSlash);
    };
    
    public static formatCustomOptionTime = (date: Dayjs) => {
        return date.format(DateTimeFormat.Time);
    };
}
