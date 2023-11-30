import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3001; // Choose a port for your server

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post("/subscribe", async (req, res) => {
  const { apiKey, listId, email } = req.body;

  try {
    const response = await fetch(
      `https://a.klaviyo.com/api/v2/list/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          profiles: [
            {
              email: email,
            },
          ],
        }),
      }
    );

    const klaviyoData = await response.json();
    res.json(klaviyoData);
  } catch (error) {
    console.error("Error subscribing:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
