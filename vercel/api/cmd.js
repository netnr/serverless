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
                if (!(pars.cmd.indexOf("-in @") >= 0 && pars.cmd.indexOf("-out @") >= 0)) {
                    vm.msg = "Illegal format";
                    res.json(vm);
                    return;
                }
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
                        const fc = pars.content[fk];
                        fs.writeFileSync(tmpfolder + '/' + fk, fc);
                    }
                }
                let ecmd = `cd ${tmpfolder} && ${pars.cmd}`;
                exec(ecmd, function (err) {
                    if (err) {
                        vm.msg = err + "";
                    } else {
                        let odata = fs.readFileSync(tmpfolder + "/" + outfile);
                        vm.code = 200;
                        vm.data = {
                            name: outfile,
                            content: odata.toString('base64')
                        };
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