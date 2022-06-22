const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = '205317426464-buddse8hhd8a20m1qb63ses6fv8poknj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


var a = '';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/about"
  },
  function(accessToken, refreshToken, profile, cb) {
    a = profile.photos[0].value
   return cb(null,profile);
    a = profile.photos[0].value
    }
));

passport.serializeUser(function(user,cb){
    cb(null, user);
});

passport.deserializeUser(function(user,cb){
    cb(null, user);
});