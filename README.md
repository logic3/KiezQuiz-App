# KiezQuiz – Native App (Capacitor)

Native iOS/iPadOS/macOS wrapper for [KiezQuiz](https://github.com/logic3/KiezQuiz) — the gamified Hamburg districts quiz.

The game logic, map, and UI live in the **web repo**. This repo only contains the Capacitor shell and Xcode project.

## Repos

| Repo | Purpose |
|------|---------|
| [logic3/KiezQuiz](https://github.com/logic3/KiezQuiz) | Web app (HTML/CSS/JS) → GitHub Pages |
| **logic3/KiezQuiz-App** (this repo) | Native wrapper → Xcode / Simulator / iPhone |

Locally, both folders sit side by side:

```
…/KiezQuiz/       ← clone web repo here
…/KiezQuiz-App/   ← clone this repo here
```

## What to edit where

| Change | Edit in | Then |
|--------|---------|------|
| Game modes, map, XP, sounds, CSS | **KiezQuiz** (web) | `npm run cap:sync` in KiezQuiz-App |
| App icon, splash, Bundle ID, signing | **KiezQuiz-App** / Xcode | commit here only |
| Capacitor settings (scroll, status bar) | `capacitor.config.json` here | commit here only |

**Do not edit** `www/` or `ios/App/App/public/` — those are overwritten on every sync.

## Daily workflow

```bash
# 1. Change web app
cd ../KiezQuiz
# … edit src/app.js, style.css, etc. …
git add -A && git commit -m "…" && git push

# 2. Sync into native app
cd ../KiezQuiz-App
npm run cap:sync

# 3. Test in Xcode
npm run cap:open:ios
# ⇧⌘K then ⌘R
```

## First-time setup

1. Clone both repos as siblings (see above).
2. In `KiezQuiz-App`: `npm install`
3. Follow **SETUP.md** for Xcode.

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run sync:web` | Copy `../KiezQuiz` → `www/` |
| `npm run cap:sync` | Sync web + update iOS project |
| `npm run cap:open:ios` | Open `App.xcworkspace` in Xcode |
| `npm run cap:run:ios` | Sync and launch on simulator |

## Notes

- **Simulator / own device:** free Apple ID signing (no paid developer account).
- **TestFlight / App Store:** Apple Developer Program (99 €/year) — not set up yet.
- Bundle ID: `de.jeremiahlauer.kiezquiz`
