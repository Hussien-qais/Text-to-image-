// تثبيت الحزم: npm install express node-fetch cors
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());

const BEARER_TOKEN = "ضع_هنا_Bearer_Token"; // ضع هنا Token الخاص بك

app.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.json([]);

  try {
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(keyword)} has:images&expansions=attachments.media_keys&media.fields=url&max_results=20`;
    const response = await fetch(url, {
      headers: { "Authorization": `Bearer ${BEARER_TOKEN}` }
    });
    const data = await response.json();

    const media = data.includes?.media || [];
    const imageUrls = media.map(m => m.url).filter(Boolean);

    res.json(imageUrls);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
