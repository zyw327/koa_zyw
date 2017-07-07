const date = new Date();

/**
 * 日期时间出来函数
 */
class DateTime {
    /**
     * 构造函数
     */
    constructor() {
        this.now = this.getYear() + '-' + this.getMonth() + '-' + this.getDay() + ' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds();
    }

    /**
     * 返回年份
     * @return {String}
     */
    getYear() {
        return date.getFullYear();
    }

    /**
     * 返回月份
     * @return {String}
     */
    getMonth() {
        let month = (date.getMonth() + 1).toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        return month;
    }

    /**
     * 获取日期
     * @return {String}
     */
    getDay() {
        let day = date.getDate().toString();
        if (day.length < 2) {
            day = '0' + day;
        }
        return day;
    }
    /**
     * 获取小时
     * @return {String}
     */
    getHours() {
        let hours = date.getHours().toString();
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        return hours;
    }
    /**
     * 获取分数
     * @return {String}
     */
    getMinutes() {
        let minutes = date.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        return minutes;
    }

    /**
     * 获取秒数
     * @return {String}
     */
    getSeconds() {
        let seconds = date.getSeconds().toString();
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        return seconds;
    }

    /**
     * 返回当前时间
     * @return {String}
     */
    getNow() {
        return this.now;
    }
}
module.exports = DateTime;
