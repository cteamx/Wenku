import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.imooc.com'

/**
 * 最新推荐帖子
 * 2019-06-18
 */
function getNew(callback) {
    var list = [];

    req.get(API + "/article", function (d) {
        var $ = cheerio.load(d);

        $(".centerlist .js-usercard-box .article-lwrap .list-content").each(function (i, v) {
            var dict = {
                "title": $(v).find('.title').text().replace(/\n/g, "").replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " "),
                "url": $(v).find('.title').attr('href'),
                "source": 'shouji'
            }
            list.push(dict)
        })

        callback(list);
    })
}


export default {
    getNew: getNew
}