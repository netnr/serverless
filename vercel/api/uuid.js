const { v4: uuidv4 } = require('uuid');

module.exports = (req, res) => {

    let ucount = parseInt(req.url.split('/').pop()) || 1, oarr = [];
    ucount = Math.min(ucount, 99);
    ucount = Math.max(ucount, 1);

    if (ucount == 1) {
        res.send(uuidv4())
    } else {
        while (ucount--) {
            oarr.push(uuidv4())
        }

        res.json(oarr);
    }
}