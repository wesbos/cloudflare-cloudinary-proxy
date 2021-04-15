// Based on https://developers.cloudflare.com/workers/tutorials/configure-your-cdn

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})

const CLOUD_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

async function serveAsset(event) {
  const url = new URL(event.request.url)
  const cache = caches.default
  let response = await cache.match(event.request)
  if (!response) {
    const cloudinaryURL = `${CLOUD_URL}${url.pathname}`;
    response = await fetch(cloudinaryURL)
    let content_type = response.headers.get("content-type")
    let content_type_option = response.headers.get("x-content-type-options")
    let content_expose = response.headers.get("access-control-expose-headers")
    let ranges = response.headers.get("accept-ranges")
    // Cache for however long, here is 400 hours.
    const headers = {"accept-ranges": ranges, "cache-control": "public, max-age=1440000", "content-type": content_type, "access-control-expose-headers": content_expose, "x-content-type-options": content_type_option }
    response = new Response(response.body, { ...response, headers })
    event.waitUntil(cache.put(event.request, response.clone()))
  }
  return response
}

async function handleRequest(event) {
  console.log('Requesting the image')
  if (event.request.method === "GET") {
    let response = await serveAsset(event)
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  } else {
    return new Response("Method not allowed", { status: 405 })
  }
}
