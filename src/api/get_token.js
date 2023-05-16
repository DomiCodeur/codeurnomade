require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
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
};
