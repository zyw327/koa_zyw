var Table = require("../table.js");

class Blog extends Table{
	constructor(){
		super();
		this.table = 'b_blog_content';
	}

	async getList(where, page, pagesize, order){
		page = page || 1;
		pagesize = pagesize || 10;
		return await this.query(page, pagesize, where, order);
	}
}

module.exports = Blog;