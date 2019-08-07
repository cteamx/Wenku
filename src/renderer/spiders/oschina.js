import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.oschina.net'

/**
 * 职业生涯
 * 2019-06-18
 */
function getJobQuestionNew(callback) {
    var list = [];

    req.get(API + "/question?catalog=100&show=updated", function (d) {
        var $ = cheerio.load(d);

        $(".question-item .content").each(function (i, v) {
            var dict = {
                "title": $(v).find('.header').text().replace(/\n/g, "").replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " "),
                "url": $(v).find('.header').attr('href'),
                "source": 'oschina'
            }
            list.push(dict)
        })

        callback(list);
    })
}

/**
 * 最新推荐帖子
 * 2019-06-18
 */
function getNew(callback) {
    var list = [];

    req.get(API + "/blog", function (d) {
        var $ = cheerio.load(d);

        $("#recommendArticleList .blog-item .content").each(function (i, v) {
            var dict = {
                "title": $(v).find('.header').text().replace(/\n/g, "").replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " "),
                "url": $(v).find('.header').attr('href'),
                "source": 'oschina'
            }
            list.push(dict)
        })

        callback(list);
    })
}


/**
 * 开源访谈
 * 2019-06-18
 */
function getOpenList(callback) {
    var list = [];

    req.get(API + "/question/topic/osc-interview", function (d) {
        var $ = cheerio.load(d);

        $(".question-item .content").each(function (i, v) {
            var dict = {
                "title": $(v).find('.header').text().replace(/\n/g, "").replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " "),
                "url": $(v).find('.header').attr('href'),
                "source": 'oschina'
            }
            list.push(dict)
        })

        callback(list);
    })
}


export default {
    getNew: getNew,
    getJobQuestionNew:getJobQuestionNew,
    getOpenList:getOpenList
}