require("dotenv").config();
const express = require("express");
const { generateURL, setCredintials, getuserData } = require("./utils/google");
const app = express();
const { PORT } = process.env;
app.use(express.json());

app.get("/auth/login/google", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      const authURL = generateURL();
      return res.redirect(authURL);
    }
    await setCredintials(code);
    const { data } = await getuserData();
    return res.json(data);
  } catch (error) {
    res.send(error);
  }
});
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
