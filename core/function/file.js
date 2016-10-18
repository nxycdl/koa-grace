/**
 * Created by yanhu on 14-11-10.
 */
module.exports = {

    mkdirSync: function (url, mode, cb) {

        console.log(url);

        var arr = url.split("/");
        mode = mode || 0755;
        cb = cb || function () {
        };
        if (arr[0] === ".") {//处理 ./aaa
            arr.shift();
        }
        if (arr[0] == "..") {//处理 ../ddd/d
            arr.splice(0, 2, arr[0] + "/" + arr[1])
        }
        function inner(cur) {
            if (!M.fs.existsSync(cur)) {//不存在就创建一个
                M.fs.mkdirSync(cur, mode)
            }
            if (arr.length) {
                inner(cur + "/" + arr.shift());
            } else {
                cb();
            }
        }

        arr.length && inner(arr.shift());
    }
}