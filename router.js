// import router
const router = require('express').Router();


// Controllers
const auth = require('./controllers/authController');

// Restrict middleware
const restrict = require('./middlewares/restrict');

// Homepage, this is a restricted page (must login first)
router.get('/', restrict, (req, res) => res.render('index'));

// Register Page
router.get('/register', (req, res) => res.render('register'));
router.post('/register', auth.register);

// Login Page & API
router.get('/login', (req, res) => res.render('login'));
router.post('/login', auth.login);

// Who am i page, this is a restricted page (must login first)
router.get('/whoami', restrict, auth.whoami);

module.exports = router;