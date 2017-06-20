var Controller = require("../../library/zyw/controller");
var Blog = require("../model/tables/blog.js");
class IndexController extends Controller{

	constructor(ctx, next, viewPath){
		super(ctx, next, viewPath);
	}

	async index(){
		this.request();
		//let path = 'Index/index';
		let blog = new Blog();
		let result = await blog.getList();
		if (result.length < 1) {
			result[0] = '';
		}
		//console.log(result[0]);
		let params = {title:"test", "bloglist": result[0]};
		await this.render(params);
	}

	async test(){
		//let path = 'Index/index';
		this.response().json(this.request().post());
		let params = {title:"test"};
		//await this.render(params);
	}

	async detail(){
		console.log(this.request().query);
		await this.render();
	}
}

module.exports = IndexController;