# Serverless
基于 Serverless 的服务

## Vercel
<https://api.zme.ink>

---

### ❤ Host/cors/{url}
支持跨域请求（转换不支持跨域请求的接口），可直接发起 ajax、fetch  
支持HTTPS（解决远程数据接口不支持HTTPS）  
 `{url}`需要 `encodeURIComponent` 编码

**示例**
- **Host/cors/{url}** 自动补上 `http://`
- <https://api.zme.ink/cors/api.github.com>
- <https://api.zme.ink/cors/nginx.org/download/nginx-1.16.1.tar.gz>
- 
- **Host/{http(s)://url}** 接口后面直接跟 http 开头可以不加 /cors
- <https://api.zme.ink/https%3A%2F%2Fapi.github.com>
- <https://api.zme.ink/http%3A%2F%2Fnginx.org%2Fdownload%2Fnginx-1.16.1.tar.gz>
- 
- ```js
  // 拷贝到控制台运行
  var $url = "http://wthrcdn.etouch.cn/weather_mini?citykey=101040100";
  fetch("https://api.zme.ink/" + encodeURIComponent($url)).then(x => x.json()).then(console.log)
  ```

---

### ❤ Host/clock/{timezone}
获取时钟（UTC），默认东8区，中国，自定义时区：东1~12区、西-1~-12区

**示例**
- <https://api.zme.ink/clock>
- <https://api.zme.ink/clock/0>

---

### ❤ Host/ip
获取IP

**示例**
- <https://api.zme.ink/ip>

---

### ❤ Host/svg/{wh}
生成占位图，默认 200×200

**示例**
- <https://api.zme.ink/svg>
- <https://api.zme.ink/svg/300*300>
- <https://api.zme.ink/svg/300x300>

---

### ❤ Host/ip
获取IP

**示例**
- <https://api.zme.ink/ip>

---

### ❤ Host/badge/nuget/v/{package}.svg
获取 NuGet 发布包的最新版本

**示例**
- <https://api.zme.ink/badge/nuget/v/Netnr.Core.svg>
- <https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg>
- ![Netnr.Core](https://api.zme.ink/badge/nuget/v/Netnr.Core.svg)
- ![Newtonsoft.Json](https://api.zme.ink/badge/nuget/v/Newtonsoft.Json.svg)

---

### ❤ Host/DK/{fn}
Netnr.DataKit NodeJs 接口服务，用于数据库工具及代码构建的服务

UI 地址：<https://ss.netnr.com/dk>