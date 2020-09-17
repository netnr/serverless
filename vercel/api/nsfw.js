import { node } from '@tensorflow/tfjs-node';
import { load } from 'nsfwjs';
import { Form } from 'multiparty';
import { readFileSync } from 'fs';

export default (req, res) => {
    let code = 0, msg;
    if (req.method === "POST") {
        new Form().parse(req, (err, fields, files) => {
            if (err) {
                code = 1;
                msg = err + "";
                res.json({ code, msg });
            } else {
                let file = files.file ? files.file[0] : null;
                if (file) {
                    let ct = file.headers["content-type"] + "";
                    if (ct.startsWith("image") && !ct.includes("gif")) {
                        let mu = null;
                        if (process.env.NODE_ENV == "development") {
                            mu = "https://code.bdstatic.com/npm/nsfwjs-node@2.1.14/model/";
                        }
                        load(mu).then(function (model) {
                            let pic = readFileSync(file.path);
                            let image = node.decodeImage(pic, 3);
                            model.classify(image).then(function (predictions) {
                                image.dispose();
                                res.json(predictions);
                            })
                        })
                    } else {
                        code = 3;
                        msg = "Does not support GIF or is not a picture";
                        res.json({ code, msg });
                    }
                } else {
                    code = 2;
                    msg = "File not found";
                    res.json({ code, msg });
                }
            }
        });
    } else {
        code = 1;
        msg = "Method not allowed. Send a POST request.";
        res.json({ code, msg });
    }
}