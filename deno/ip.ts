/**
 * Author: netnr
 * Date: 2023-06
 *
 * deno run --allow-net --watch ip.ts
 */

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(handler, { port: 713 });

async function handler(req: Request, connInfo: ConnInfo): Promise<Response> {
  let body: string;
  let code = 200;
  let contentType = "application/json";

  try {
    let userAgent = req.headers.get("user-agent");
    let remoteAddr = connInfo.remoteAddr;
    let isIPv6 = remoteAddr.hostname.includes(":");
    let isIPv = isIPv6 ? 6 : 4;
    let isNotIPv = isIPv6 ? 4 : 6;
    let ipv4Txt = remoteAddr.hostname;
    let ipv6Txt = remoteAddr.hostname;
    if (isIPv6) {
      ipv4Txt = "Checking...";
    } else {
      ipv6Txt = "Checking...";
    }

    let host = req.headers.get("host")?.toLowerCase();
    let isHtml = userAgent?.startsWith("curl/") == false && host?.startsWith("ip.");
    if (isHtml) {
      body = `<!-- No commercial use -->
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    
    <link rel='shortcut icon' href='https://zme.ink/favicon.ico' type='image/x-icon' />

    <title>IP Query</title>

    <style>
        html,
        body {
            margin: 2em 0;
            padding: 0 1em;
            color: #adbac7;
            box-sizing: border-box;
            background-color: #22272e;
        }

        .text-center {
            text-align: center
        }

        .nr-wraper {
            margin: auto;
            max-width: 24em;
            border-top: 1px solid #adbac7;
        }

        .nr-wraper b {
            margin-right: 1em;
            user-select: none;
        }

        .nr-wraper code {
            word-wrap: break-word;
        }
    </style>
</head>

<body>
    <h2 class="text-center">IP Query</h2>
    <div class="nr-wraper">
        <h4><b>IPv4:</b><code class="nr-ipv4">${ipv4Txt}</code></h4>
        <h4><b>IPv6:</b><code class="nr-ipv6">${ipv6Txt}</code></h4>
        <h4>Currently accessed using IPv${isIPv}</h4>
        <br/>
        <code>
            <p>curl 4.zme.ink -L</p>
            <p>curl 6.zme.ink -L</p>
            <p>curl ip.zme.ink -L</p>
        </code>
    </div>

    <script type="module">
        let url = 'https://${isNotIPv}.zme.ink';
        let domIpv = document.querySelector('.nr-ipv${isNotIPv}');
        try {
            let resp = await fetch(url);
            let result = await resp.json();
            domIpv.innerHTML = result.hostname;
        } catch (ex) {
            domIpv.innerHTML = 'Does not support IPv${isNotIPv}';
            domIpv.style.color = 'orange';
        }
    </script>
</body>

</html>
      `;

      contentType = "text/html";
    } else {
      body = JSON.stringify(connInfo.remoteAddr, null, 2);
    }
  } catch (error) {
    console.error(error);
    body = error;
    code = 500;
  }

  return new Response(body, {
    status: code,
    headers: {
      "access-control-allow-origin": "*",
      "content-type": `${contentType}; charset=UTF-8`,
    },
  });
}
