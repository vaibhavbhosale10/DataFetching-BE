const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); //npm i dotenv

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/bitcoin", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
