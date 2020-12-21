const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const routeHandler = require('./routes/api');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');


app.use(multer({dest:__dirname+'/Files/'}).any());  // setting destination path


// SET STORAGE
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


function sessionHandler(req, res, next) {
  

  if (req.session.user){
        console.log('session set')
        console.log(req.session.user);
        next();
      }else{

        console.log('redirect issue here ');
        res.redirect('/');
      }

}

 //app.use(sessionHandler);  // cant do this as middleware checks for "/" root too 

 //Setting Middleware for All pages 
 app.get('/dashboard.html',sessionHandler, (req, res)=>{
  res.sendFile(__dirname +"/public/admin/dashboard.html");
});
app.get('/alerts.html',sessionHandler, (req, res)=>{
  res.sendFile(__dirname +"/public/admin/alerts.html");
});
app.get('/contact.html',sessionHandler, (req, res)=>{
  res.sendFile(__dirname +"/public/admin/contact.html");
});
app.get('/enquries.html',sessionHandler, (req, res)=>{
  res.sendFile(__dirname +"/public/admin/enquries.html");
});
app.get('/usefullinks.html',sessionHandler, (req, res)=>{
  res.sendFile(__dirname +"/public/admin/usefullinks.html");
});




 app.use(express.static(path.join(__dirname, 'public/admin')));





//Api Routes 
app.get('/api/test', routeHandler);
app.get('/api/test2', routeHandler);
app.post('/LoginAdmin', routeHandler);
app.post('/UploadAlertFile', routeHandler);
app.post('/StoreAlertDetails', routeHandler);

app.get('/Logout', routeHandler);










app.listen(PORT, () => {
  console.log(`App Running in Port ${PORT}`);
});