# Latteschüsse TV – Website (Variante C)

Statische Website, 1:1 aus dem Claude-Design (Variante C) generiert. Kein Build nötig.

## Auf Vercel veröffentlichen
1. vercel.com → «Add New…» → «Project» → diesen Ordner hochladen (oder via GitHub-Repo verbinden).
2. Framework Preset: «Other». Build Command und Output Directory leer lassen.
3. Deploy. `vercel.json` sorgt für saubere URLs (z. B. `/lattecup` statt `/lattecup.html`).

Alternativ per CLI im Ordner: `npx vercel` (Vorschau) bzw. `npx vercel --prod`.

## Seiten
- `index.html` – Startseite
- `lattecup.html` – LatteCup
- `live.html` – Live
- `mixed-zone.html` – Mixed-Zone (Filter funktioniert)
- `spielbericht.html` – Spielbericht (Vorlage)
- `redaktion.html` – Über uns / Redaktion

## Schriften
- Titel: Roc Grotesk über Adobe Fonts (Kit `fmt3emr`). Fallback: Archivo Black (selbst gehostet in `assets/fonts`).
  Wichtig: Im Adobe-Fonts-Kit unter «Domains» die Vercel-Adresse (z. B. `*.vercel.app`) und später die eigene Domain eintragen, sonst lädt die Schrift nicht.
- Lauftext: Helvetica.

## Noch offen
- YouTube- und TikTok-Links sind Platzhalter (`href="#"`).
- Texte in [eckigen Klammern] sind Platzhalter.
