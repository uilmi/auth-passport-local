module.exports = (req, res, next) => {
    // Bila request berasal dari user yang terautentikasi,
    // maka kita akan lanjut menjalankan handler berikutnya

    // isAuthenticated adalah bawaan passportjs, tidak bisa diganti nama
    // fungsi ini akan mengecek apakah req.user kosong atau tidak, jika tidak akan mereturn true
    // req.user juga dioper secara otomatis oleh passportjs melalui session 
    if (req.isAuthenticated()) {
        return next();
    }

    // referensi: https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74

    // Bila tidak, kita akan redirect ke halaman login
    res.redirect('/login');
}