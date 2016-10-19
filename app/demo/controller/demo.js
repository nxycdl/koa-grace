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
    },
    demo6:function*(){
        //代理
        yield this.proxy({
            otherInfo:'htgl:/htgl/app/getweixintoparticle.do?limit=10',
            otherInfo2:'htgl:/htgl/app/getweixintoparticle.do?limit=2',
        });
        this.body = this.backData.otherInfo2 ;
    },
    demo7:function*(){
        //Post请求;用Form方式提交;
        console.log(this.query);
        var params ={
            username: '2012',
            userpassword: '000000'.toString().toUpperCase()
        }
        this.request.body = this.request.body || {};
        this.request.body.username = params.username;
        this.request.body.userpassword = params.userpassword;
        console.log(this.request.body);
        yield this.proxy({
            otherInfo:'htgl:post:htgl/app/logininclassapp.do',
        });
        this.body = this.backData.otherInfo ;
    },
    demo8:function*(){
        //Post请求;用Form方式提交;
        console.log(this.query);
        var params ={
            username: '2012',
            userpassword: '000000'.toString().toUpperCase()
        }
        yield this.proxy({
            otherInfo:'htgl:post:htgl/app/logininclassapp.do'
        },{
            form: params
        })
        this.body = this.backData.otherInfo ;
    }

}