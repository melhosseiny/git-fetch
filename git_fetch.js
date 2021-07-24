const server = Deno.listen({ port: 5000 });
console.log(`HTTP webserver running. Access it at:  http://localhost:5000/`);

async function handle(conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    console.log(url.pathname);
    const rawContent = await (await fetch(`https://raw.githubusercontent.com/${url.pathname}`)).text();
    console.log(rawContent);
    await requestEvent.respondWith(
      new Response(rawContent, {
        status: 200,
        headers: new Headers({
          'Content-Type': url.pathname.endsWith(".css") ? "text/css" : "application/javascript",
          'Access-Control-Allow-Origin': "*"
        })
      })
    );
  }
}

for await (const conn of server) {
  handle(conn);
}
