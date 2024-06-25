require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const app = express();
const {generateURL, setCredentials, getuserData} = require('./utils/google');
const {generateToken, decodeToken} = require('./utils/token');
const sendEmail = require('./utils/mailer');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


app.use(express.json());

app.get('/auth/login/google', async(req, res)=>{
    try {
        const code = req.query.code;
        if (!code) {
            const authURL = generateURL();
            return res.redirect(authURL);
        }

        await setCredentials(code);
        const {data} = await getuserData();
        
        const user = await prisma.user.create({
            data: {
                id: data.id,
                email: data.email,
                name: data.name,
                given_name: data.given_name,
                family_name: data.family_name,
                picture: data.picture
            }
        });

        const payload = user;
        delete payload.id;

        const token = generateToken(payload);

        await sendEmail(user.email, 'Welcome to our platform', `You have successfully created an account, <a href="http://localhost:3000/verify-email?token=${token}">here</a> to verify your email`);

        return res.json({
            status: true,
            message: 'User created successfully, please verify via the link sent to your email'
        })
    } catch (error) {
        res.send(error);
    }
});

app.get('/verify-email', async (req, res) =>{
    try {
        const token = req.query.token;
        const user = decodeToken(token);

        const existUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        });

        if (existUser) {
            await prisma.user.update({
                data: {
                    verified_email: true
                },
                where: {
                    id: existUser.id
                }
            });
            return res.json({
                status: true,
                message: 'Email verified successfully'
            });
        }
        return res.status(400).json({
            status: false,
            message: 'Account not found'
        })
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, ()=>{
    console.log('Server Runing on port '+PORT);
});