const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config(); // ensure environment variables are loaded

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------
// ✅ GitHub OAuth Setup
// ---------------------------
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'https://cse-341-final-project-tb2p.onrender.com/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ---------------------------
// ✅ Session & Passport Middleware
// ---------------------------
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// ---------------------------
// ✅ Middleware to parse JSON request bodies
// ---------------------------
app.use(bodyParser.json());

// ---------------------------
// ✅ CORS Middleware
// ---------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// ---------------------------
// ✅ Main Routes (handled in routes/index.js)
// ---------------------------
app.use('/', require('./routes'));

// ---------------------------
// ✅ Global Error Handler
// ---------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;

// ---------------------------
// ✅ Database Initialization
// ---------------------------
mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});
