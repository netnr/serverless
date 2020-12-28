const fs = require('fs');
const aip = require("baidu-aip-sdk");
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };
    if (req.method === "POST") {
        new multiparty.Form().parse(req, (err, fields, files) => {
            // 设置APPID/AK/SK（取传参或环境变量）
            let APP_ID = (fields.APP_ID || {})[0] || process.env.cv_aip_APP_ID;
            let API_KEY = (fields.API_KEY || {})[0] || process.env.cv_aip_API_KEY;
            let SECRET_KEY = (fields.SECRET_KEY || {})[0] || process.env.cv_aip_SECRET_KEY;
            console.log(APP_ID, API_KEY, SECRET_KEY)
            //动作
            let aipaction = req.url.split('/')[2];
            switch (aipaction) {
                case "ocr":
                    {
                        let ocrclient = new aip.ocr(APP_ID, API_KEY, SECRET_KEY);

                        let file = (files.file || {})[0];
                        let url = (fields.url || {})[0];

                        if (file) {

                            let image = fs.readFileSync(file.path).toString("base64");
                            ocrclient.generalBasic(image).then(function (result) {
                                vm.code = 200;
                                vm.msg = "success";
                                vm.data = result;
                                res.json(vm);
                            }).catch(function (err) {
                                vm.code = -1;
                                vm.msg = err + "";
                                res.json(vm);
                            });

                        } else if (url) {

                            ocrclient.generalBasicUrl(url).then(function (result) {
                                vm.code = 200;
                                vm.msg = "success";
                                vm.data = result;
                                res.json(vm);
                            }).catch(function (err) {
                                vm.code = -1;
                                vm.msg = err + "";
                                res.json(vm);
                            });
                        }
                    }
                    break
            }
        });
    } else {
        vm.msg = "Method not allowed. Send a POST request.";
        res.json(vm);
    }
}