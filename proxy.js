require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

// Route pour obtenir le token
app.post("/api/get_token", async (req, res) => {
  console.log("on est dans api gettoken");
  const tokenUrl =
    "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";
  const clientId = process.env.VITE_POLE_EMPLOI_CLIENT_ID;
  const clientSecret = process.env.VITE_POLE_EMPLOI_CLIENT_SECRET;
  const grantType = "client_credentials";
  const scope = "api_offresdemploiv2 o2dsoffre";

  try {
    const response = await axios.post(tokenUrl, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        scope: scope,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching token" });
  }
});

// Route pour faire des requêtes à l'API France travail
app.all("/api/*", async (req, res) => {
  try {
    // L'URL de base de l'API France travail
    const apiBaseUrl =
      "https://api.emploi-store.fr/partenaire/offresdemploi/v2";

    const response = await axios.request({
      url: req.originalUrl.replace(/^\/api/, ""),
      method: req.method,
      baseURL: apiBaseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...req.headers,
      },
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error forwarding request" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
