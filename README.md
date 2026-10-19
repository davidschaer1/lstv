# Latteschüsse TV – Website (Variante C)

Statische Website mit einer kleinen Vercel-Funktion für Instagram. Kein Build nötig.

## Seiten
- `/` Startseite · `/mixed-zone` · `/lattecup` · `/live` (Coming Soon) · `/ueber-lstv` · `/impressum` · `/spielbericht` (Vorlage)

## Vor dem Livegang
1. **Domain:** Aktuell `https://lstv-iota.vercel.app`. Bei einer eigenen Domain in allen Dateien ersetzen
   (HTML-Dateien, `sitemap.xml`, `robots.txt`).
2. **Impressum:** Platzhalter in `impressum.html` ausfüllen (Rechtsform, Adresse, ggf. UID).
3. **Datenschutzerklärung:** Entwurf unter `/datenschutz` – Platzhalter ausfüllen und prüfen lassen.
4. **Links:** YouTube- und TikTok-Links sind Platzhalter (`href="#"`).
5. **Adobe Fonts:** Im Web-Projekt `fmt3emr` die Domain(s) freigeben (z. B. `*.vercel.app` und eure Domain).

## Instagram-Anbindung (Follower + neueste Reels)
Die Funktion `api/instagram.js` holt Follower-Zahl und die neuesten Reels von @latteschusse.
Ohne Token zeigt die Website einfach die festen Werte (3’500+ und die Beispiel-Videos).

1. Instagram-Konto auf **Business- oder Creator-Konto** umstellen (Instagram-App → Einstellungen → Kontotyp).
2. Auf developers.facebook.com eine App anlegen → Produkt **«Instagram» → «API setup with Instagram login»**.
3. Das Konto @latteschusse hinzufügen und einen **Access Token** generieren (Berechtigung `instagram_business_basic`).
4. In Vercel: Projekt → **Settings → Environment Variables** → `IG_ACCESS_TOKEN` = Token → neu deployen.
5. Der Token läuft nach **60 Tagen** ab. Verlängern (solange er gültig ist):
   `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=DEIN_TOKEN`
   und den neuen Token in Vercel ersetzen.

Daten werden 1 Stunde zwischengespeichert. Angezeigt werden Follower abgerundet auf Hunderter (z. B. 3’569 → 3’500+).

## SEO / GEO
- Titel, Beschreibung, Canonical, Open Graph pro Seite
- Strukturierte Daten (JSON-LD): Organisation, Website, Breadcrumbs, FAQ
- `sitemap.xml`, `robots.txt` (inkl. Freigabe für KI-Crawler), `llms.txt` (Kurzprofil für KI-Suchmaschinen)
- Nach dem Livegang: Google Search Console einrichten und `sitemap.xml` einreichen.

## Schriften
Titel: Roc Grotesk (Adobe Fonts, Kit `fmt3emr`), Fallback Archivo Black (selbst gehostet). Lauftext: Helvetica.
