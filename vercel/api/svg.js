module.exports = (req, res) => {

    let pn2 = req.url.split('/')[2] || '';

    let sc = 'x';
    if (pn2.includes('*')) {
        sc = '*'
    }
    if (pn2.includes('_')) {
        sc = '_'
    }

    let w = parseInt(pn2.split(sc)[0]);
    w = isNaN(w) ? 200 : w;
    let h = parseInt(pn2.split(sc)[1]);
    h = isNaN(h) ? 200 : h;

    let wh = w + ' ' + sc + ' ' + h;

    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><rect width="' + w + '" height="' + h + '" fill="#eee" /><text text-anchor="middle" x="' + Math.ceil(w / 2).toFixed(0) + '" y="' + Math.ceil(h / 2).toFixed(0) + '" style="fill:#aaa;font-weight:bold;font-size:1rem;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">' + wh + '</text></svg>';

    res.setHeader('content-type', 'image/svg+xml;charset=utf-8');
    res.setHeader('cache-control', 'public,max-age=300');
    res.send(svg);
}