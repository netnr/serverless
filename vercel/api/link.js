const fetch = require('node-fetch');

module.exports = (req, res) => {
    let link = req.url.substring('/link/'.length);
    link = decodeURIComponent(link);
    
    if (link.startsWith('http')) {
        fetch(link).then(resp => {
            let result = {
                ok: resp.ok,
                status: resp.status,
                statusText: resp.statusText,
                url: resp.url,
                headers: {}
            };
            const headers = resp.headers.raw();
            for (const key in headers) {
                let val = headers[key];
                result.headers[key] = val.length == 1 ? val[0] : val;
            }
            res.status(resp.status).json(result);
        }).catch(err => {
            res.status(404).send(err);
        })
    } else {
        res.status(404).send('Invalid link');
    }
}