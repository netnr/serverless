[English](README.md) | 简体中文

# Serverless
基于 Serverless 的服务

## Vercel
<https://api.zme.ink>

---

### ❤ /aip/ocr
OCR 通用文字识别（百度AI）

**示例**
- POST <https://api.zme.ink/aip/ocr> ，传 file 或 url ，二选一

---

### ❤ /analysis/{lang}
内容分词、提取关键词

**示例**
- <https://api.zme.ink/analysis?content=结过婚的和尚未结过婚的>
- <https://api.zme.ink/analysis?ctype=1&content=结过婚的和尚未结过婚的>

---

### ❤ /badge/nuget/v/{package}.svg
获取 NuGet 发布包的最新版本

**示例**
- <https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg>
- ![Newtonsoft.Json](https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg)
- <https://api.zme.ink/badge/npm/v/zoningjs.svg>
- ![zoningjs](https://api.zme.ink/badge/npm/v/zoningjs.svg)

---

### ❤ /captcha/{count}
生成 SVG 验证码

**示例**
- <https://api.zme.ink/captcha>
- <https://api.zme.ink/captcha/2?size=6&color=true&noise=5>

---

### ❤ /clock/{timezone}
获取时钟（UTC），默认东8区，中国，自定义时区：东1 \~ 12区、西-1 ~ -12区

**示例**
- <https://api.zme.ink/clock>
- <https://api.zme.ink/clock/0>

---

### ❤ /DK/{fn}
Netnr.DataKit NodeJs 接口服务，用于数据库工具及代码构建的服务

UI 地址：<https://ss.netnr.com/dk>

---

### ❤ /ip
获取IP

**示例**
- <https://api.zme.ink/ip>

---

### ❤ /nsfw
图片审查（绘画、变态、中立、色情、性感）

**示例**
- POST <https://api.zme.ink/nsfw> ，传 file

---

### ❤ /svg/{wh}
生成占位图，默认 200×200

**示例**
- <https://api.zme.ink/svg>
- <https://api.zme.ink/svg/300*300>
- <https://api.zme.ink/svg/300x300>

---

### ❤ /uuid/{count}
生成 UUID，默认1条，多条为数组

**示例**
- <https://api.zme.ink/uuid>
- <https://api.zme.ink/uuid/9>