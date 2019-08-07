import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.csdn.net'

/**
 * 最新主题
 * 2019-06-17
 */
function getNew(callback) {
    req.get(API, function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $("#feedlist_id .clearfix .list_con .title h2").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').text().toString().replace(/\n/g, "").replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " "),
                "url": $(v).find('a').attr('href'),
                "source": 'csdn'
            }
            list.push(dict)
        })

        callback(list);
    })
}

export default {
    getNew: getNew
}