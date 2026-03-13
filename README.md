# Bilingual School Website

Private website project for a school, with bilingual public pages and a staff CMS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS (custom properties)
- **Content:** File-based JSON in `/content/`

## Features

- Bilingual (English & Bengali) throughout
- Custom staff CMS with password + TOTP 2-factor authentication
- Gallery, announcements, news, documents, careers, and results sections
- Mobile-responsive design

## Project Structure

```
src/
  app/          # Pages and API routes (Next.js App Router)
  components/   # Shared UI components
  data/         # Static site content (bilingual)
  lib/          # Auth, security, and utility helpers
content/        # CMS-managed JSON content files
public/
  media/        # Site photos and uploaded media
```

## Public Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/our-school` | About page |
| `/academics` | Learning and subjects |
| `/admissions` | Admissions information |
| `/blog` | Events and news |
| `/gallery` | Photo and video gallery |
| `/announcements` | Notices and announcements |
| `/file-share` | Documents and learning tools |
| `/contact` | Contact information |
| `/post/[slug]` | Individual news post |
| `/events/[slug]` | Individual event/result page |

## Staff CMS

Staff can log in at `/cms` to manage content without touching code.

**Login flow:** staff password → 6-digit TOTP code from an authenticator app (e.g. Google Authenticator)

**What staff can manage:**
- Gallery photos and videos
- Announcements
- News and events
- Documents and circulars
- Career postings

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` file with:

```
CMS_PASSWORD=your_staff_password
CMS_SESSION_SECRET=your_long_random_session_secret
CMS_TOTP_SECRET=your_base32_totp_secret
```

`CMS_SESSION_SECRET` should be a long random value and is required in production.

`CMS_TOTP_SECRET` is optional. If omitted, 2FA is skipped and only the password is required.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
