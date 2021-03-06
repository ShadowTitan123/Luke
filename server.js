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
const renameExtension = require('rename-extension')
var bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// setting destination path
app.use(multer({ dest: __dirname + '/Files/' }).any());


// SET STORAGE and specify destination
var storage = multer.diskStorage({
  destination: function (req, file, cb) {   // destination
    cb(null, './Files')
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '.txt')
    let ext = mime.extension(file.mimetype);  // set filename
    cb(null, Date.now() + ext ) //Appending extension
  }
})

//Init Upload
var upload = multer({ storage: storage })   // specify .single() or array() if more images 


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

app.get('/Admindashboard.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/Admindashboard.html");
});
app.get('/Adminalerts.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/Adminalerts.html");
});
app.get('/Admincontact.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/Admincontact.html");
});
app.get('/Adminenquries.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/Adminenquries.html");
});
app.get('/Adminusefullinks.html', sessionHandler, (req, res) => {
  res.sendFile(__dirname + "/public/admin/Adminusefullinks.html");
});


// Access To All Static Files
// making these files public 

app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'Files')));
app.use(express.static(path.join(__dirname, "public/main")));




//Api and Admin Panel Routes (GET)
app.get('/api/test', routeHandler);
app.get('/api/test2', routeHandler);
app.get('/api/GetAllAlerts', routeHandler);
app.get('/api/GetAllEnquiries', routeHandler);
app.get('/api/GetAlertById/:id',routeHandler);
app.get('/api/GetAllContactDetails',routeHandler);
app.get('/Logout', routeHandler);
app.get('/Files/GetAlert/:id', routeHandler);
app.get('/getCurrentAdmin',routeHandler);
app.get('/api/GetAllLinks',routeHandler);
app.get('/api/GetLinkById/:id',routeHandler);
app.get('/api/GetHomepageCounts',routeHandler);


//Api and Admin Panel Routes (POST)
app.post('/LoginAdmin', routeHandler);
app.post('/UploadAlertFile', routeHandler);
app.post('/StoreAlertDetails', routeHandler);
app.post('/UpdateAlert', routeHandler);
app.post('/UpdateContact', routeHandler);
app.post('/UpdateLink', routeHandler);
app.post('/AddLink', routeHandler);


//Api and Admin Panel Routes (Delete)
app.delete('/DeleteAlert', routeHandler);
app.delete('/DeleteEnquiry', routeHandler);
app.delete('/DeleteLink', routeHandler);


//Api and Main Site Routes (GET)
app.get('/fetchAllAlerts', routeHandler);
app.get("/fetchAllLinks", routeHandler);

//Api and Main Site Routes (POST)
app.post("/userEnquiries", routeHandler);


// PORT 
app.listen(PORT, () => {
  console.log(`App Running in Port ${PORT}`);
});