/**
 * Author: netnr
 * Date: 2023-06
 *
 * deno run --allow-net --watch redirect.ts
 */

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(handler, { port: 713 });

async function handler(req: Request): Promise<Response> {
  const urlMap = {
    "guff.ltd": "https://www.netnr.com/guff/discover",
    "status.zme.ink": "https://stats.uptimerobot.com/koD1PsO4AG",
  };

  let url = urlMap[req.headers.get("host")];
  if (url != null) {
    return new Response("", {
      status: 308,
      headers: { Location: url },
    });
  }

  return new Response(JSON.stringify(urlMap, null, 2), { status: 200 });
}
