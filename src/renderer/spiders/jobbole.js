import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'http://blog.jobbole.com'

/**
 * 最新帖子
 * 2019-06-13
 */
function get(callback) {
    req.get(API + "/all-posts/", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".post-meta p").each(function (i, v) {
            var title = $(v).find('a').text();

            if (title != "阅读全文 »" && title != "") {
                var dict = {
                    "title": title,
                    "url": $(v).find('a').attr('href'),
                    "source": '伯乐在线'
                }
                list.push(dict)
            }
        })

        callback(list);
    })
}


export default {
    get: get
}