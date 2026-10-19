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
- `news.html` – News & Berichte (Filter funktioniert)
- `spielbericht.html` – Spielbericht (Vorlage)
- `redaktion.html` – Über uns / Redaktion

## Schriften
- Titel: Roc Grotesk (Adobe Fonts). Ist kein Kit eingebunden, wird – wie im Design-Canvas – Archivo Black verwendet (selbst gehostet in `assets/fonts`).
  Für Roc Grotesk: in jeder HTML-Datei die auskommentierte Typekit-Zeile aktivieren und die Kit-ID eintragen.
- Lauftext: Helvetica.

## Noch offen
- YouTube- und TikTok-Links sind Platzhalter (`href="#"`).
- Texte in [eckigen Klammern] sind Platzhalter.
