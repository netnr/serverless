const request = require("request");

module.exports = (req, res) => {

    let rurl = decodeURIComponent(req.url.substr(req.url.indexOf("/http") == 0 ? 1 : 6) || "");

    if (/(.*)\.(.*)/.test(rurl)) {

        //补上链接头
        if (rurl.toLowerCase().trim().indexOf("http") != 0) {
            rurl = "http://" + rurl;
        }

        let ops = {
            method: req.method,
            encoding: null,
            headers: {}
        }

        //忽略的请求方式
        if (ops.method == "OPTIONS") {
            res.json({ code: 200 });
        } else {
            // 保留的头部键
            let keephd = ['user-agent', 'accept', 'accept-encoding', 'cache-control', 'content-type', 'cookies', 'referer', 'token', 'authorization'],
                headeryes = (req.headers["headeryes"] || "").split(','),
                //不保留的头部键
                headerno = (req.headers["headerno"] || "").split(',');

            keephd = keephd.concat(headeryes);

            for (var i in req.headers) {
                if (headerno.indexOf(i.toLowerCase()) == -1 && keephd.indexOf(i.toLowerCase()) >= 0) {
                    ops.headers[i] = req.headers[i];
                }
            }

            // 是否带 body
            if (["POST", "PUT", "PATCH", "DELETE"].indexOf(ops.method) >= 0) {
                let bk = [];
                for (var i in req.body) {
                    bk.push(i + '=' + encodeURIComponent(req.body[i]));
                }
                ops.body = bk.join('&');
            }

            request(rurl, ops, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let rh = response.headers, ce = rh['content-encoding'], ct = rh["content-type"] || "text/html; charset=utf-8";
                    if (ce) {
                        res.setHeader('content-encoding', ce);
                    }
                    res.setHeader('content-type', ct);
                    res.send(body);
                } else {
                    res.json({
                        code: -1,
                        url: rurl,
                        msg: error + ""
                    });
                }
            })
        }
    } else {
        res.json({
            code: 0,
            usage: 'Host/cors/{URL}',
            source: 'https://github.com/netnr/serverless'
        });
    }
}