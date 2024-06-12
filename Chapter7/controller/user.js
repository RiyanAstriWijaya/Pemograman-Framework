const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { creatToken, decodeToken } = require("../helpers/token");
module.exports = {
  create: async (req, res, next) => {
    try {
      const { username, password, type } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const response = await prisma.user.create({
        data: {
          username,
          type,
          password: hashedPassword,
        },
      });
      res.status(200).json({
        status: true,
        message: "Data Berhasil Di Simpan",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const response = await prisma.user.findMany();
      if (response.length == 0) {
        res.status(400).json({
          status: false,
          message: "Tidak ada data",
          data: response,
        });
      }
      res.status(200).json({
        status: true,
        message: "Data Berhasil Di Ambil",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  showId: async (req, res, next) => {
    try {
      const response = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!response) {
        res.status(400).json({
          status: false,
          message: "Data tidak di temukan",
          data: response,
        });
      }
      res.status(200).json({
        status: true,
        message: "Data Berhasil Di Ambil",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { username, password, type } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const response = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          username,
          type,
          password: hashedPassword,
        },
      });
      res.status(200).json({
        status: true,
        message: "Update success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const response = await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json({
        status: true,
        message: "Delete success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "Username Tidak Di temukan",
        });
      }
      const validasiPass = bcrypt.compareSync(password, user.password);
      if (!validasiPass) {
        return res.status(400).json({
          status: false,
          message: "Password Salah",
        });
      }
      const token = creatToken({ username: user.username, type: user.type });
      return res.json({
        status: true,
        message: "Login Sukses",
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
  token: async (req, res, next) => {
    try {
      const { token } = req.body;
      const validation = decodeToken(token);
      return res.json(validation);
    } catch (error) {
      next(error);
    }
  },
};
