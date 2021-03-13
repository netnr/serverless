const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };
    let bedVendor = [
        {
            url: "https://iask.sina.com.cn/question/ajax/fileupload",
            name: "新浪（爱问）",
            maxSize: 1024 * 1024 * 1,
            accept: "image/*",
            method: "POST",
            field: "wenwoImage",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.id && data.id != "null") {
                    data = { url: "https://pic.iask.cn/fimg/" + data.id + ".jpg" };
                }
                return data;
            }
        },
        {
            url: "https://om.qq.com/image/orginalupload",
            name: "腾讯（内容开放平台）",
            maxSize: 1024 * 1024 * 5,
            accept: "image/*",
            method: "POST",
            field: "Filedata",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.data && data.data.url) {
                    data = { url: data.data.url.replace("http://", "https://") };
                }
                return data;
            }
        }
    ];

    switch (req.method) {
        case "GET":
            vm.code = 200;
            vm.data = bedVendor;
            res.json(vm);
            break;
        case "POST":
            new multiparty.Form().parse(req, (err, fields, files) => {

                let file = (files.file || {})[0];
                let url = fields.url.pop();
                let vendor = bedVendor.find(x => x.url == url);

                if (file == null) {
                    vm.msg = "File not found";
                    res.json(vm);
                    return;
                }

                let fd = {};
                fd[vendor.field] = fs.createReadStream(file.path);
                request({
                    url: vendor.url,
                    method: vendor.method,
                    formData: fd
                }, function (err, resp) {
                    vm.msg = resp.statusMessage;
                    if (!err && (vm.code = resp.statusCode) == 200) {
                        vm.data = vendor.dataHandle(resp.body)
                    }
                    res.json(vm);
                });
            });
            break;
    }
}