// Vercel Serverless Function: /api/instagram
// Liefert Follower-Zahl und die neuesten Reels von @latteschusse.
// Benötigt die Umgebungsvariable IG_ACCESS_TOKEN (Instagram API mit Instagram-Login,
// Business- oder Creator-Konto). Antworten werden 1 Stunde im Vercel-CDN gecacht.
const API = 'https://graph.instagram.com/v23.0';

module.exports = async (req, res) => {
  const token = process.env.IG_ACCESS_TOKEN;
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  if (!token) {
    res.status(503).json({ error: 'IG_ACCESS_TOKEN fehlt' });
    return;
  }
  try {
    const [profileRes, mediaRes] = await Promise.all([
      fetch(`${API}/me?fields=username,followers_count,media_count&access_token=${encodeURIComponent(token)}`),
      fetch(`${API}/me/media?fields=id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,timestamp&limit=24&access_token=${encodeURIComponent(token)}`)
    ]);
    const profile = await profileRes.json();
    const media = await mediaRes.json();
    if (profile.error || media.error) {
      res.status(502).json({ error: (profile.error || media.error).message });
      return;
    }
    const videos = (media.data || [])
      .filter((m) => m.media_type === 'VIDEO' || m.media_product_type === 'REELS')
      .slice(0, 8)
      .map((m) => ({
        id: m.id,
        caption: (m.caption || '').split('\n')[0].slice(0, 90),
        thumbnail: m.thumbnail_url || m.media_url,
        permalink: m.permalink,
        timestamp: m.timestamp
      }));
    res.status(200).json({
      username: profile.username,
      followers: profile.followers_count,
      posts: profile.media_count,
      videos
    });
  } catch (e) {
    res.status(500).json({ error: 'Instagram nicht erreichbar' });
  }
};
