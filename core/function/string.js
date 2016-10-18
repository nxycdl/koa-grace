/**
 * Created by ken.xu on 14-1-27.
 */
var generateCount = 0;

module.exports = {

    // 获取无序字符串
    getUniqueStr: function () {

        var timesstamp = F.date.format(new Date(), 'yyyymmddhhiissS');

        if (generateCount > 999)
            generateCount = 0;

        var uniqueStr = timesstamp + F.math.formater(generateCount, "#000");

        generateCount++;

        return uniqueStr;
    },
    // 获取指定长度的随机数
    random: function (len) {

        var num = '';

        for (var i = 0; i < len; i++) {
            num = num + Math.floor(Math.random() * 10);
        }

        return num;
    },
    isNotEmpty: function (str) {

        if (typeof str == "undefined" || str == null || str == "")
            return false;

        return true;
    },
    isEmpty: function (str) {

        if (typeof str == "undefined" || str == null || str == "")
            return true;

        return false;
    }
};