import {format, parseISO} from 'date-fns';

class DateTimeUti {
    public static DATE_PATTERN_1 = "YYYY-MM-DD";
    public static DATE_PATTERN_2 = "yyyyMMddhhmmssSSS";

    public static getRandomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    public static getRandomFormattedDateTime(pattern: string): string {
        const start = new Date(2000, 0, 1); // Start date (year 2000)
        const end = new Date(); // Current date
        const randomDate = this.getRandomDate(start, end);
        return format(randomDate, pattern);
    }
}

export {DateTimeUti}