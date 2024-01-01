import dayjs, {Dayjs} from 'dayjs';

export default class DateTimeHelper {
    static getDefaultMinDate = (): Dayjs => {
        return dayjs('1900-01-01', 'YYYY-MM-DD');
    };
}
