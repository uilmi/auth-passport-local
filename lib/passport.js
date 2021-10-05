const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

/* Fungsi untuk pengecekan username & password */
async function verify(username, password, done) {
    try {
        // Memanggil fungi authenticate yang ada di model
        const user = await User.authenticate({ username, password });
        /*
          done adalah callback, parameter pertamanya adalah error,
          jika tidak ada error, maka kita beri null saja.
          Parameter keduanya adalah data yang nantinya dapat
          kita akses di dalam req.user */
        console.log(user);
        return done(null, user);
    }
    catch (err) {
        /* Parameter ketiga akan dilempar ke dalam flash */
        // Walaupun error, parameter pertama tetap null, tujuannya agar eksekusi tetap berjalan normal namun pesan error akan diteruskan ke flash
        console.log(err.message);
        return done(null, false, { message: err.message });
    }
}

// Gunakan local auth, username & field dibuat sebagai object & dioper sebagai parameter pertama
// object tersebut akan dicek dengan fungsi yang dioper ke parameter kedua, yaitu fungsi verify
passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, verify)
);

/* Serialize dan Deserialize
  Cara untuk membuat sesi dan menghapus sesi
*/

// user.id akan disimpan ke session, nantinya akan dioper ke deserialize
passport.serializeUser(
    (user, done) => done(null, user.id)
);

// user.id yang dioper ke seini akan diterima & digunakan untuk mencari user berdasar primary key (findByPk)
// nantinya jika data ditemukan, akan dioper ke req.user
passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
);

// referensi: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;