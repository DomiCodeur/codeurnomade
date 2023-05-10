require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.post("/get_token", async (req, res) => {
  const tokenUrl =
    "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire";
  const clientId = process.env.POLE_EMPLOI_CLIENT_ID;
  const clientSecret = process.env.POLE_EMPLOI_CLIENT_SECRET;
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
