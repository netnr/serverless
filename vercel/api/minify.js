const uglifycss = require('uglifycss');

module.exports = (req, res) => {
    try {
        //支持的语言
        let lang = req.url.split('/')[2];
        let pars = req.method == "POST" ? req.body : req.query;
        let content = pars.content, options = pars.options;
        if (content != null) {
            try {
                if (options != null && options != "") {
                    options = JSON.parse(options);
                }
            } catch (e) { }

            switch (lang) {
                case "css":
                    {
                        res.json({
                            code: 200,
                            data: uglifycss.processString(content, options)
                        });
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