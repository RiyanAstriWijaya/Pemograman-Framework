const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { creatToken, decodeToken } = require("../helpers/token");
const bcrypt = require("bcrypt");
const axios = require("axios");

const loginSimat = async (req, res, next) => {
  try {
    const { nim, password } = req.body;
    const response = await axios.post(
      "https://api.unira.ac.id/v1/token",
      {
        username: nim,
        password,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const response2 = await axios.get("https://api.unira.ac.id/v1/saya", {
      headers: {
        Authorization: "Bearer " + response.data.data.attributes.access,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: response2.data.data.id,
        email: response2.data.data.attributes.email,
        password: bcrypt.hashSync(password, 10),
        thumbnail: response2.data.data.attributes.thumbnail,
        role: response2.data.data.attributes.type,
      },
    });
    return res.json({
      status: true,
      message: "Berhasil login",
      data: response2.data,
      datainput: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // const usernya = 'riski';
    // const passwordnya = bcrypt.hashSync('123', 10);

    const { email, password } = req.body;

    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existUser) {
      return res.status(404).json({
        status: false,
        message: "User tidak di temukan",
      });
    }

    const validUser = bcrypt.compareSync(password, existUser.password);

    if (!validUser) {
      return res.status(400).json({
        status: false,
        message: "Password salah",
      });
    }

    const payload = existUser;
    delete payload.id;
    delete payload.password;
    delete payload.updateAt;
    delete payload.createdAt;

    return res.json({
      status: false,
      message: "Berhasil login",
      token: creatToken(payload),
    });
  } catch (error) {
    next(error);
  }
};

const saya = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const validation = decodeToken(token);
    return res.json(validation);
  } catch (error) {
    next(error);
  }
};

const registration = async (req, res, next) => {
  try {
    const body = req.body;
    validationBodyRegist(res, body);
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
      },
    });

    return res.status(201).json({
      status: true,
      message: "Data user berhasil ditambah",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

function validationBodyRegist(res, body) {
  if (body.password == "" || body.password == undefined || body.password == null) {
    return res.status(400).json({
      status: false,
      message: "Password tidak boleh kosong",
    });
  }

  if (body.email == "" || body.email == undefined || body.email == null) {
    return res.status(400).json({
      status: false,
      message: "Email tidak boleh kosong",
    });
  }

  if (body.username == "" || body.username == undefined || body.username == null) {
    return res.status(400).json({
      status: false,
      message: "Username tidak boleh kosong",
    });
  }
}

module.exports = {
  login,
  saya,
  registration,
  loginSimat,
};
