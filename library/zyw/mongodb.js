const mongoose = require("mongoose");

mongoose.connect('mongodb://huicye:hcyABC@114.55.251.155:29017/loopback');

mongoose.connection.once('open', () =>{
    console.log('connected!');
});

Schema = mongoose.Schema;

let UserSchema = new Schema({
    title: {type: String},
    thumbURL: {type: String},
    coverURL: {type: String},
    brief:{type: String},
    contentURL:{type: String},
    province:{type: String},
    city:{type: String},
    zone:{type: String},
    authorUsername:{type: String},
    dateOfCreated:{type: Date},
    type:{type: String},
    isTopPosition:{type: Boolean},
    isHotPosition:{type: Boolean},
    style:{type: String},
    isVisibility:{type: Boolean},
    state:{type: String}
});

let News = mongoose.model('News', UserSchema, 'News');
/**
 * 查询
 */
function getByConditions() {
    let wherestr = {'city': /金华/};
    News.find(wherestr, (err, res) => {
        if (err) {
            console.log('Error:' + err);
        }
        return res;
        //console.log(res);
        // console.log("Res:" + res);
        // if (res) {
        //     fs.writeFileSync('userinfo.txt', '');
        //     for (let value of res) {
        //         fs.appendFileSync('userinfo.txt', '昵称：' + value.nickname + '\t\t真名：' + value.realname + '\n');
        //     }
        //     console.log('finish');
        // }
    });
}
mongoose.disconnect();
getByConditions();


