addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const rawContent = await (await fetch(`https://raw.githubusercontent.com/${url.pathname}`)).text();

  event.respondWith(
    new Response(rawContent, {
      status: 200,
      headers: new Headers({
        'Content-Type': url.pathname.endsWith(".css") ? "text/css" : "application/javascript",
        'Access-Control-Allow-Origin': "*"
      })
    })
  );
});
