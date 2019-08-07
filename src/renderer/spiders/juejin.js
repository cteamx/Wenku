import req from '../utils/req'

let DOMAIN = 'https://juejin.im'
let LIST_API = 'https://web-api.juejin.im'
let EVENT_API = 'https://event-storage-api-ms.juejin.im/'
/**
 * 最新主题
 * 2019-06-13
 */
function getNew(callback) {
    req.post(LIST_API + "/query", {
        'extensions': {
            'query': {
                'id': "21207e9ddb1de777adeaca7a2fb38030"
            }
        },
        'id': "21207e9ddb1de777adeaca7a2fb38030",
        'operationName': "",
        'query': "",
        'variables': {
            'first': 50,
            'after': "",
            'order': "NEWEST"
        },
        'after': "",
        'first': 50,
        'order': "NEWEST"
    }, function (d) {
        var json = JSON.parse(d);

        json = json.data.articleFeed.items.edges;

        var list = [];

        for (var i = 0; i < json.length; i++) {
            var dict = {
                "title": json[i].node.title,
                "url": json[i].node.originalUrl,
                "source": '掘金'
            }
            list.push(dict)
        }
        callback(list)
    }, {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            "content-type": "application/json",
            'X-Agent': 'Juejin/Web'
        }
    )
}

/**
 * 会议
 * 2019-06-13
 */
function getEvents(callback) {
    req.get(EVENT_API + "/v1/getMonthEventCount?uid=&client_id=&token=&src=web&year=2019&month=6&pageNum=1&pageSize=50&showBanner=1", function (d) {
        console.log(d)
        var json = JSON.parse(d);

        var list = [];

        for (var key in json.d) {
            var listx = json.d[key].list;

            for (var i = 0; i < listx.length; i++) {
                var dict = {
                    "title": listx[i].title,
                    "url": listx[i].eventUrl,
                    "date": key,
                    "source": '掘金'
                }
                list.push(dict)
            }
        }

        callback(list)
    })
}


export default {
    getNew: getNew,
    getEvents: getEvents
}