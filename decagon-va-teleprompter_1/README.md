<p align="center">
  <img src="public/decagon-logo.png" alt="Decagon" height="34" />
</p>

<h1 align="center">Decagon VA Teleprompter</h1>

<p align="center">
  Multilingual teleprompter for voice-actor recording sessions.<br/>
  Manage scripts and phrases, adapt them by language/region, and present them on screen — no recording, just guided reading.
</p>

<p align="center">
  <em>React + Vite · single-page app · no backend</em>
</p>

---

## What is this

Decagon runs online voice-actor sessions (3–5 hours) where an engineer guides an actor through many scripts and phrases. This app is the **teleprompter** and **script library** for those sessions:

- The engineer picks the **app language** (their own UI language) and the **script region** (the accent/variant the actor reads) — the two are **independent**.
- Scripts are shown large, with **emotion badges**, **font-size control**, **autoscroll** for long scripts, section switching and a per-item **"covered"** tracker so sessions can skip around by time.
- Everything is **editable**: add/edit sections and items, or **import / export** whole libraries as JSON.

> There is intentionally **no audio recording**. This tool only presents and manages scripts.

## Key concepts

| Concept | What it is | Independent from |
| --- | --- | --- |
| **App language** (system) | The interface language: `ES` / `EN` / `DE`. | The scripts. |
| **Script region** | Language + country of the scripts the actor reads: `es-ES`, `es-MX`, `es-419`, `es-AR`, `en-US`, `de-DE`, `ca-ES`… | The app language. |
| **System instructions** | The briefing for the actor (pacing, how to read). Shown separately, editable, region-independent. | The recording sections. |
| **Recording sections** | The actual scripts/phrases, grouped into sections, per region. | The system instructions. |

## Features

- **Two independent selectors** in the top bar (app language + script region) plus a **Home** button to return to the welcome screen.
- **Sections of two kinds:** `phrases` (short lines, optional emotion) and `scripts` (step-by-step scenarios: a **scenario** context plus numbered **steps**).
- **Emotion badges** — emotion is content; the emoji/color is derived automatically and works across ES/EN/DE/CA vocabulary.
- **Teleprompter** — large text, `A− / A+` size control, prev/next, section picker, edit-in-place, "covered" progress. **Scripts play step by step:** a collapsible scenario card on top, one step shown at a time, step dots, and continuous flow from one scenario into the next.
- **Full CRUD** — create/edit/delete sections and items via modals.
- **Import / Export JSON** — load a region's scripts from a file or paste; export the current region; download a starter template.
- **Regional adaptation engine (Spanish)** — `es-MX`, `es-419`, `es-AR` are derived from the `es-ES` corpus by applying **idiom + variable** substitutions (currency `€→$`, `euros→pesos/dólares`, `móvil→celular`, `coche→auto/carro`, brands like `Glovo→Rappi`, …), preserving word boundaries and capitalization.
- **Core guides** shipped for `en-US`, `de-DE` and `ca-ES` (Català), covering every section type and extendable by import.

## Tech stack

- **React 18** + **Vite 6**
- **lucide-react** for icons
- No CSS framework — a single scoped `<style>` block with Decagon design tokens
- No backend, no database, no browser storage. State lives in memory during the session; persistence is via **Export/Import JSON**.

## Getting started

```bash
# 1) install
npm install

# 2) run the dev server
npm run dev

# 3) production build
npm run build
npm run preview
```

Open the URL Vite prints (default `http://localhost:5173`).

## Project structure

```
decagon-va-teleprompter/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx          # React entry point
│   └── App.jsx           # the whole app (UI, i18n, data, styles)
├── public/
│   └── decagon-logo.png  # transparent wordmark
├── data/
│   └── decagon-scripts-ca-ES.json   # sample import (Catalan)
├── docs/                 # screenshots / extra docs
├── README.md
├── GUIA_DE_USUARIO.md    # full user guide (Spanish)
└── LICENSE
```

> `src/App.jsx` embeds the base `es-ES` corpus, the `en-US` / `de-DE` / `ca-ES` core guides, and the logo (as a data URI), so the app runs with zero external assets.

## JSON format (import / export)

A library is a list of sections. Each section is `phrases` or `scripts`; each item has a `text`, an optional `title`, and an optional `emotion`.

```json
{
  "name": "My script set",
  "sections": [
    {
      "title": "Expressive phrases",
      "kind": "phrases",
      "hint": "Read naturally.",
      "items": [
        { "title": "", "text": "Hi, how can I help you today?", "emotion": "Friendly" },
        { "title": "", "text": "I can't believe it!", "emotion": "Excited" }
      ]
    },
    {
      "title": "Roleplay / Longform (CSR)",
      "kind": "scripts",
      "hint": "Scenario + steps. The actor advances step by step.",
      "items": [
        {
          "title": "Scenario 1 · Fraud",
          "scenario": "You're a Santander agent. The customer is calling about a fraudulent charge.",
          "steps": [
            "Greet and introduce yourself.",
            "Confirm they're reporting a fraudulent charge.",
            "Apologize sincerely and collect identity details.",
            "Freeze the card, open a dispute and give the case number."
          ]
        }
      ]
    }
  ]
}
```

- `kind`: `"phrases"` or `"scripts"` (defaults to `phrases`).
- **`phrases`** items use `text` (+ optional `emotion`). Shown one line at a time.
- **`scripts`** items use `scenario` (context, read silently) + `steps` (an array). The teleprompter presents them **step by step** — the actor advances through each step to the end of the scenario, then flows into the next one.
- **Backward compatible:** a `scripts` item that only has `text` with a numbered body (e.g. `"Escenario: …\n\n1. …\n\n2. …"`) is parsed automatically into `scenario` + `steps` on import.
- `emotion`: free text in any language; the emoji is matched automatically.
- Import supports **Replace** (swap the region's library) or **Add** (append).

A ready-to-import Catalan library lives in [`data/decagon-scripts-ca-ES.json`](data/decagon-scripts-ca-ES.json).

## Adding a language or region

1. **Add scripts to an existing region:** open the region in the top-bar selector → **Import JSON** (or create sections manually).
2. **Add a brand-new region option:** in `src/App.jsx`, add an entry to `SCRIPT_LOCALES` (e.g. `{ code: "pt-BR", flag: "🇧🇷", lang: "Português", region: "Brasil" }`). Then either import its JSON in-app, or add a core library in the injected `EXTRA_LIBS`.
3. **Add a UI (system) language:** add an entry to `LANGS` and a matching block to `I18N` in `src/App.jsx`.

See [`GUIA_DE_USUARIO.md`](GUIA_DE_USUARIO.md) for the end-user walkthrough.

## Notes & limitations

- The four Spanish variants carry the **full** corpus (via rule-based adaptation). `en-US`, `de-DE`, `ca-ES` ship a **complete core** guide per section type; translate the long CSR corpus through a translation pipeline and load it via JSON to complete them.
- There is no persistence layer. Use **Export JSON** to save your edits; commit those JSON files to `data/` if you want them versioned.

## License

MIT — see [LICENSE](LICENSE). The Decagon name and logo belong to their owner; replace `public/decagon-logo.png` before any public distribution.
