# KM School Website

This project is the KM School public website rebuilt in Next.js, with a free GitHub-backed staff CMS for managing public content.

## What is included

- Public school website pages:
  - `/`
  - `/our-school`
  - `/academics`
  - `/admissions`
  - `/blog`
  - `/file-share`
  - `/contact`
  - `/post/[slug]`
  - `/events/[slug]`
- Staff access pages:
  - `/login`
  - `/portal`
  - `/admin/`
- Git-backed content collections for:
  - news
  - results and notices
  - public documents
  - gallery images

## Stack

- Next.js 16
- React 19
- Decap CMS
- GitHub OAuth
- Vercel deployment

## Content model

- Editable content is stored in:
  - `content/news`
  - `content/results`
  - `content/documents`
  - `content/gallery`
- Uploaded images and files go to:
  - `public/uploads`
- Extracted school media used by the public site lives in:
  - `public/media`

## Local development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm run build
```

## Staff CMS setup

1. Copy `.env.example` to `.env.local`.
2. Create a GitHub OAuth App.
3. Put these values in `.env.local`:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
4. For local development, use:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/decap/callback`
5. Start the app and open `/admin/`.

## Production setup

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Add the same GitHub OAuth env vars in Vercel.
4. Create or update the GitHub OAuth App with:
   - Homepage URL: your production site URL
   - Authorization callback URL: `https://your-domain/api/decap/callback`
5. Open `/admin/` on the live site and sign in with an authorised GitHub account.

## How staff access works

- You remain the main repository and deployment admin.
- Other staff use `/admin/` as a no-code editor.
- With the current CMS configuration, staff can submit content updates through GitHub-backed editorial workflow.
- For a private repo, invited editors should be GitHub collaborators so they can access the CMS safely.

## What staff can upload without code

- gallery images
- PDF and document links
- school news updates
- result notices

## Notes

- No public video pack was available in the downloaded Wix pages, so this repo currently contains images only.
- The public site uses KM School photos; unused foreign placeholder portraits from the earlier rebuild were removed.
