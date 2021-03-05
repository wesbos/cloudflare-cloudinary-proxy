# Cloudflare × Workers Cloudinary Proxy

Use this to:

1. Add a custom domain to your Cloudinary account
2. Cache your images, so you don't run up your Cloudinary bandwidth

This is made for Cloudinary, but should work for any CDN. For instance, you can proxy Backblaze B2 files with Cloudflare. The bandwidth between the two is free, so you are really only paying Backblaze to hold onto your assets.


## Setup

1. Rename `wrangler.toml.example` to `wrangler.toml`
2. In `wrangler.toml`, fill in the Account ID and Zone ID found on your cloudflare domain name main page.
3. Fill in your Cloudinary cloud name in the environmental variables in `wrangler.toml`
3. In Cloudflare, add a sub-domain DNS Record that will handle your images, like `images.yourdomain.com`. Set this to type: `AAA`, name: `images`, content: `100::`
4. Change `route = "images.yourdomain.com/*"` in `wranglerfile.toml` to match your domain.
5. Deploy the sucker with:
  * `wrangler publish` to test it. This will run it on wrangler.dev
  * `wrangler publish --env production` to push to your custom domain

If you haven't already, install wrangler on your machine with `npm i @cloudflare/wrangler -g`. Don't pop a sudo in front, it doesn't work. You can login with `wrangler login`.
