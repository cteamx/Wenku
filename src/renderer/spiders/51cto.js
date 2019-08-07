import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://blog.51cto.com'

/**
 * 最新主题
 * 2019-06-17
 */
function getNew(callback) {
    var list = [];

    req.get(API + "/artcommend/p1", function (d) {
        var $ = cheerio.load(d);

        $(".artical-list li").each(function (i, v) {
            var dict = {
                "title": $(v).find('.tit').text(),
                "url": $(v).find('.tit').attr('href'),
                "source": '51cto'
            }
            list.push(dict)
        })

        req.get(API + "/artcommend/p2", function (d) {
            var $ = cheerio.load(d);

            $(".artical-list li").each(function (i, v) {
                var dict = {
                    "title": $(v).find('.tit').text(),
                    "url": $(v).find('.tit').attr('href'),
                    "source": '51cto'
                }
                list.push(dict)
            })

            req.get(API + "/artcommend/p3", function (d) {
                var $ = cheerio.load(d);

                $(".artical-list li").each(function (i, v) {
                    var dict = {
                        "title": $(v).find('.tit').text(),
                        "url": $(v).find('.tit').attr('href'),
                        "source": '51cto'
                    }
                    list.push(dict)
                })

                callback(list);
            })
        })
    })
}

export default {
    getNew: getNew
}