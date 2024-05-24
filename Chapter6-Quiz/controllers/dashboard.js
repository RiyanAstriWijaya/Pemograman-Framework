const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    dashboard : async (req, res, next) => {
        try {
            const totalPembelian = await prisma.transaksi.aggregate({
                _sum: {
                  total_pembelian: true,
                },
              });
            const totalProduk = await prisma.product.count();
            const totalCustomer = await prisma.customer.count();
            const totalProdukKurang = await prisma.product.count({
               where: {
                 stok: {
                   lt: 5,
                 },
               },
            });
          
            const produkFavorit = await prisma.product.findMany({
               include: {
                 detail_transaksi: true,
               },
            });
            const produkFavoritData = produkFavorit.map((product) => ({
                id: product.id,
                name: product.nama_product,
                jumlah_frekuensi: product.detail_transaksi.length,
            })).sort((a, b) => b.jumlah_frekuensi - a.jumlah_frekuensi)[0];
          
            const dashboardData = {
                total_pembelian: totalPembelian._sum.total_pembelian || 0,
                total_produk: totalProduk,
                total_customer: totalCustomer,
                total_produk_kurang: totalProdukKurang,
                produk_favorit: produkFavoritData,
            };
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: dashboardData
            })
        } catch (error) {
            next(error);
        }
    }
}