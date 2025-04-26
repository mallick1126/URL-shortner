import shortid from "shortid";
import { URL } from "url";
import Url from "../model/url.model.js"; 

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "long url required" });
  }

  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: "Invalid long URL format" });
  }

  try {
    const existingUrl = await Url.findOne({ url:longUrl });
    if (existingUrl) {
      return res.status(200).json({ message: "Url already exists", shortUrl: existingUrl.shortUrl });
    }

    const shortId = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

    const newUrl = new Url({ url:longUrl, shortUrl, shortId });
    await newUrl.save();

    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error:", error); 
    return res.status(500).json({ error: "Server error" });
  }
};

export const getOriginalUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    urlDoc.clicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.url);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};



