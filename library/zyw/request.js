class Request {
    constructor(req){
        this.req = req;
    }

    get(key, defaultValue){
        if (!this.req.query) {
            return defaultValue;
        }
        if (!key) {
            return this.req.query;
        }
        if (this.req.query[key]) {
            return this.req.query[key];
        }
        return defaultValue;
    }

    post(key, defaultValue){
        if (!this.req.body) {
            return defaultValue;
        }
        if (!key) {
            return this.req.body;
        }
        if (this.req.body[key]) {
            return this.req.body[key];
        }
        return defaultValue;
    }
}

module.exports = Request;