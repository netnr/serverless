const fs = require('fs');
const { exec, execSync } = require('child_process');

module.exports = (req, res) => {
    let vm = { code: 0, msg: "", data: null };

    let pars = req.method == "POST" ? req.body : req.query;

    pars.cmd = pars.cmd.replace(/&/g, '').replace(/\|/g, '').replace(/>/g, '');
    let pcmd = pars.cmd.split(' ')[0];
    switch (pcmd) {
        case "openssl":
            {
                let outfile;
                pars.cmd.replace(/\@out.\w+/, function (a) {
                    outfile = a;
                })

                let tf1 = "/tmp/";
                let tf2 = "_openssl_";
                let tmpfolder = tf1 + tf2 + Date.now() + "_" + Math.random().toString().substr(2, 4);
                fs.mkdirSync(tmpfolder);

                if (pars.content && pars.content != "") {
                    pars.content = JSON.parse(pars.content);
                    for (const fk in pars.content) {
                        let fc = pars.content[fk];
                        if (fc.includes(";base64,")) {
                            fc = fc.split(';base64,').pop();
                        }
                        fs.writeFileSync(tmpfolder + '/' + fk, Buffer.from(fc, 'base64'));
                    }
                }

                let ecmd = `cd ${tmpfolder} && ${pars.cmd}`;
                exec(ecmd, function (err, data) {
                    if (err) {
                        vm.msg = err + "";
                        res.json(vm);
                    } else {
                        vm.msg = data;
                        vm.code = 200;
                        if (outfile) {
                            let odata = fs.readFileSync(tmpfolder + "/" + outfile);
                            vm.data = {
                                name: outfile,
                                content: odata.toString('base64')
                            };
                        }
                        fs.readdirSync(tf1).forEach(fi => {
                            if (fi.startsWith(tf2) && Date.now() - fi.split('_')[2] > 30000) {
                                exec("rm -r " + tf1 + fi)
                            }
                        });
                        res.json(vm);
                    }
                })
            }
            break;
        default:
            vm.msg = "Blocked order";
            res.json(vm);
            break;
    }
}