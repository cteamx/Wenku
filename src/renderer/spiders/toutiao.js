import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://toutiao.io'

/**
 * 当天帖子
 * 2019-06-13
 */
function get(callback) {
    req.get(API + "/prev/2019-06-13", function (d) {
        var $ = cheerio.load(d);
        
        var list = [];

        $(".post .title").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": '开发者头条'
            }
            list.push(dict)
        })

        callback(list);
    })
}

export default {
    get: get
}