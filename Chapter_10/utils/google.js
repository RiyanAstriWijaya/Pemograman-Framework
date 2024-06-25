require("dotenv").config();
const { google } = require("googleapis");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
//const express
const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

const generateURL = () => {
  const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];

  const authURL = oauth2Client.generateAuthUrl({
    access_type: "offline",
    response_type: "code",
    scope: scopes,
  });

  return authURL;
};

const setCredentials = async (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      resolve(tokens);
    } catch (error) {
      reject(error);
    }
  });
};

const getuserData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });
      oauth2.userinfo.get((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateURL,
  setCredentials,
  getuserData,
};
