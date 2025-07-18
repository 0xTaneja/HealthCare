# HealthCare – Secure File Sharing for Patients & Doctors

A static web app that lets patients upload medical files and share the IPFS link with their doctor – in one click.

Live Demo: https://sharemed.netlify.app/

## Project Info
MediShare (HealthCare) started life as a 36-hour hackathon proof-of-concept. The idea: let patients keep their medical records in their own hands while giving doctors time-bound access links powered by IPFS.

This cleaned-up open-source version keeps the spirit alive but pares the stack down to a static front-end plus a single Netlify Function. Anyone with a free Netlify and Pinata account can fork + deploy in under five minutes.

**Built With**
- HTML5 / CSS3 / Bootstrap 4 template
- Vanilla JavaScript (no frameworks)
- Netlify Functions (Node 18 runtime)
- Pinata IPFS API & public gateways

## Features

* Upload any document (PDF, image, etc.)
* Files are pinned to IPFS through Pinata
* CID / gateway link is copied to clipboard after upload
* Doctor ID is stored as metadata on the Pinata pin
* Built as a pure front-end (HTML/CSS/JS) + Netlify Function backend

## Tech Stack

| Layer | Tech |
|-------|------|
| Front-end | Bootstrap template + vanilla JS (`public/` folder) |
| File upload | JavaScript `FileReader` + fetch to serverless API |
| Backend | Netlify Function (`netlify/functions/upload.js`) |
| Storage | Pinata `pinFileToIPFS` API (requires JWT) |

## Quick Start (Local Dev)

```bash
# install deps
npm install
# serve the public folder at http://localhost:3000
npm run start
```

## Deploy on Netlify

1. Fork / clone the repo.
2. Add a site on Netlify → "Import from GitHub".
3. Set an env var `PINATA_JWT` with your Pinata JWT token.
4. Netlify will pick up `netlify.toml` (build publish `public`, functions dir `netlify/functions`).
5. After deploy, open the URL and upload a file – link will copy to clipboard.

## Env Variables

```
PINATA_JWT=YOUR_PINATA_JWT_TOKEN
```

## Roadmap

- [ ] Client-side AES encryption before upload
- [ ] MetaMask login & on-chain access control
- [ ] File preview component

## Licence

MIT © 2025 Rushab Taneja
