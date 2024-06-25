const nodemailer = require('nodemailer');
const {GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, EMAIL} = process.env;
const {google} = require('googleapis');
const {text} = require('express');

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken
    }
});

const sendEmail = async (to, subject, text) =>{
    const mailoptions = {
        from: EMAIL,
        to,
        subject,
        html: text
    };

    transporter.sendMail(mailoptions, (error, info) =>{
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId);
    })
}

module.exports = sendEmail;