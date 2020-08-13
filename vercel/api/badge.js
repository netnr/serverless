const request = require("request");

module.exports = (req, res) => {

    let bg = {
        cwh: function (key, value) {
            let margin = 6, kw, vw = (value.length * 8.8).toFixed(0) * 1;
            switch (key) {
                case "npm": kw = 36; break;
                case "nuget": kw = 47; break;
                case "github": kw = 51; break;
            }
            let obj = {
                th: 30,
                kw: kw + margin * 2,
                vw: vw + margin * 2,
                ktx: margin
            };
            obj.tw = obj.kw + obj.vw;
            obj.vtx = obj.kw + margin;
            return obj;
        },
        dv: "not found",
        load: function (rurl, ops, callback) {
            request(rurl, ops, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    callback(body)
                } else {
                    callback(bg.dv);
                }
            })
        },
        view: function (key, value, vcolor) {
            let htm = [], olen = bg.cwh(key, value);
            htm.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + olen.tw + '" height="' + olen.th + '">');
            htm.push('<g shape-rendering="crispEdges">');
            htm.push('<rect width="' + olen.kw + '" height="' + olen.th + '" fill="#555" />');
            htm.push('<rect x="' + olen.kw + '" width="' + olen.vw + '" height="' + olen.th + '" fill="' + vcolor + '" />');
            htm.push('</g>');
            htm.push('<g fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="16">');
            htm.push('<text x="' + olen.ktx + '" y="21">' + key + '</text>');
            htm.push('<text x="' + olen.vtx + '" y="21">' + value + '</text>');
            htm.push('</g>');
            htm.push('</svg>');

            return htm.join('');
        },
        svg: function (upath, callback) {
            let ups = upath.split('/'), key, value = bg.dv, vcolor = "#e05d44";

            //nuget version
            if (/nuget\/v\/.*.svg/i.test(upath)) {
                key = "nuget";
                let pname = ups[2].toLowerCase();
                pname = pname.substr(0, pname.length - 4);
                bg.load('https://api-v2v3search-0.nuget.org/autocomplete?id=' + pname, { json: true }, function (data) {
                    if (data.data.length) {
                        vcolor = "#007ec6";
                        value = "v" + data.data.pop();
                    }
                    let htm = bg.view(key, value, vcolor);
                    callback(htm);
                })
            }

            //npm version
            if (/npm\/v\/.*.svg/i.test(upath)) {
                key = "npm";
                let pname = ups[2].toLowerCase();
                pname = pname.substr(0, pname.length - 4);
                bg.load('https://data.jsdelivr.com/v1/package/npm/' + pname, { json: true }, function (data) {
                    if (data != bg.dv) {
                        vcolor = "#007ec6";
                        value = "v" + data.tags.latest;
                    }
                    let htm = bg.view(key, value, vcolor);
                    callback(htm);
                })
            }

            //github fork/star/license
            if (/github\/(forks|stars|license)\/.*\/.*.svg/i.test(upath)) {
                key = ups[1];

            }

            if (!key) {
                res.send('');
            }
        }
    }

    bg.svg(req.url.substr(7), function (htm) {
        res.setHeader('content-type', 'image/svg+xml;charset=utf-8');
        res.setHeader('cache-control', 'public,max-age=300');
        res.send(htm);
    });
}