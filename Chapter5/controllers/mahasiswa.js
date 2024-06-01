module.exports = {
  getMahasiswa: async function(req, res, next) {
    const nama = req.body.username;
    const password = req.body.password;

    return res.json({
      data: {
        nama: nama,
        password: password
      }
    })

  }
}
///////////////////////////
const getMahasiswa = async function(req, res, next) {

}

module.exports = {
  getMahasiswa
}