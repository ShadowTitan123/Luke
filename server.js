// Imports 

const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
const routeHandler = require('./routes/api');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');

// setting destination path
app.use(multer({ dest: __dirname + '/Files/' }).any());


// SET STORAGE FOR MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

//Database Connection
const dbConfig = require('./Db/dbConfig');

app.use(express.json());       // to support JSON-encoded bodies
// for getting post - bodies 


var options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cbwqzpst_luke'
};

var sessionStore = new MySQLStore(options);

app.use(cookieParser('session_cookie_secret')); // any string ex: 'keyboard cat'

app.use(session({
  secret: "session_secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore,
}))

//Session Middleware For Checking Current Session
function sessionHandler(req, res, next) {


  if (req.session.user) {
    console.log('session set')
    console.log(req.session.user);
    next();
  } else {

    console.log(' Not Authenticated - Redirecting Now.... ');
    res.redirect('/');
  }

}

//app.use(sessionHandler);  // cant do this as middleware as it checks for "/" root too 

//Setting Middleware for All Admin pages 

app.get('/dashboard.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/dashboard.html");
});
app.get('/alerts.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/alerts.html");
});
app.get('/contact.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/contact.html");
});
app.get('/enquries.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/enquries.html");
});
app.get('/usefullinks.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/usefullinks.html");
});


// Access To All Static Files

app.use(express.static(path.join(__dirname, 'public/admin')));





//Api and Admin Panel Routes (GET)
app.get('/api/test', routeHandler);
app.get('/api/test2', routeHandler);
app.get('/Logout', routeHandler);


//Api and Admin Panel Routes (POST)
app.post('/LoginAdmin', routeHandler);
app.post('/UploadAlertFile', routeHandler);
app.post('/StoreAlertDetails', routeHandler);




// PORT 
app.listen(PORT, () => {
  console.log(`App Running in Port ${PORT}`);
});