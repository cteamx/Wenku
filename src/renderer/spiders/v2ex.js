import req from '../utils/req'

let API = 'https://www.v2ex.com'

/**
 * 最热主题
 * 2019-06-13
 */
function getTop(callback) {
    req.get(API + "/api/topics/hot.json", function (d) {
        var json = JSON.parse(d);

        var list = [];

        for (var i = 0; i < json.length; i++) {
            var dict = {
                "title": json[i].title,
                "url": json[i].url,
                "source": 'v2ex'
            }

            list.push(dict)
        }

        callback(list)
    })
}

/**
 * 最新主题
 * 2019-06-13
 */
function getNew(callback) {
    req.get(API + "/api/topics/latest.json", function (d) {
        var json = JSON.parse(d);

        var list = [];

        for (var i = 0; i < json.length; i++) {
            var dict = {
                "title": json[i].title,
                "url": json[i].url,
                "source": 'v2ex'
            }

            list.push(dict)
        }

        callback(list)
    })
}

export default {
    getTop: getTop,
    getNew: getNew
}