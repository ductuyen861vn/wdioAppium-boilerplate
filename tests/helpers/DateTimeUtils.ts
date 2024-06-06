import {format} from 'date-fns';

export class DateTimeUtils {
    static get DATE_PATTERN_1 () { return "YYYY-MM-DD" }
    static get DATE_PATTERN_2 () { return "yyyyMMddhhmmssSSS" }

    static async getRandomDate(start: Date, end: Date): Promise<Date> {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    static async getRandomFormattedDateTime(pattern: string): Promise<string> {
        const start = new Date(2000, 0, 1); // Start date (year 2000)
        const end = new Date(); // Current date
        const randomDate = this.getRandomDate(start, end);
        return format(await randomDate, pattern);
    }
}