const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const dbConfig = require('../Db/dbConfig');
var multer = require('multer');


// API Tests

router.get('/api/test', (req, res) => {
  dbConfig.query('SELECT * FROM tbl_admin', function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  });

});

router.get('/api/test2', (req, res) => {
  console.log(req.session.id);
});


//Logout

router.get('/Logout', (req, res) => {

  console.log(req.session.user);
  req.session.destroy(function (err) {
    console.log('session destroyed');
    res.redirect('/');
  })
});


//Login Route

router.post('/LoginAdmin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = 'SELECT * FROM tbl_admin WHERE email_id = ? and password = ?';
  dbConfig.query(findUser, [email, password], function (err, result, fields) {
    if (err) throw err
    else if (result.length > 0) {
      console.log(result);
      req.session.user = email;
      req.session.save();
      const isAuth = {
        user: result[0].admin_name,
        Exists: true
      }
      // res.redirect('/dashboard.html')
      res.json(isAuth);
    } else {
      const isAuth = {
        message: 'User Not Found / Incorrect Password',
        Exists: false
      }
      res.json(isAuth);
    }


  });
});


//File Upload 

router.post("/UploadAlertFile", (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.dir(req.files); // uploading file
  const file_Arr = req.files;
  const file_obj = {
    filename: file_Arr[0].originalname,
    modified: file_Arr[0].filename,
    path: file_Arr[0].path
  }

  res.json(file_obj);

});

//File Details Upload

router.post("/StoreAlertDetails", (req, res) => {
  const title = req.body.title;
  const path = req.body.path;
  const newfile = req.body.newFileName;
  const date = req.body.date;


  console.log(title + path + newfile + date);
  const AddAlert = 'INSERT INTO `tbl_alerts` (`alert_title`, `alert_Date`, `alert_file_path`, `alert_original_file_name`) VALUES (?,?,?,?);';
  dbConfig.query(AddAlert, [title, date, path, newfile], function (err, result, fields) {
    if (err){throw err} 

    else if (result) {
     // console.log(result);
      const Message = {
        message: `Alert - ${title} Inserted Successfully`,
        status: true
      }
      res.json(Message);
    }
    else {
      const Message = {
        message: `Alert - ${title} Failed to Insert`,
        status: false
      }
      res.json(Message);
    }
  });
  

  });



//Get All Alerts
  router.get('/api/GetAllAlerts', (req, res) => {
    dbConfig.query('SELECT * FROM tbl_alerts', function (err, rows, fields) {
      if (err) throw err
      res.json(rows);
    });
  
  });




  module.exports = router;