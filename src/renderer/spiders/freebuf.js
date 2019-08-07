import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.freebuf.com'

/**
 * 今日最新
 * 2019-06-17
 */
function getNew(callback) {
    req.get(API, function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $("#timeline .news-list .news-info dl dt").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').text().replace("\n",""),
                "url": $(v).find('a').attr('href'),
                "source": 'freebuf'
            }
            list.push(dict)
        })

        callback(list);
    })
}

export default {
    getNew: getNew
}