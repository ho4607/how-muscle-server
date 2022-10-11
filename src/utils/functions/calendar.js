export class Calendar {
    today = new Date();
    // 현재 년, 월, 일 문자열
    cur_year = this.today.getFullYear().toString();
    cur_month = ("0" + this.today.getMonth() + 1).slice(-2);
    cur_day = ("0" + this.today.getDate()).slice(-2);
    cur_date = this.formatDate(this.today, "string", "yyyy-mm-dd");

    //현재 년, 월, 일 정수형
    yearInt = this.today.getFullYear();
    monthInt = this.today.getMonth() + 1;
    dayInt = this.today.getDate();

    current = this.formatDate(this.today, "default"); // yy-mm-dd format

    // 현재 월 첫째 일 (integer)
    currentMonthFirstDate = this.formatDate(
        new Date(this.yearInt, this.monthInt - 1, 1),
        "integer"
    );

    // 현재 월 마지막 일 (integer)
    currentMonthLastDate = this.formatDate(
        new Date(this.yearInt, this.monthInt, 0),
        "integer"
    );

    dayOfWeek = this.today.getDay(); // 일0,월1,화2,...,토6

    //지난주 시작 일 (integer)
    lastWeekStartDate = this.formatDate(
        new Date(this.yearInt, this.monthInt - 1, this.dayInt - this.dayOfWeek - 7),
        "integer"
    );

    //지난주 마지막 일 (integer)
    lastWeekEndDate = this.formatDate(
        new Date(this.yearInt, this.monthInt - 1, this.dayInt - this.dayOfWeek - 1),
        "integer"
    );

    /**
     * Represent getFirstLastDateOfMonth function
     * @param {number} year
     * @param {number} month
     * @returns {{firstDate: number, lastDate: number}}
     * @description 입력된 년, 월의 첫째일, 마지막일 반환
     */
    getFirstLastDateOfMonth = (year, month) => {
        let firstDate = this.formatDate(
            new Date(year, month - 1, 1),
            "integer",
            "yymmdd"
        );
        let lastDate = this.formatDate(
            new Date(year, month, 0),
            "integer",
            "yymmdd"
        );

        return { firstDate, lastDate };
    };

    /**
     * Represent formatDate function
     * @param {Date | string | number} date
     * @param {'integer'|'int'|'string'|'default'} [type] - output type
     * @param {'yyyy-mm-dd'|'yy-mm-dd'|'yyyymmdd'|'yymmdd'|'mm/dd'|'mmdd'} [format='yy-mm-dd'] - output format
     * @returns {string|number}
     */
    formatDate(date, type, format) {
        let year, month, weekday;
        if (type === "integer" || type === "int") {
            switch (format) {
                case "yyyymmdd":
                    return parseInt(formatDate(date, "string", "yyyymmdd"));
                default:
                    return parseInt(formatDate(date, "string", "yymmdd"));
            }
        } else {
            if (date instanceof Date) {
                year = date.getFullYear().toString();
                month = ("0" + (date.getMonth() + 1)).slice(-2);
                weekday = ("0" + date.getDate()).slice(-2);
            } else if (typeof date === "string") {
                if (date.length === 6 && date.indexOf("-") === -1) {
                    year = "20" + date.slice(0, 2);
                    month = date.slice(2, 4);
                    weekday = date.slice(-2);
                } else if (date.length === 8 && date.indexOf("-") === -1) {
                    year = date.slice(0, 4);
                    month = date.slice(4, 6);
                    weekday = date.slice(-2);
                }
            } else if (typeof date === "number") {
                return formatDate(date.toString(), "string", format);
            }
            switch (format) {
                case "yyyy-mm-dd":
                    return year + "-" + month + "-" + weekday;
                case "yyyymmdd":
                    return year + month + weekday;
                case "yymmdd":
                    year = year.slice(-2);
                    return year + month + weekday;
                case "mm/dd":
                    return `${month}/${weekday}}`;
                case "mmdd":
                    return month + weekday;
                default:
                    year = year.slice(-2);
                    return year + "-" + month + "-" + weekday;
            }
        }
    }
}

/**
 * Represent formatDate function
 * @param {Date | string | number} date
 * @param {'integer'|'int'|'string'|'default'} [type='string'] - output type
 * @param {'yyyy-mm-dd'|'yy-mm-dd'|'yyyymmdd'|'yymmdd'|'mm/dd'|'mmdd'} [format='yy-mm-dd'] - output format
 * @returns {string|number}
 */
export function formatDate(date, type, format) {
    let year, month, weekday;

    if (date instanceof Date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        weekday = date.getDate();

        month = month < 10 ? "0" + month : month;
        weekday = weekday < 10 ? "0" + weekday : weekday;
    } else if (typeof date === "string" || typeof date === "number") {
        date =
            date.toString().indexOf("-") !== -1 ? date.replaceAll("-", "") : date;
        if (
            (date.length === 6 && date.indexOf("-") === -1) ||
            typeof date === "number"
        ) {
            date = typeof date === "number" ? date.toString() : date;
            year = "20" + date.slice(0, 2);
            month = date.slice(2, 4);
            weekday = date.slice(-2);
        } else if (date.length === 8 && date.indexOf("-") === -1) {
            year = date.slice(0, 4);
            month = date.slice(4, 6);
            weekday = date.slice(-2);
        }
    }
    //

    if (type === "integer" || type === "int" || type === "number") {
        switch (format) {
            case "yyyymmdd":
                return parseInt(`20${year + month + weekday}`);
            default:
                return parseInt(year + month + weekday);
        }
    } else {
        switch (format) {
            case "yyyy-mm-dd":
                return year + "-" + month + "-" + weekday;
            case "yyyymmdd":
                return year + month + weekday;
            case "yymmdd":
                year = year.toString().slice(-2);
                return year + month + weekday;
            case "mm/dd":
                return `${month}/${weekday}}`;
            case "mmdd":
                return month + weekday;
            default:
                year = year.slice(-2);
                return year + "-" + month + "-" + weekday;
        }
    }
}

/**
 * Represent getWeekStartEndDate function
 * 입력한 년,월,주차 정보를 받아 주차의 시작일과 마지막 일 반환
 * @param year {integer}
 * @param month {integer}
 * @param week {integer}
 * @returns {{weekStartDate: (string|number), weekEndDate: (string|number)}}
 */
export const getWeekStartEndDate = (year, month, week) => {
    let weekStartDate;
    let weekEndDate;
    switch (week) {
        case 1:
            weekStartDate = formatDate(
                new Date(year, month - 1, 1),
                "integer",
                "yymmdd"
            );
            weekEndDate = formatDate(
                new Date(year, month - 1, 7),
                "integer",
                "yymmdd"
            );
            break;
        case 2:
            weekStartDate = formatDate(
                new Date(year, month - 1, 8),
                "integer",
                "yymmdd"
            );
            weekEndDate = formatDate(
                new Date(year, month - 1, 14),
                "integer",
                "yymmdd"
            );
            break;
        case 3:
            weekStartDate = formatDate(
                new Date(year, month - 1, 15),
                "integer",
                "yymmdd"
            );
            weekEndDate = formatDate(
                new Date(year, month - 1, 21),
                "integer",
                "yymmdd"
            );
            break;
        case 4:
            weekStartDate = formatDate(
                new Date(year, month - 1, 22),
                "integer",
                "yymmdd"
            );
            weekEndDate = formatDate(new Date(year, month, 0), "integer", "yymmdd");
            break;
        default:
            const errMsg = 'Invalid week value in "getWeekStartDate" function.';
            throw errMsg;
    }
    return { weekStartDate, weekEndDate };
};

// 시간 형식
export function timeFormat(time, excludeMilliSecond) {
    if (typeof time === "string") {
        if (time === "") {
            throw new Error("time variable is empty. Check arguments. ");
        }
        const splitedTime = time.split(":");
        const h = splitedTime[0];
        const m = splitedTime[1];
        const s = excludeMilliSecond ? splitedTime[2] : parseInt(splitedTime[2]);

        return `${h}-${m}-${s}`;
    }
}

// 날짜 분해
export function decomposeDate(date) {
    let year, month, day;

    if (date instanceof Date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        return { year, month, day };
    } else if (typeof date === "string") {
        if (date.length === 6 && date.indexOf("-") === -1) {
            year = parseInt(date.slice(0, 2));
            month = parseInt(date.slice(2, 4));
            day = parseInt(date.slice(-2));

            return { year, month, day };
        } else if (date.length === 8 && date.indexOf("-") === -1) {
            year = parseInt(date.slice(0, 4));
            month = parseInt(date.slice(4, 6));
            day = parseInt(date.slice(-2));

            return { year, month, day };
        } else if (date.length === 8 && date.indexOf("-") !== -1) {
            year = parseInt(date.slice(0, 2));
            month = parseInt(date.slice(3, 5));
            day = parseInt(date.slice(-2));

            return { year, month, day };
        } else if (date.length === 10 && date.indexOf("-") !== -1) {
            year = parseInt(date.slice(0, 4));
            month = parseInt(date.slice(5, 7));
            day = parseInt(date.slice(-2));

            return { year, month, day };
        } else {
            throw new Error("decomposeDate 함수에서 정의되지 않은 날짜 형식 입니다.");
        }
    } else if (typeof date === "number") {
        return formatDate(date.toString(), "default");
    }
}

// 시간 분해
export function decomposeTime(time, excludeMilliSecond) {
    if (typeof time === "string") {
        if (time === "") {
            throw new Error("time variable is empty. Check arguments. ");
        }
        const splitedTime = time.split(":");
        const h = splitedTime[0];
        const m = splitedTime[1];
        const s = excludeMilliSecond
            ? splitedTime[2]
            : parseInt(splitedTime[2]).toString();

        return { hh: h, mm: m, ss: s };
    }
}

// 날짜를 정수형으로
export function changeDate2Int(date) {
    return date ? parseInt(date?.replaceAll("-", "")) : null;
}

// 날짜 비교
export const compareDate = function (date1, date2) {
    if (!date1) return date2;
    else if (!date2) return date1;
    else if (!date1 || !date2) throw new Error("Can not compare two dates.");
    else if (!date1 || !date2) throw new Error("Can not compare two dates.");

    const data1Int = parseInt(date1);
    const data2Int = parseInt(date2);

    if (!data1Int || !data2Int) throw new Error("Can not compare two dates");
    if (date1Int > date2Int) return date1;
    else if (date1Int < date2Int) return date2;
    else if (date1Int === date2Int) return date1;

    return 0;
};

/**
 * Represent getLivedMonth function -
 * 만나이 개월 수 계산기
 * @param birth_year {integer}
 * @param birth_month {integer}
 * @param birth_day {integer}
 * @returns {number}
 */

export const getLivedMonth = (birth_year, birth_month, birth_day) => {
    const calendar = new Calendar();

    return Math.floor(
        (calendar.yearInt - birth_year) * 12 +
        (calendar.monthInt - birth_month) +
        (calendar.dayInt - birth_day) / 30.4
    );
};
