import req from '../utils/req'
import cheerio from 'cheerio'

let API = 'https://www.infoq.cn'

/**
 * 今日最热
 * 2019-06-17
 */
function getNew(callback) {
    req.post(API + '/public/v1/article/getHotList', {
        'score': null,
        'size': 50,
        'type': 1
    }, function (d) {
        var json = JSON.parse(d);

        var list = [];

        for (var i = 0; i < json.data.length; i++) {
            var dict = {
                "title": json.data[i].article_sharetitle,
                "url": API + "/article/"+json.data[i].uuid,
                "source": 'infoq'
            }

            list.push(dict)
        }

        callback(list)
    }, {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            "content-type": "application/json",
            "Accept": "application/json, text/plain, */*",
            'Cookie': '_ga=GA1.2.1245600628.1560760206; _gid=GA1.2.1879908998.1560760206; Hm_lvt_094d2af1d9a57fd9249b3fa259428445=1560760206; Hm_lpvt_094d2af1d9a57fd9249b3fa259428445=1560760684; SERVERID=3431a294a18c59fc8f5805662e2bd51e|1560760684|1560760206; _gat=1',
            'Referer': 'https://www.infoq.cn/hotlist?tag=day'
        }
    )
}

export default {
    getNew: getNew
}