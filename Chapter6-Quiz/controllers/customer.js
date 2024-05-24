const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    creat : async (req, res, next) => {
        try {
            const exist = await prisma.customer.findFirst({
                where: {
                    nama_customer : req.body.nama_customer
                }
            });
            if (exist) {
                res.status(400).json({
                    status: false,
                    message: 'Data Sudah Ada Di Database',
                    data: exist
                });
                return;
            }
            const response = await prisma.customer.create({
                data: {
                    ...req.body
                }
            });
            res.json({
                status: true,
                message: 'Data Berhasil Di Tambah',
                data: response
            })
        } catch (error) {
            next(error);
        }
    },
    showAll : async (req, res, next) => {
        try {
            const response = await prisma.customer.findMany();
            if (response.length == 0) {
                res.status(400).json({
                    status: false,
                    message: 'Data Masih Kosong',
                    data: response
                });
                return;
            }
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: response
            })
        } catch (error) {
            next(error);
        }
    },
    showById : async (req, res, next) => {
        try {
            const response = await prisma.customer.findUnique({
                where: {
                    id : parseInt(req.params.id)
                }
            });
            if (!response) {
                res.status(400).json({
                    status: false,
                    message: 'Data Tidak Di Temukan',
                    data: response
                });
                return;
            }
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: response
            })
        } catch (error) {
            next(error);
        }
    },
    update : async (req, res, next) => {
        try {
            const response = await prisma.customer.update({
                where: {
                    id : parseInt(req.params.id)
                },
                data: {
                    ...req.body
                }
            });
            res.json({
                status: true,
                message: 'Data Berhasil Di Update',
                data: response
            })
        } catch (error) {
            next(error);
        }
    },
    delete : async (req, res, next) => {
        try {
            const response = await prisma.customer.delete({
                where: {
                    id : parseInt(req.params.id)
                }
            });
            res.json({
                status: true,
                message: 'Data Berhasil Di Delete',
                data: response
            })
        } catch (error) {
            next(error);
        }
    },
    customerBeli : async (req, res, next) => {
        try {
            const response = await prisma.customer.findMany({
                include:{
                    transaksi: true
                }
            });
            const customerTransaksi = response.map(customer => {
                const totalPembelian = customer.transaksi.reduce((sum, transaksi) => sum + transaksi.total_pembelian, 0);
                return {
                  name: customer.nama_customer,
                  total_pembelian: totalPembelian
                };
              });
            
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: customerTransaksi
            })
        } catch (error) {
            next(error);
        }
    },
    customerTop : async (req, res, next) => {
        try {
            const response = await prisma.customer.findMany({
                include:{
                    transaksi: {
                        include: {
                            detail_transaksi: true
                        }
                    }
                }
            });
            const customerTotals = response.map(customer => {
                const totalPembelian = customer.transaksi.reduce((sum, transaksi) => sum + transaksi.total_pembelian, 0);
                const totalItem = customer.transaksi.reduce((sum, transaksi) => 
                    sum + transaksi.detail_transaksi.reduce((detailSum, detail) => detailSum + ((detail.id_product - (detail.id_product-1))*detail.jumlah), 0), 0);
                return {
                  name: customer.nama_customer,
                  jumlah_item: totalItem,
                  total_pembelian: totalPembelian
                };
            });
          
            const customerTop = customerTotals.sort((a, b) => b.total_pembelian - a.total_pembelian).slice(0, 3);
            
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: customerTop
            })
        } catch (error) {
            next(error);
        }
    },
    averageAge : async (req, res, next) => {
        try {
            const response = await prisma.customer.findMany({
                where: {
                    transaksi: {
                        some:{}
                    }
                },
                select: {
                    umur: true
                }
            });
            const totalumur = response.reduce((sum, customer) => sum + customer.umur, 0);
            const rataUmur = response.length > 0 ? totalumur / response.length : 0;
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: rataUmur
            })
        } catch (error) {
            next(error);
        }
    },
    customerGender : async (req, res, next) => {
        try {
            const response = await prisma.customer.groupBy({
                by: ['jenis_kelamin'],
                _count: {
                    jenis_kelamin: true
                },
                orderBy: {
                    _count: {
                        jenis_kelamin: 'desc'
                    }
                },
                where: {
                    transaksi: {
                        some:{}
                    }
                }
            });
            const topJk = response[0]
    
            res.json({
                status: true,
                message: 'Data Berhasil Di Tampilkan',
                data: {
                    jenis_kelamin : topJk.jenis_kelamin,
                    frekunsi_pembelian : topJk._count.jenis_kelamin
                }
            })
        } catch (error) {
            next(error);
        }
    }
}