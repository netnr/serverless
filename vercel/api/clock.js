module.exports = (req, res) => {

    let ip = req.headers["x-forwarded-for"];
    let now = new Date();

    let timezone = parseInt(req.url.split('/')[2]);
    timezone = isNaN(timezone) ? 8 : timezone;
    timezone = Math.min(12, timezone);
    timezone = Math.max(-12, timezone);

    let d1 = new Date();
    let d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);

    let day_of_year = Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000));
    let week_number = Math.ceil(day_of_year / 7);

    day_of_week = now.getDay();

    let outBody = {
        week_number,
        utc_datetime: now.toISOString(),
        unixtime: now.valueOf(),
        day_of_year,
        day_of_week,
        datetime: new Date(now.valueOf() + timezone * 3600000).toISOString().replace('Z', '').replace('T', ' '),
        time_zone: timezone,
        client_ip: ip,
    };

    res.json(outBody);
}