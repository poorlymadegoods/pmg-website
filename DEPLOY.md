# Deploying Poorly Made Goods via GitHub (web browser only)

This guide uses only github.com in your browser — no command line needed.
Total time: about 10 minutes.

## Before you start

- You need a GitHub account (free) — sign up at https://github.com/join if needed.
- The Formspree form ID is already wired in (`lib/config.ts`), so forms go
  live automatically once the site deploys.

## Step 1 — Create the repository

1. Go to https://github.com/new
2. **Repository name:** `pmg-website` (or anything you like).
3. Set it to **Public** (required for GitHub Pages on a free account).
4. Leave every checkbox **unchecked** — no README, no .gitignore, no license.
   The upload in Step 2 is simpler into a completely empty repo.
5. Click **Create repository**.

## Step 2 — Upload the site files

1. On the new repo's page, click the **"uploading an existing file"** link
   (it's in the "Quick setup" box).
2. In Windows File Explorer, open `pmg-website` and first make hidden items
   visible: **View → Show → Hidden items**. You need this to see the
   `.github` folder and `.gitignore` file.
3. Select **everything in the folder EXCEPT** these (skip them if present):
   - `node_modules` (huge — GitHub rebuilds it automatically)
   - `.next` and `out` (build output — rebuilt on every deploy)
   - `.git` (your local history; the web upload can't use it)
4. Drag the selected files and folders onto the GitHub upload page. Folders
   (`app`, `components`, `lib`, `public`, `.github`) can be dragged whole —
   their structure is preserved.
5. Wait for every file to finish processing, add a commit message like
   `Initial site upload`, and click **Commit changes**.
6. **Verify the critical file made it:** on the repo home page you should see
   a `.github` folder. Open it — it must contain
   `workflows/deploy.yml`. If it's missing, use **Add file → Upload files**
   and drag the `.github` folder in on its own.

## Step 3 — Turn on GitHub Pages

1. In the repo, go to **Settings → Pages** (left sidebar, under
   "Code and automation").
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (Not "Deploy from a branch.")

## Step 4 — Run the first deploy

1. Go to the **Actions** tab. If it asks you to enable workflows, click
   **"I understand my workflows, go ahead and enable them."**
2. You should see the **"Deploy to GitHub Pages"** workflow. If it didn't
   start automatically after the upload, click it, then **Run workflow →
   Run workflow** (uses the `main` branch).
3. Wait 2–3 minutes for both jobs (**build**, then **deploy**) to go green.
4. Click the finished **deploy** job — the live URL is shown there, and also
   appears at Settings → Pages ("Your site is live at …"). It will be
   `https://YOUR-USERNAME.github.io/pmg-website/`.

From now on, **every change committed to `main` redeploys automatically** —
including edits made directly in the GitHub web editor (press `.` or use the
pencil icon on any file).

## Step 5 (optional) — Custom domain

1. Buy/own a domain (e.g. `poorlymadegoods.com`).
2. At your domain registrar, add DNS records:
   - **Apex domain** (`poorlymadegoods.com`): four `A` records →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **www** subdomain: a `CNAME` record → `YOUR-USERNAME.github.io`
3. In the repo: **Settings → Pages → Custom domain**, enter the domain,
   click **Save**, and wait for the DNS check to pass.
4. Tick **Enforce HTTPS** once it becomes available (can take up to an hour).
5. Add the domain as a file so deploys don't wipe it: in the repo, open the
   `public` folder → **Add file → Create new file** → name it `CNAME`
   (no extension) → content is just the domain on one line, e.g.
   `poorlymadegoods.com` → **Commit changes**.

> Note: the site is configured for a **root URL** (custom domain or
> `username.github.io`). At the temporary
> `username.github.io/pmg-website/` address from Step 4, pages load but
> internal links/assets assume the root — fine for a quick check, correct
> once the custom domain is attached. To make the project URL itself fully
> work instead, set `basePath: "/pmg-website"` in `next.config.ts`.

## Step 6 — Confirm the forms work

1. On the live site, open **Contact**, fill in the form, and submit.
2. You should see "Sent — thanks!" and the message should arrive at
   the Formspree inbox / `contact@poorlymadegoods.com`.
3. First submission may require clicking a one-time confirmation email from
   Formspree to activate the form.

## Ongoing updates

- **Swap in photos:** upload images to `public/photos/` via
  **Add file → Upload files**, then edit `app/page.tsx` (home photos) or
  `app/goods/GoodsChapters.tsx` (product shots) in the web editor and add
  `src="/photos/your-file.jpg" alt="…"` to the matching `<PhotoSlot>`.
- **Edit copy or prices:** product/pricing data lives in `lib/catalog.ts`;
  page copy lives in the files under `app/`.
- Every commit to `main` redeploys the site automatically (watch progress in
  the Actions tab).
