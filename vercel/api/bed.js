const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };
    let bedVendor = [
        {
            url: "https://bit.baidu.com/upload/fileUpload",
            name: "百度（技术学院）",
            maxSize: 1024 * 1024 * 3,
            accept: "*",
            method: "POST",
            field: "file",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.status == "SUCCESS" && data.data) {
                    data = { url: "https://bit-images.bj.bcebos.com/bit-new/" + data.data };
                }
                return data;
            }
        },
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
        },
        {
            url: "https://mp.toutiao.com/upload_photo/?type=json",
            name: "字节（头条）",
            maxSize: 1024 * 1024 * 7,
            accept: "image/*",
            method: "POST",
            field: "photo",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.web_url) {
                    data = { url: data.web_url };
                }
                return data;
            }
        },
        {
            url: "https://www.wukong.com/wenda/web/upload/photo/",
            name: "字节（悟空）",
            maxSize: 1024 * 1024 * 7,
            accept: "image/*",
            method: "POST",
            field: "upfile",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.url) {
                    data = { url: data.url.replace("http://", "https://") };
                }
                return data;
            }
        },
        {
            url: "https://qiye.mi.com/index/upload",
            name: "小米",
            maxSize: 1024 * 1024 * 5,
            accept: "image/*",
            method: "POST",
            field: "uploadImg",
            dataHandle: function (data) {
                data = JSON.parse(data);
                if (data.code == 0 && data.data) {
                    data = { url: data.data.key };
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