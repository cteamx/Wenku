import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.jb51.net'

/**
 * 最新主题
 * 2019-06-17
 */
function getNew(callback) {
    req.get(API + "/new/new_1.htm", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".main_l_l .dxy_list .list_body ul li").each(function (i, v) {
            var dict = {
                "title": iconv.decode(Buffer($(v).find('a').text().toString()), "gbk"),
                "url": $(v).find('a').attr('href'),
                "source": 'jb51'
            }
            list.push(dict)
        })

        callback(list);
    },"GBK")
}

export default {
    getNew: getNew
}