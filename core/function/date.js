/**
 * Created by ken.xu on 14-1-27.
 */
module.exports = {

    time: function (datetime) {

        var date = (datetime) ? new Date(datetime) : new Date();
        var time = Math.round(date.getTime() / 1000);
        return time;
    },
    format: function (date, format) {

        var o = {
            "m+": date.getMonth() + 1, // month
            "d+": date.getDate(), // day
            "h+": date.getHours(), // hour
            "i+": date.getMinutes(), // minute
            "s+": date.getSeconds(), // second
            "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
            "S": date.getMilliseconds()
            // millisecond
        }
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    },
    parse: function (dateStr, formatter) {

        if (typeof (formatter) == "undefined" || formatter == null || formatter == "") {
            formatter = "yyyy-MM-dd";
        }
        var dt = new Date();

        var year = this._extract(/(yy){1,2}/, formatter, dateStr);
        var month = this._extract(/MM/, formatter, dateStr) - 1;
        var day = this._extract(/dd/, formatter, dateStr);
        dt.setFullYear(year);
        dt.setMonth(month);
        dt.setDate(day);

        if (formatter.indexOf("HH") > 0) {
            dt.setHours( this._extract(/HH/, formatter, dateStr));
        }

        if (formatter.indexOf("mm") > 0) {
            dt.setMinutes( this._extract(/mm/, formatter, dateStr));
        }

        if (formatter.indexOf("ss") > 0) {
            dt.setSeconds( this._extract(/ss/, formatter, dateStr));
        }

        return dt;
    },
    _extract: function (reg, formatter, dateStr) {
        var pos = formatter.search(reg); // 进行字符串匹配
        var end = 0;
        if (pos == -1) { // 如果没有找到匹配
            throw TypeError;
        } else {
            var arr = formatter.match(reg);
            end = pos + arr[0].length;
        }
        var num = dateStr.substring(pos, end);

        return num * 1;
    },
    dgm: function (date, format) {
        format = format || 'yyyy-mm-dd';
        var timestr = parseInt(date);
        date = new Date(parseInt(date) * 1000);

        var o = {
            "m+": date.getMonth() + 1, // month
            "d+": date.getDate(), // day
            "h+": date.getHours(), // hour
            "i+": date.getMinutes(), // minute
            "s+": date.getSeconds(), // second
            "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
            "S": date.getMilliseconds()
            // millisecond
        }
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

        var now = new Date();
        now = now.getTime() / 1000;
        var time = now - timestr;
        var day = new Date(parseInt(now) * 1000).getDate() - new Date(parseInt(timestr) * 1000).getDate();
        var strtime = 0;
        if (timestr == 0) {
            format = '--';
        } else if (day == 0) {
            if (time > 3600) {
                strtime = parseInt(time / 3600);
                format = strtime + ' 小时前';
            } else if (time > 1800) {
                format = '半小时前';
            } else if (time > 60) {
                strtime = parseInt(time / 60);
                format = strtime + ' 分钟前';
            } else if (time > 0) {
                format = strtime + ' 秒前';
            } else if (time == 0) {
                format = '刚刚';
            }
        } else if (day > 0 && day < 7) {
            if (day == 1) {
                format = '昨天 ' + o['h+'] + ':' + o['i+'] + ':' + o['s+'] + '';
            } else if (day == 2) {
                format = '前天 ' + o['h+'] + ':' + o['i+'] + ':' + o['s+'] + '';
            } else {
                format = o['d+'] + ' 天前';
            }
        }

        return format;
    },
    dayToWeek: function (datetime) {
        var weekDay = ['日', '一', '二', '三', '四', '五', '六'];
        return "星期" + weekDay[datetime.getDay()];
    },
    dayToWeekFromToday: function(datetime){
        var weekDay = ['日', '一', '二', '三', '四', '五', '六'];
        var today = (new Date()).getDay();
        var inDate =datetime.getDay();
        if(inDate == 0)
            inDate = 7;
        if(today>inDate){
            return "下周" + weekDay[datetime.getDay()];
        }else{
            return "本周" + weekDay[datetime.getDay()];
        }
    },
    dayToTime: function (datetime) {
        var time = ['上午', '下午'];
        return time[datetime.getHours() < 12 ? 0 : 1];
    },
    formateYMD: function (sdate) {
        if (sdate.length > 8) {
            var year = sdate.substr(0, 4) + '-' + sdate.substr(4, 2) + '-' + sdate.substr(6, 2);
            var mi = sdate.substr(8, 2) + ':' + sdate.substr(10, 2) + ':' + sdate.substr(12, 2);
            return year + ' ' + mi;
        } else {
            var year = sdate.substr(0, 4) + '-' + sdate.substr(4, 2) + '-' + sdate.substr(6, 2);
            var mi = '00:00:00';
            return year + ' ' + mi;
        }
    },
    formateOralcDate: function (sdate) {
        //将字符串格式的日期格式YYYY-MM-DD HH24:MI:SS转化成ORALCE 格式;
        return "TO_DATE(\\'" + sdate + "\\',\\'yyyy-mm-dd hh24:mi:ss\\')";
    },
    comparedate: function (sDateSource, sDateDest) {
        //比较日期1是否大于日期2 不带时分秒；
        //必须是YYYY-MM-DD格式的;
        //返回 1 大于 0 等于 -1 小于;
        sDateSource = sDateSource.substr(0, 10);
        sDateDest = sDateDest.substr(0, 10);
        ;
        var arr1 = sDateSource.split("-");
        var arr2 = sDateDest.split("-");
        var date1 = new Date(arr1[0], parseInt(arr1[1]) - 1, arr1[2]);
        var date2 = new Date(arr2[0], parseInt(arr2[1]) - 1, arr2[2]);
        //这里一定要用 - 比较日期是否一样 ；
        if (date1 - date2 == 0) {
            return 0;
        } else if (date1 > date2) {
            return 1;
        } else {
            return -1;
        }
    },
    minusDays: function(datetime,days){
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() - days);
    },
    plusDays: function (datetime,days) {
        return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + days);
    }



}