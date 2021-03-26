const fs = require('fs');
const svgo = require('svgo');
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };

    if (req.method === "POST") {
        new multiparty.Form().parse(req, (err, fields, files) => {
            //是否合并
            let merge = (fields.merge || {})[0];

            //JSON
            let svgJson = (fields.svgJson || {})[0];
            try {
                svgJson = JSON.parse(svgJson);
            } catch (e) {
                svgJson = [];
            }

            //文件
            let svgFile = files.svgFile;
            if (svgFile) {
                svgFile.forEach(file => {
                    svgJson.push({ path: file.originalFilename, text: fs.readFileSync(file.path) });
                })
            }

            //优化
            let svgOut = [];
            svgJson.forEach(obj => {
                const result = svgo.optimize(obj.text, {
                    multipass: true,
                    path: obj.path
                })

                result.data = result.data.replace(' class="icon" ', ' ').replace("<defs><style/></defs>", "");

                //合并
                if (merge == 1) {
                    result.data = result.data.replace('<svg ', `<symbol id="${result.path
                        .replace(".svg", "")}"`)
                        .replace(' xmlns="http://www.w3.org/2000/svg" ', ' ')
                        .replace(/ width="(\d+)"/, " ")
                        .replace(/ height="(\d+)"/, " ")
                        .replace(/ width="(\d+.\d+)"/, " ")
                        .replace(/ height="(\d+.\d+)"/, " ")
                        .replace("</svg>", "</symbol>");
                    svgOut.push(result.data);
                } else {
                    svgOut.push(result);
                }
            })

            //合并
            if (merge == 1) {
                svgOut.splice(0, 0, '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;">');
                svgOut.push('</svg>');
                svgOut = svgOut.join('');
            }

            vm.data = svgOut;
            vm.code = 200;
            vm.msg = "success";

            res.json(vm);
        });
    } else {
        vm.msg = "Method not allowed. Send a POST request.";

        res.json(vm);
    }
}