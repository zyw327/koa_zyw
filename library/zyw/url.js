class Url {
    constructor(url, isModule){
        this.isModule = isModule || false;
        this.url = url || "index"
    }

    parse(){
        if (!this.url) {
            return "/index/index";
        }
        let newUrl = this.url.match(/^[\/a-zA-Z0-9]{1,}/g);
        if (newUrl && Array.isArray(newUrl) && newUrl.length > 0) {
            return newUrl[0];
        }
        return "/index/index";
        //return /^[\/a-zA-Z0-9]{1,}/g.test(this.url);
    }
}

module.exports = Url;