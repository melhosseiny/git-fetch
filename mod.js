import { serve } from "https://deno.land/std@0.115.1/http/server.ts";
import { content_type } from "./media_types.js";

serve(async (request) => {
  const { pathname } = new URL(request.url);
  const rawContent = await (await fetch(`https://raw.githubusercontent.com/${pathname}`)).text();

  return new Response(rawContent, {
      status: 200,
      headers: new Headers({
        'Content-Type': content_type(pathname),
        'Access-Control-Allow-Origin': "*"
      })
    })
});
