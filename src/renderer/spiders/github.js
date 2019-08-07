import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://github.com'

/**
 * 今日最热
 * 2019-06-17
 */
function getNew(callback) {
    req.get(API + '/trending', function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".Box .Box-row .lh-condensed").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').attr('href').substr(1),
                "url": API + $(v).find('a').attr('href'),
                "source": 'github'
            }
            list.push(dict)
        })

        callback(list);
    })
}

export default {
    getNew: getNew
}