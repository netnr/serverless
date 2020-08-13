const svgCaptcha = require('svg-captcha');

module.exports = (req, res) => {

    let ocount = parseInt(req.url.split('/').pop()) || 1, oarr = [];
    ocount = Math.min(ocount, 99);
    ocount = Math.max(ocount, 1);

    if (ocount == 1) {
        let c = svgCaptcha.create(req.query);
        res.json(c);
    } else {
        while (ocount--) {
            let c = svgCaptcha.create(req.query);
            oarr.push(c)
        }
        res.json(oarr);
    }
}