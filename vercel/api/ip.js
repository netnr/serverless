module.exports = (req, res) => {
    let ip = req.headers["x-forwarded-for"];
    
    res.send(ip);
}