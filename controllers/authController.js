const { User } = require('../models');
const passport = require('../lib/passport');

module.exports = {
    register: (req, res, next) => {
        // Kita panggil static method register yang sudah kita buat tadi
        User.register(req.body)
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => next(err));
    },

    // memanggil fungsi authenticate bawaan passportjs
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true // Untuk mengaktifkan express flash
    }),

    whoami: (req, res) => {
        /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
        res.render('profile', req.user.dataValues);
    }
}