import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://segmentfault.com'

/**
 * 最新内容
 * 2019-06-13
 */
function getNew(callback) {
    req.get(API + "/newest", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".news-list .news-item .news__item-info").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').find(".mt5").find('.news__item-title').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": 'segmentfault'
            }
            list.push(dict)
        })
        callback(list);
    })
}

/**
 * 当日最热
 * 2019-06-13
 */
function getDayTop(callback) {
    req.get(API + "/hottest", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".news-list .news-item .news__item-info").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').find(".mt5").find('.news__item-title').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": 'segmentfault'
            }
            list.push(dict)
        })
        callback(list);
    })
}

/**
 * 本周最热
 * 2019-06-13
 */
function getWeklyTop(callback) {
    req.get(API + "/hottest/weekly", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".news-list .news-item .news__item-info").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').find(".mt5").find('.news__item-title').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": 'segmentfault'
            }
            list.push(dict)
        })
        callback(list);
    })
}

/**
 * 本月最热
 * 2019-06-13
 */
function getMonthlyTop(callback) {
    req.get(API + "/hottest/monthly", function (d) {
        var $ = cheerio.load(d);

        var list = [];

        $(".news-list .news-item .news__item-info").each(function (i, v) {
            var dict = {
                "title": $(v).find('a').find(".mt5").find('.news__item-title').text(),
                "url": API + $(v).find('a').attr('href'),
                "source": 'segmentfault'
            }
            list.push(dict)
        })
        callback(list);
    })
}


export default {
    getNew: getNew,
    getDayTop: getDayTop,
    getWeklyTop: getWeklyTop,
    getMonthlyTop: getMonthlyTop
}