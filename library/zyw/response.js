class Response{
    constructor(res){
        this.res = res;
    }

    redirect(url){

    }

    json(json){
        this.res.body = JSON.stringify(json);
    }
}

module.exports = Response;