const { load, cut, extract } = require('@node-rs/jieba')

module.exports = (req, res) => {
    let pars = req.method == "POST" ? req.body : req.query;
    let content = pars.content;
    let ctype = pars.ctype;

    if (content == null || content == "") {
        res.status(404).send('content is empty');
    } else {
        load();

        switch (ctype * 1) {
            //关键词
            case 1:
                {
                    let result = extract(content, 99);
                    res.json(result);
                }
                break;
            //分词
            default:
                {
                    let result = cut(content, false);
                    res.json(result);
                }
        }

    }
}