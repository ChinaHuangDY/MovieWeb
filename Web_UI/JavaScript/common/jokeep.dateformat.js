// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//为date类添加一个format方法
//yyyy 年
//MM 月
//dd 日
//hh 小时
//mm 分
//ss 秒
//qq 季度
//S  毫秒
Date.prototype.formatDate = function (format) //author: meizz
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function ConvertToLongData(str, mFormat) {

    if (str) {
        str = str.replace(/-/g, "/");
        str = str.replace("T", " ");
        var date = new Date(str);

        var time = date.Format(mFormat);

        return time;
    } else {
        return "";
    }
}

function shortDate(str) {
    if (str == null || str == "") return;

    str = str.replace(/-/g, "/");
    var date = new Date(str);

    var time = date.Format("yyyy-MM-dd");

    return time;
}

function datecheck(RQ) {
    if (RQ == null || RQ == "") return false;
    var date = RQ;
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null) {
        return false;
    }
    else {
        return true;
    }
}
//*************验证没有秒的长日期和有秒的长日期
function datecheckex(RQ) {
    if (RQ == null || RQ == "") return false;
    var date = RQ;
    var result = date.match(/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|(1[0-9])|(2[0-3]))\:(([0-5][0-9])|([0-9]))(((\s)|(\:(([0-5][0-9])|([0-9]))))?)))?$/);
    if (result == null) {
        return false;
    }
    else {
        return true;
    }
}

function addDays(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
}

//获取月最后一天
function getMonthLastDay(year, month) {
    var new_year = year;    //取当前的年份        
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）        
    if (month > 12)            //如果当前大于12月，则年份转到下一年        
    {
        new_month -= 12;        //月份减        
        new_year++;            //年份增        
    }
    var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天        
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期        
}

//获取月天数
function getMonthDay(ksrq, jsrq) {
    var arrDate, objDate1, objDate2, intDays;
    objDate1 = new Date();
    objDate2 = new Date();
    arrDate = ksrq.split("-");
    objDate1.setFullYear(arrDate[0], arrDate[1], arrDate[2]);
    arrDate = jsrq.split("-");
    objDate2.setFullYear(arrDate[0], arrDate[1], arrDate[2]);
    intDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24);
    return intDays + 1;
}

//获取选中月的第一天和最后一天
function getFirstAndLastMonthDay(year, month) {
    var firstdate = year + '-' + month + '-01';
    var day = new Date(year, month, 0);
    var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期
}

//获取选中季度的第一天和最后一天
function getFirstAndLastQuarterDay(year, quarter) {
    if (quarter == "1") {
        var firstdate = year + '-' + 01 + '-01';
        var day = new Date(year, 3, 0);
        var lastdate = year + '-' + 03 + '-' + day.getDate();//获取第一季度最后一天日期
    } else if (quarter == "2") {
        var firstdate = year + '-' + 04 + '-01';
        var day = new Date(year, 6, 0);
        var lastdate = year + '-' + 06 + '-' + day.getDate();//获取第二季度最后一天日期     
    } else if (quarter == "3") {
        var firstdate = year + '-' + 07 + '-01';
        var day = new Date(year, 9, 0);
        var lastdate = year + '-' + 09 + '-' + day.getDate();//获取第三季度最后一天日期
    } else if (quarter == "4") {
        var firstdate = year + '-' + 10 + '-01';
        var day = new Date(year, 12, 0);
        var lastdate = year + '-' + 12 + '-' + day.getDate();//获取第四季度最后一天日期
    }
    return firstdate + "|" + lastdate;
}

//获取选中上半年的第一天和最后一天
function getFirstAndLasthalfYearDay(year, quarter) {
    if (quarter == "1") {
        var firstdate = year + '-' + 01 + '-01';
        var day = new Date(year, 6, 0);
        var lastdate = year + '-' + 06 + '-' + day.getDate();//获取上半年最后一天日期
    } else if (quarter == "2") {
        var firstdate = year + '-' + 07 + '-01';
        var day = new Date(year, 12, 0);
        var lastdate = year + '-' + 12 + '-' + day.getDate();//获取下半年最后一天日期     
    }
    return firstdate + "|" + lastdate;
}

function getWeek(str) {
    if (str == null || str == "") return;
    str = str.replace(/-/g, "/");
    var theDay = new Date(str);

    var monday = new Date(theDay.getTime());
    var sunday = new Date(theDay.getTime());
    if (monday.getDay() == 0) {
        monday.setDate(monday.getDate() - 6);
        sunday.setDate(sunday.getDate());
    }
    else {
        monday.setDate(monday.getDate() + 1 - monday.getDay());
        sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
    }
    return { monday: monday, sunday: sunday };
}

function getToDayDateTime() {
    var mDate = new Date();

    return mDate.Format("yyyy-MM-dd");
}


function getCurrDate(strfromt) {
    var mDate = new Date();
    return mDate.Format(strfromt);
}


function dateComp(varKs, varJS) {
    var sDate = new Date(varKs.replace(/\-/g, "\/"));
    var eDate = new Date(varJS.replace(/\-/g, "\/"));
    if (sDate > eDate) {
        return false;
    }
    return true;
}

function isDateCheck(sDate) {

    //短日期
    var mp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var r = sDate.match(mp);
    if (r == null) {
        //验证长日期
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        r = sDate.match(reg);
        if (r == null) {
            return false;
        }
        try {
            var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
            return true;
        } catch (e) { return false; }
    }
    try {
        var d = new Date(r[1], r[3] - 1, r[4]);
        return true;
    } catch (e) { return false; }
}

// 把字符串转换为日期格式
function parseDate(str) {
    return new Date(Date.parse(str.replace(/-/g, "/")));
}
