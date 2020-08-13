const jb = require("nodejieba");

module.exports = (req, res) => {
    try {
        //支持的语言
        let langs = ["zh-cn"], lang = req.url.split('/')[2];

        //默认中文
        if (langs.indexOf(lang) == -1) {
            lang = langs[0];
        }

        let pars = req.method == "POST" ? req.body : req.query;
        let ctype = pars.ctype, content = pars.content;

        if (content != null) {
            content = decodeURIComponent(content);
            switch (lang) {
                case "zh-cn":
                    {
                        switch (ctype * 1) {
                            //关键词
                            case 1:
                                {
                                    //取多少个词
                                    let topn = parseInt(pars.topn);
                                    topn = isNaN(topn) ? 10 : topn;

                                    res.send({
                                        code: 200,
                                        data: jb.extract(content, topn)
                                    })
                                }
                                break;
                            //分词
                            default:
                                res.send({
                                    code: 200,
                                    data: jb.cut(content)
                                })
                        }
                    }
                    break;
            }
        } else {
            throw new Error("content is empty");
        }
    } catch (e) {
        res.json({
            code: -1,
            msg: e + ""
        });
    }
}