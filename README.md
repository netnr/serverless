English | [简体中文](README_zh-CN.md)

# Serverless
Serverless-based services

## Vercel
<https://api.zme.ink>

---

### ❤ /aip/ocr
OCR Universal Character Recognition (Baidu AI)

**Example**
- POST <https://api.zme.ink/aip/ocr> , pass file or url, choose one

---

### ❤ /analysis/{lang}
Content word segmentation, keyword extraction

**Example**
- <https://api.zme.ink/analysis?content=结过婚的和尚未结过婚的>
- <https://api.zme.ink/analysis?ctype=1&content=结过婚的和尚未结过婚的>

---

### ❤ /badge/nuget/v/{package}.svg
Get the latest version of the NuGet release package

**Example**
- <https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg>
- ![Newtonsoft.Json](https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg)
- <https://api.zme.ink/badge/npm/v/zoningjs.svg>
- ![zoningjs](https://api.zme.ink/badge/npm/v/zoningjs.svg)

---

### ❤ /captcha/{count}
Generate SVG verification code

**Example**
- <https://api.zme.ink/captcha>
- <https://api.zme.ink/captcha/2?size=6&color=true&noise=5>

---

### ❤ /clock/{timezone}
Get the clock (UTC), the default is East 8 District, China, custom time zone: East 1\~12 District, West -1 ~ -12

**Example**
- <https://api.zme.ink/clock>
- <https://api.zme.ink/clock/0>

---

### ❤ /DK/{fn}
Netnr.DataKit NodeJs, Interface services, services for database tools and code construction

UI：<https://ss.netnr.com/dk>

---

### ❤ /ip
Get IP

**Example**
- <https://api.zme.ink/ip>

---

### ❤ /nsfw
Picture review  NSFWJS (Drawing,Hentai,Neutral,Porn,Sexy)

**Example**
- POST <https://api.zme.ink/nsfw> ，pass file

---

### ❤ /svg/{wh}
Generate placeholder image, default 200×200

**Example**
- <https://api.zme.ink/svg>
- <https://api.zme.ink/svg/300*300>
- <https://api.zme.ink/svg/300x300>

---

### ❤ /uuid/{count}
Generate UUID, default one, many are array

**Example**
- <https://api.zme.ink/uuid>
- <https://api.zme.ink/uuid/9>