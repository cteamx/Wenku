import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://gitbook.cn'

/**
 * 最新主题
 * 2019-06-17
 */
function getNew(callback) {
    req.get(API + "/gitchat/news", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $("#itemContainer .col-md-12").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').find('.chat_info_title').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": 'gitbook'
            }
            list.push(dict)
        })

        callback(list);
    })
}

export default {
    getNew: getNew
}