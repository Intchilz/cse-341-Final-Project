const router = require('express').Router();
const passport = require('passport');

// ---------------------------
// ✅ Swagger Route
// ---------------------------
router.use('/', require('./swagger'));

// ---------------------------
// ✅ Root Test Route
// ---------------------------
router.get('/hello', (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send('Hello, World!');
});

// ---------------------------
// ✅ GitHub OAuth Routes
// ---------------------------
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// ---------------------------
// ✅ Root Route (Login Status)
// ---------------------------
router.get('/', (req, res) => {
  if (req.user) {
    res.send(`Logged in as ${req.user.username}`);
  } else {
    res.send('Logged out');
  }
});

// ---------------------------
// ✅ API Routes
// ---------------------------
router.use('/administration', require('./admistration'));
router.use('/teachers', require('./teachers'));
router.use('/subjects', require('./subjects'));
router.use('/pupils', require('./pupils'));

module.exports = router;
