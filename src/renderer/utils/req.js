var request = require('request');
var iconv = require('iconv-lite');

let header_get = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}

let header_post = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    "content-type": "application/json"
}

function get(url, callback, headers = header_get, encoding = "utf-8") {
    request({
        url: url,
        method: "GET",
        encoding: null,
        headers: headers
    }, function (err, res, body) {
        body = iconv.decode(body, encoding);
        callback(body)
    })
}

function post(url, data, callback, headers = header_post, encoding = "utf-8") {
    request({
        url: url,
        method: "POST",
        encoding: null,
        headers: headers,
        body: JSON.stringify(data)
    }, function (err, res, body) {
        body = iconv.decode(body, encoding);
        callback(body)
    });
}

export default {
    get: get,
    post: post
}