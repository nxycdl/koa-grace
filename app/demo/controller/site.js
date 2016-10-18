/**
 * Created by Administrator on 2016-10-18.
 */
exports.mysite=function*(){
    var db = M.pool.getConnection();
    console.log('xxx');
    console.log(_.string.isEmpty(undefined));
    console.log('xxx');
    try{
        var sql ="select * from user ";
        var data = yield db.query(sql);
    }finally {
        M.pool.releaseConnection(db);
    }
    yield this.body= data ;
}