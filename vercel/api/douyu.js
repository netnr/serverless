module.exports = async (req, res) => {

    let roomId = parseInt(req.url.split('/')[2]);
    if (isNaN(roomId)) {
        res.status(404).send('Invalid room id');
    } else {
        let resp = await fetch(`http://open.douyucdn.cn/api/RoomApi/room/${roomId}`,
            {
                headers: {
                    Referer: `https://www.douyu.com/${roomId}`,
                },
            });
        let json = await resp.json();
        if (json.error == 0) {
            delete json.data.gift;
            res.json(json.data);
        } else {
            res.status(404).json(json);
        }
    }
}