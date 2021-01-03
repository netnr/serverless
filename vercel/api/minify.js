const uglifycss = require('uglifycss');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };

    //支持的语言
    let lang = req.url.split('/')[2];
    let pars = req.method == "POST" ? req.body : req.query;
    let content = pars.content, options = pars.options;

    if (content == null) {
        vm.msg = "content is empty";
        res.json(vm);
        return;
    }

    try {
        if (options != null && options != "") {
            options = JSON.parse(options);
        }
    } catch (e) { }

    switch (lang) {
        case "css":
            {
                vm.data = uglifycss.processString(content, options);
                vm.code = 200;
                res.json(vm);
            }
            break;
    }
}