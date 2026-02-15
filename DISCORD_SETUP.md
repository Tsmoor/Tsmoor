# Discord Connect Setup (guns.lol-style)

Use this guide to link your Discord account to the site.

## 1) Create a Discord Application
1. Open: https://discord.com/developers/applications
2. Click **New Application**.
3. Copy your **Client ID**.

## 2) Configure OAuth2
1. Open your app > **OAuth2**.
2. In **Redirects**, add your site callback URL exactly:
   - Local: `http://localhost:4173/`
   - Production example: `https://yourdomain.com/`
3. Save changes.

## 3) Update site config (without committing secrets)
From the website Discord card:
- Paste your **Client ID**
- Paste your **Redirect URI**
- Click **Save local config**

This is saved in browser `localStorage` only, so you can keep GitHub clean.

## 4) Connect from your site
1. Open your website.
2. Click **Authorize Discord App**.
3. Accept Discord permissions.
4. You should return to site and see your avatar + username under connected state.

## Security notes
- Current implementation uses OAuth `response_type=token` for static websites.
- For stronger security in production, move OAuth exchange to a backend using Authorization Code flow.
