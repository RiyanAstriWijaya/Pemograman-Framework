const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  creat: async (req, res, next) => {
    try {
      const exist = await prisma.product.findFirst({
        where: {
          nama_product: req.body.nama_product,
        },
      });
      if (exist) {
        res.status(400).json({
          status: false,
          message: "Data Sudah Ada Di Database",
          data: exist,
        });
        return;
      }
      const response = await prisma.product.create({
        data: {
          ...req.body,
        },
      });
      res.json({
        status: true,
        message: "Data Berhasil Di Tambah",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  showAll: async (req, res, next) => {
    try {
      const response = await prisma.product.findMany();
      if (response.length == 0) {
        res.status(400).json({
          status: false,
          message: "Data Masih Kosong",
          data: response,
        });
        return;
      }
      res.json({
        status: true,
        message: "Data Berhasil Di Tampilkan",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  showById: async (req, res, next) => {
    try {
      const response = await prisma.product.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!response) {
        res.status(400).json({
          status: false,
          message: "Data Tidak Di Temukan",
          data: response,
        });
        return;
      }
      res.json({
        status: true,
        message: "Data Berhasil Di Tampilkan",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const response = await prisma.product.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      res.json({
        status: true,
        message: "Data Berhasil Di Update",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const response = await prisma.product.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json({
        status: true,
        message: "Data Berhasil Di Delete",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  productFavorit: async (req, res, next) => {
    try {
      const response = await prisma.product.findMany({
        include: {
          detail_transaksi: true,
        },
      });
      const dataProduk = response
        .map((product) => {
          const jumlahFrekuensi = product.detail_transaksi.length;
          const totalPembelian = product.detail_transaksi.reduce((sum, detail) => sum + detail.jumlah * product.harga, 0);

          return {
            name: product.nama_product,
            jumlah_frekuensi: jumlahFrekuensi,
            total_pembelian: totalPembelian,
          };
        })
        .sort((a, b) => b.jumlah_frekuensi - a.jumlah_frekuensi)[0];

      res.json({
        status: true,
        message: "Data Berhasil Di Tampilkan",
        data: dataProduk,
      });
    } catch (error) {
      next(error);
    }
  },
  productKurangLima: async (req, res, next) => {
    try {
      const response = await prisma.product.findMany({
        where: {
          stok: {
            lt: 5,
          },
        },
        include: {
          detail_transaksi: true,
        },
      });
      const produkDipilih = response.filter((product) => product.detail_transaksi.length > 0);

      res.json({
        status: true,
        message: "Data Berhasil Di Tampilkan",
        data: produkDipilih,
      });
    } catch (error) {
      next(error);
    }
  },
};
