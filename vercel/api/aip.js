const fs = require('fs');
const aip = require("baidu-aip-sdk");
const multiparty = require('multiparty');

module.exports = (req, res) => {

    let error_code = 0, error_msg;
    try {
        if (req.method === "POST") {
            new multiparty.Form().parse(req, (err, fields, files) => {
                if (err) {
                    error_code = 1;
                    error_msg = err + "";
                    res.json({ error_code, error_msg });
                } else {
                    let p_APP_ID = fields.APP_ID ? fields.APP_ID[0] : null;
                    let p_API_KEY = fields.API_KEY ? fields.API_KEY[0] : null;
                    let p_SECRET_KEY = fields.SECRET_KEY ? fields.SECRET_KEY[0] : null;

                    // 设置APPID/AK/SK（取传参或环境变量）
                    let APP_ID = p_APP_ID || process.env.cv_aip_APP_ID;
                    let API_KEY = p_API_KEY || process.env.cv_aip_API_KEY;
                    let SECRET_KEY = p_SECRET_KEY || process.env.cv_aip_SECRET_KEY;

                    //动作
                    let aipaction = req.url.split('/')[2];
                    switch (aipaction) {
                        case "ocr":
                            {
                                let ocrclient = new aip.ocr(APP_ID, API_KEY, SECRET_KEY);

                                let file = files.file ? files.file[0] : null;
                                let url = fields.url ? fields.url[0] : null;
                                if (file) {

                                    let image = fs.readFileSync(file.path).toString("base64");
                                    ocrclient.generalBasic(image).then(function (result) {
                                        res.json(result);
                                    }).catch(function (err) {
                                        error_code = -1;
                                        error_msg = err + "";

                                        res.json({ error_code, error_msg });
                                    });

                                } else if (url) {

                                    ocrclient.generalBasicUrl(url).then(function (result) {
                                        res.json(result);
                                    }).catch(function (err) {
                                        error_code = -1;
                                        error_msg = err + "";

                                        res.json({ error_code, error_msg });
                                    });
                                }
                            }
                            break
                    }
                }
            });
        } else {
            error_code = 1;
            error_msg = "Method not allowed. Send a POST request.";
            res.json({ error_code, error_msg });
        }
    } catch (e) {
        error_code = -1;
        error_msg = e + "";
        res.json({ error_code, error_msg });
    }
}