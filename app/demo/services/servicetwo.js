/**
 * Created by dl on 2016-10-19.
 */
module.exports = {
    method1:function*(){
        return {"method1":"servicetwo.method1"}
    },method2:function*(){
        return {"method2":"servicetwo.method2"}
    },method3:function*(){
        return {"method13":"servicetwo.method3"}
    },queryUser:function*(){
        var db = M.pool.getConnection();
        try{
            var sql ="select * from users ";
            var data = yield db.query(sql);
        }finally {
            M.pool.releaseConnection(db);
        }
        return data ;
    },queryUserByid:function*(db,id){
        var sql ="select * from users where id = ?";
        var data = yield db.query(sql,[id]);
        console.log(JSON.stringify(data[0]));
        return data[0];
    }
}