English | [简体中文](README_zh-CN.md)

# Serverless
Serverless-based services

## Vercel
<https://api.zme.ink>

---

### ❤ Host/analysis//{lang}
Content word segmentation, keyword extraction

**Example**
- <https://api.zme.ink/analysis?content=结过婚的和尚未结过婚的>
- <https://api.zme.ink/analysis?ctype=1&content=结过婚的和尚未结过婚的>

---

### ❤ Host/badge/nuget/v/{package}.svg
Get the latest version of the NuGet release package

**Example**
- <https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg>
- ![Newtonsoft.Json](https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg)
- <https://api.zme.ink/badge/npm/v/zoningjs.svg>
- ![zoningjs](https://api.zme.ink/badge/npm/v/zoningjs.svg)

---

### ❤ Host/captcha/{count}
Generate SVG verification code

**Example**
- <https://api.zme.ink/captcha>
- <https://api.zme.ink/captcha/2?size=6&color=true&noise=5>

---

### ❤ Host/clock/{timezone}
Get the clock (UTC), the default is East 8 District, China, custom time zone: East 1\~12 District, West -1 ~ -12

**Example**
- <https://api.zme.ink/clock>
- <https://api.zme.ink/clock/0>

---

### ❤ Host/cors/{url}
Support cross-domain request  
Convert HTTP to HTTPS  
`{url}` need `encodeURIComponent` coding  
Platform limit **10** seconds timeout (not downloading large files)

**Example**
- **Host/cors/{url}** Auto-fill `http://`
- <https://api.zme.ink/cors/api.github.com>
- <https://api.zme.ink/cors/nginx.org/download/nginx-1.16.1.tar.gz>
- 
- **Host/{http(s)://url}** The interface can be directly followed by http at the beginning without /cors
- <https://api.zme.ink/https%3A%2F%2Fapi.github.com>
- <https://api.zme.ink/http%3A%2F%2Fnginx.org%2Fdownload%2Fnginx-1.16.1.tar.gz>
- 
- ```js
  // Copy to the console to run
  var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
  fetch("https://api.zme.ink/" + encodeURIComponent($url)).then(x => x.json()).then(console.log)
  ```

---

### ❤ Host/DK/{fn}
Netnr.DataKit NodeJs, Interface services, services for database tools and code construction

UI：<https://ss.netnr.com/dk>

---

### ❤ Host/ip
Get IP

**Example**
- <https://api.zme.ink/ip>

---

### ❤ Host/svg/{wh}
Generate placeholder image, default 200×200

**Example**
- <https://api.zme.ink/svg>
- <https://api.zme.ink/svg/300*300>
- <https://api.zme.ink/svg/300x300>

---

### ❤ Host/uuid/{count}
Generate UUID, default one, many are array

**Example**
- <https://api.zme.ink/uuid>
- <https://api.zme.ink/uuid/9>