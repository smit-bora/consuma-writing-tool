# Consuma Style Console — deploy to Vercel

## What's in here
- `index.html` — the tool's frontend. Static, no build step.
- `api/generate.js` — a serverless function that holds your Anthropic API key
  server-side and proxies requests to it. The browser never sees the key.
- `package.json` — tells Vercel this is a Node project.

## 1. Get an Anthropic API key
Go to https://console.anthropic.com, create (or select) an organization, add
billing, and generate an API key under "API Keys." This is separate from a
claude.ai subscription — it's pay-as-you-go, billed per token.

## 2. Deploy

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd consuma-vercel
vercel login
vercel
```
Follow the prompts (link to a new project, accept defaults — no framework,
no build command needed). This gives you a preview URL immediately.

### Option B — GitHub + Vercel dashboard
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → Add New → Project → import the repo.
3. Framework preset: "Other." No build command, no output directory needed.
4. Deploy.

## 3. Set environment variables
In the Vercel project → Settings → Environment Variables, add:
- `ANTHROPIC_API_KEY` — the key from step 1.
- `ACCESS_CODE` — any string you choose. This gates the `/api/generate`
  endpoint so a random visitor with your URL can't spend your API credits.
  Type the same value into the "Access code" field in the tool's UI when
  you use it. Leave this variable unset if you genuinely want the tool
  open to anyone (not recommended once it's live).

After adding env vars, redeploy (Vercel → Deployments → ⋯ → Redeploy) so
the function picks them up.

## 4. Go live
Vercel gives you a `*.vercel.app` domain automatically. To use your own
domain, go to Settings → Domains and add it (works with any registrar via
a CNAME/A record — Vercel walks you through it).

## Notes
- The rulebook (`RULES` object, banned words, locked stats, etc.) lives in
  `index.html`. Edit it there — no redeploy pipeline needed beyond a normal
  `vercel --prod` or a new git push.
- `api/generate.js` is the only place your API key is ever read. Don't add
  it to `index.html` or any client-side code.
- Every request still costs real API tokens. The access code stops
  randoms from finding the URL and burning through your quota, but anyone
  you share the code with can still generate freely — there's no per-user
  rate limit here. Add one (e.g. via Vercel's Edge Config or a simple
  in-memory counter) if that becomes a problem.
