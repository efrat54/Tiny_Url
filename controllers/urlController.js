import Url from '../models/url';
import shortid from 'shortid';
import validUrl from 'valid-url';

async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const shortUrl = shortid.generate();
    const newUrl = new Url({
      originalUrl,
      shortUrl
    });

    await newUrl.save();
    res.json({ originalUrl: newUrl.originalUrl, shortUrl: `http://localhost:3000/${newUrl.shortUrl}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function redirectToOriginal(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getStats(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      return res.json({ originalUrl: url.originalUrl, shortUrl: `http://localhost:3000/${url.shortUrl}`, clicks: url.clicks });
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { shortenUrl, redirectToOriginal, getStats };