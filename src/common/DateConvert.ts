export default class DateConvert {
    constructor() { }

    public static dateFormat(date: Date, format: string): string {
        if (!date) {
            return "";
        }
        return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstTZ])\1?|[lLZ])\b/g, function ($0) {
            switch ($0) {
                case 'd': return date.getDate();
                case 'dd': return this.zeroize(date.getDate());
                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M': return date.getMonth() + 1;
                case 'MM': return this.zeroize(date.getMonth() + 1);
                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy': return new String(date.getFullYear()).substr(2);
                case 'yyyy': return date.getFullYear();
                case 'h': return date.getHours() % 12 || 12;
                case 'hh': return this.zeroize(date.getHours() % 12 || 12);
                case 'H': return date.getHours();
                case 'HH': return this.zeroize(date.getHours());
                case 'm': return date.getMinutes();
                case 'mm': return this.zeroize(date.getMinutes());
                case 's': return date.getSeconds();
                case 'ss': return this.zeroize(date.getSeconds());
                case 'l': return date.getMilliseconds();
                case 'll': return this.zeroize(date.getMilliseconds());
                case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
                case 'ZZ': return '(' + date.toString().substr(date.toString().indexOf("GMT"), 8) + ')';
            }
        });
    };

    public static dateStrFormat(dateStr: string, format: string): string {
        //dateStr example : yyyy-MM-ddT08:00:00Z
        if (!dateStr) {
            return "";
        }
        let tempString = dateStr.replace(/-/g, '-');
        let tempStringArray = dateStr.split('.');
        let date = new Date(tempStringArray[0]);
        return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstTZ])\1?|[lLZ])\b/g, function ($0) {
            switch ($0) {
                case 'd': return date.getDate();
                case 'dd': return this.zeroize(date.getDate());
                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M': return date.getMonth() + 1;
                case 'MM': return this.zeroize(date.getMonth() + 1);
                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy': return new String(date.getFullYear()).substr(2);
                case 'yyyy': return date.getFullYear();
                case 'h': return date.getHours() % 12 || 12;
                case 'hh': return this.zeroize(date.getHours() % 12 || 12);
                case 'H': return date.getHours();
                case 'HH': return this.zeroize(date.getHours());
                case 'm': return date.getMinutes();
                case 'mm': return this.zeroize(date.getMinutes());
                case 's': return date.getSeconds();
                case 'ss': return this.zeroize(date.getSeconds());
                case 'l': return date.getMilliseconds();
                case 'll': return this.zeroize(date.getMilliseconds());
                case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
                case 'ZZ': return '(' + date.toString().substr(date.toString().indexOf("GMT"), 8) + ')';
            }
        });
    };

    private static zeroize(value: number): string {
        var length = 2;
        var value1 = new String(value);
        for (var i = 0, zeros = ''; i < (length - value1.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

}


