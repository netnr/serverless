const jb = require("nodejieba");

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };

    let pars = req.method == "POST" ? req.body : req.query;
    let lang = pars.lang, ctype = pars.ctype, content = pars.content;

    //支持的语言
    let langs = ["zh-cn"];
    //默认中文
    if (!langs.includes(lang)) {
        lang = langs[0];
    }

    if (content == null || content == "") {
        vm.msg = "content is empty";
        res.json(vm);
        return;
    }

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

                            vm.data = jb.extract(content, topn);
                            vm.code = 200;
                            res.send(vm);
                        }
                        break;
                    //分词
                    default:
                        vm.data = jb.cut(content);
                        vm.code = 200;
                        res.send(vm);
                }
            }
            break;
    }
}