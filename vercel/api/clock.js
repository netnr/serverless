module.exports = (req, res) => {

    let ip = req.headers["x-forwarded-for"];
    let now = new Date();

    let timezone = parseInt(req.url.split('/')[2]);
    timezone = isNaN(timezone) ? 8 : timezone;
    timezone = Math.min(12, timezone);
    timezone = Math.max(-12, timezone);

    let tznow = new Date(now.valueOf() + timezone * 3600000);

    var start = new Date(tznow.getFullYear(), 0, 0);
    let day_of_year = Math.floor((tznow - start) / (24 * 60 * 60 * 1000));
    let week_number = Math.ceil(day_of_year / 7);

    day_of_week = tznow.getDay();

    let outBody = {
        week_number,
        utc_datetime: now.toISOString(),
        unixtime: now.valueOf(),
        day_of_year,
        day_of_week,
        datetime: tznow.toISOString().replace('Z', '').replace('T', ' '),
        time_zone: timezone,
        client_ip: ip,
    };

    res.json(outBody);
}