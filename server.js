const express = require('express');
// const passport = require('passport');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = '205317426464-buddse8hhd8a20m1qb63ses6fv8poknj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const app = express();
const path = require('path');
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

const PORT = process.env.PORT || 5000;


app.set('view engine','ejs');
app.use(session({secret : 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}



app.get('/',(req,res)=>{
    res.render('index');
    
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
  app.get('/auth/google/about', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/about');
  })
app.get('/sem-1', (req,res)=>{
    res.render('sem-1',{b:a});
})

app.get('/sem-2', (req,res)=>{
    res.render('sem-2',{b:a});
})



app.get('/about',isLoggedIn, (req,res)=>{
    let user = req.user;
    res.render('about',{b:a});
})

// app.get('/logout',(req,res)=>{
//     req.logout;
//     req.session.destroy();
// })
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/")
})





app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})