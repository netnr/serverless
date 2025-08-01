/**
 * Author: netnr
 * Date: 2023-07, 2025-08
 */

Deno.serve(handler);

async function handler(req: Request, connInfo: Deno.ServeHandlerInfo): Promise<Response> {
  let body: string;
  let code = 200;
  let contentType = "application/json";

  try {
    const userAgent = req.headers.get("user-agent") || "";
    const remoteAddr = connInfo.remoteAddr;
    const isIPv6 = remoteAddr.hostname.includes(":");

    let host = req.headers.get("host")?.toLowerCase();
    let isHtml = userAgent?.startsWith("curl/") == false && host?.startsWith("ip.");

    if (isHtml) {
      return createHtmlResponse(remoteAddr.hostname, isIPv6);
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

function createHtmlResponse(currentIP: string, isIPv6: boolean): Response {
  const otherIPType = isIPv6 ? 4 : 6;

  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Query</title>
    <link rel="icon" href="https://zme.ink/favicon.ico">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0d1117;
            color: #c9d1d9;
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            max-width: 550px;
            width: 100%;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
        h1 {
            text-align: center;
            margin-bottom: 32px;
            color: #58a6ff;
            font-size: 28px;
            font-weight: 600;
        }
        
        .ip-section {
            margin-bottom: 24px;
            padding: 20px;
            background: #21262d;
            border: 1px solid #30363d;
            border-radius: 8px;
        }
        
        .ip-label {
            font-size: 14px;
            color: #8b949e;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .ip-value {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 18px;
            color: #7dd3fc;
            word-break: break-all;
            padding: 8px 12px;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
        }
        
        .current-indicator {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            font-size: 12px;
            color: #56d364;
        }
        
        .current-dot {
            width: 8px;
            height: 8px;
            background: #56d364;
            border-radius: 50%;
        }
        
        .loading {
            color: #f85149;
            font-style: italic;
        }
        
        .not-supported {
            color: #f85149;
        }
        
        .commands {
            margin-top: 32px;
            padding: 20px;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 8px;
        }
        
        .commands h3 {
            color: #f0f6fc;
            margin-bottom: 16px;
            font-size: 16px;
        }
        
        .command {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            background: #21262d;
            padding: 8px 12px;
            margin: 8px 0;
            border-radius: 4px;
            font-size: 14px;
            color: #7dd3fc;
        }
        
        @media (max-width: 600px) {
            .container { padding: 24px 20px; }
            h1 { font-size: 24px; }
            .ip-value { font-size: 16px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IP Query</h1>

        <div class="ip-section">
            <div class="ip-label">IPv4 Address</div>
            <div class="ip-value" id="ipv4">${isIPv6 ? 'Detecting...' : currentIP}</div>
            ${!isIPv6 ? '<div class="current-indicator"><div class="current-dot"></div>Current Access</div>' : ''}
        </div>
        
        <div class="ip-section">
            <div class="ip-label">IPv6 Address</div>
            <div class="ip-value" id="ipv6">${isIPv6 ? currentIP : 'Detecting...'}</div>
            ${isIPv6 ? '<div class="current-indicator"><div class="current-dot"></div>Current Access</div>' : ''}
        </div>
        
        <div class="commands">
            <h3>CLI</h3>
            <div class="command">curl https://4.zme.ink</div>
            <div class="command">curl https://6.zme.ink</div>
            <div class="command">curl https://ip.zme.ink</div>
        </div>
    </div>
    
    <script>
        async function checkOtherIP() {
            const otherType = ${otherIPType};
            const elementId = otherType === 4 ? 'ipv4' : 'ipv6';
            const element = document.getElementById(elementId);
            
            try {
                const response = await fetch(\`https://\${otherType}.zme.ink\`, {
                    signal: AbortSignal.timeout(5000)
                });
                
                if (!response.ok) throw new Error('Network error');
                
                const data = await response.json();
                element.textContent = data.hostname || 'Failed to retrieve';
                element.classList.remove('loading');
            } catch (error) {
                element.textContent = \`IPv\${otherType} not supported\`;
                element.classList.add('not-supported');
                element.classList.remove('loading');
            }
        }
        
        checkOtherIP();
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "access-control-allow-origin": "*",
    },
  });
}
