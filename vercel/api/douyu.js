const fetch = require('node-fetch');

module.exports = (req, res) => {
    let roomId = parseInt(req.url.split('/')[2]);
    if (isNaN(roomId)) {
        res.status(404).send('Invalid room id');
    } else {
        fetch(`http://open.douyucdn.cn/api/RoomApi/room/${roomId}`, {
            headers: {
                Referer: `https://www.douyu.com/${roomId}`,
            },
        }).then(resp => resp.json()).then(json => {
            if (json.error == 0) {
                delete json.data.gift;
                res.json(json.data);
            } else {
                res.status(404).json(json);
            }
        });
    }
}