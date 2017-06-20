
class View{
	constructor()
		this._path = '';
		this._basePath = '';
	}

	setBasePath(basepath){
		this._basePath = basepath;
	}

	setPath(path) {
		this._path = path;
	}

	view(){
		return views("/", {map: { html: 'koa-ejs' }});
	}
}
module.exports = View;
