/**
 * Created by dl on 2016-10-19.
 */
var twoservicename = require('../services/servicetwo') ;
module.exports = {
    demo1:function*(){
        var data = yield twoservicename.method1();
        console.log(data);
        this.body = yield {"demo":"demo.demo1"};
    },
    demo2:function*(){
        var data = twoservicename.method2();
        console.log(data);
        this.body = yield {"demo":"demo.demo2"};
    },
    demo3:function*(){
        var data = twoservicename.method3();
        console.log(data);
        this.body = yield {"demo":"demo.demo3"};
    }
    ,demo4:function*(){
        var data = yield twoservicename.queryUser();
        this.body = data ;
    },
    demo5:function*(){
        var db = M.pool.getConnection();
        var id = Number(7);
        try{
            var data = yield twoservicename.queryUserByid(db,id);
        }finally{
            M.pool.releaseConnection(db);
        }
        this.body = data ;
    }
}