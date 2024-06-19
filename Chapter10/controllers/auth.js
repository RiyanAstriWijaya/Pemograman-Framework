const { PrismaClient } = require("@prisma/client");
const sendEmail = require("../utils/mailer");
const bcrypt = require("bcrypt");
const { decodeToken, generateToken } = require("../utils/token");
const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const existUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (existUser) {
      return res.status(400).json({
        status: false,
        message: "user already exist",
      });
    }
    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });
    const payload = user;
    delete payload.password;
    const token = generateToken(payload);
    await sendEmail(user.email, "Welcome to platform", `you have succesfully created an account, click <a href= "http://localhost:3000/verify-email?token=${token}">here</a> to verify you email`);

    return res.json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = decodeToken(token);
    const existUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (existUser) {
      await prisma.user.update({
        data: {
          hasVerified: true,
        },
        where: {
          id: existUser.id,
        },
      });
      return res.json({
        status: true,
        message: "email verified succesfully",
      });
    }
    return res.status(400).json({
      status: false,
      message: "account not found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  verifyEmail,
};
