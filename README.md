# Cloudflare Workers × Cloudinary Cache + Proxy

Use this to:

1. Add a custom domain to your Cloudinary account
2. Cache your images, so you don't run up your Cloudinary bandwidth

This is made for Cloudinary, but should work for any CDN. For instance, you can proxy Backblaze B2 files with Cloudflare. The bandwidth between the two is free, so you are really only paying Backblaze to hold onto your assets.

## Setup

1. Run `npm install`
2. Rename `wrangler.toml.example` to `wrangler.toml`
3. In `wrangler.toml`, fill in the Account ID and Zone ID found on your cloudflare domain name main page.
4. Fill in your Cloudinary cloud name in the environmental variables in `wrangler.toml`
5. Change `route = "images.yourdomain.com/*"` in `wranglerfile.toml` to match your domain.
6. Deploy the sucker with:

- `npx wrangler dev` to test it. This will run it on localhost
- `npx wrangler deploy` to push to your custom domain

7. In the Cloudflare Workers dashboard, add your domain to the worker on Settings > Domains & Routes > Add Custom Domain

## To use

Say you have a URL that looks like this:

```
https://res.cloudinary.com/wesbos/image/upload/v1612297289/ARG-poster_cexeys.jpg
```

Replace the `res.cloudinary.com/wesbos/image` part with `images.yourdomain.com/CLOUDNAME`.

So mine looks like this:

`https://images.wesbos.com/upload/v1612297289/ARG-poster_cexeys.jpg`

This should still work with all the fetching, and URL transforms.

You can verify that your images are being cached by looking for the `cf-cache-status HIT` response header in your dev tools network tab. This will only show up the second time you request it.
