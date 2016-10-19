exports.test = function*(){
    this.request.body = this.request.body || {};
    this.request.body.username = 'username';
    this.request.body.userpassword = 'userpassword';

    yield this.proxy({
        otherInfo:'htgl:post:htgl/app/logininclassapp.do',
    })

    this.body = this.backData.otherInfo
}