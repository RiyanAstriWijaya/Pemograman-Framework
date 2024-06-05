const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// module.exports = {
//   showAll: async (_, res, next) => {
//     try {
//       const response = await prisma.user.findMany();
//       if (response.length == 0) {
//         return res.status(404).json({
//           status: false,
//           message: "data not found",
//           data: response,
//         });
//       }
//       return res.json({
//         status: true,
//         message: "success",
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
//   showById: async (req, res, next) => {
//     try {
//       const response = await prisma.user.findUnique({
//         where: {
//           id: parseInt(req.params.id),
//         },
//       });

//       if (!response) {
//         return res.status(404).json({
//           status: false,
//           message: "data not found",
//           data: response,
//         });
//       }

//       return res.json({
//         status: true,
//         message: "success",
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   createuser: async (req, res, next) => {
//     try {
//       const exist = await prisma.user.findFirst({
//         where: {
//           nama_user: req.body.nama_user,
//         },
//       });

//       if (exist) {
//         return res.status(400).json({
//           status: false,
//           message: "user already exist",
//           data: exist,
//         });
//       }

//       const response = await prisma.user.create({
//         data: {
//           ...req.body,
//         },
//       });

//       return res.json({
//         status: true,
//         message: "success",
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   updateuser: async (req, res, next) => {
//     try {
//       const response = await prisma.user.update({
//         where: {
//           id: parseInt(req.params.id),
//         },
//         data: {
//           ...req.body,
//         },
//       });

//       return res.json({
//         status: true,
//         message: "success",
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   deleteuser: async (req, res, next) => {
//     try {
//       const response = await prisma.user.delete({
//         where: {
//           id: parseInt(req.params.id),
//         },
//       });

//       return res.json({
//         status: true,
//         message: "success",
//         data: response,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
