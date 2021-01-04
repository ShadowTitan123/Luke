const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const dbConfig = require('../Db/dbConfig');
var multer = require('multer');
const renameExtension = require('rename-extension')
const fs = require('fs');
const path = require('path');
const { json } = require('express');





// SET STORAGE FOR MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Files')
  },
  filename: function (req, file, cb) {

    let ext = mime.extension(file.mimetype);
    cb(null, Date.now() + ext) //Appending extension
  }
})

var upload = multer({ storage: storage })

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
      req.session.user = email; // setting session user
      req.session.save();  // save session
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

router.post("/UploadAlertFile", upload.single("file"), (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.dir(req.files, 'file'); // uploading file
  const file_Arr = req.files;   // req.file contains all data of file after uploading from form
  const file_obj = {
    filename: file_Arr[0].originalname,
    modified: file_Arr[0].filename,
    path: file_Arr[0].path
  }
  fs.rename('./Files/' + file_Arr[0].filename, './Files/' + file_Arr[0].filename + '.txt', function (err) {
    if (err) console.log('ERROR: ' + err);
  });

  res.json(file_obj);

});

//File Details Upload

router.post("/StoreAlertDetails", (req, res) => {
  const title = req.body.title;
  const path = req.body.path;
  const newfile = req.body.newFileName;
  const date = req.body.date;
  const serverPath = 'http://localhost:5000/' + req.body.serverPath + '.txt';


  console.log(title + path + newfile + date);
  const AddAlert = 'INSERT INTO `tbl_alerts` (`alert_title`, `alert_Date`, `alert_file_path`, `alert_original_file_name`) VALUES (?,?,?,?);';
  dbConfig.query(AddAlert, [title, date, serverPath, newfile], function (err, result, fields) {
    if (err) { throw err }

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

//Get Single Alert By Id

router.get('/api/GetAlertById/:id', (req, res) => {
  const alert = req.params.id;
  const query = 'SELECT * FROM tbl_alerts WHERE id = ?'
  dbConfig.query(query, [alert], function (err, rows, fields) {
    if (err) throw err
    else if (rows.length > 0) {
      const message = {
        message: 'Data Found',
        exists: true,
        data: rows
      }
      res.json(message);
    } else {
      const message = {
        message: 'Data Not Found',
        exists: false,
        data: []
      }
      res.json(message);
    }
  });

});


//Delete Single Alert

router.delete('/DeleteAlert', (req, res) => {
  const alertId = req.body.alertId;
  const findUser = 'DELETE from tbl_alerts where id = ? ';
  dbConfig.query(findUser, [alertId], function (err, result, fields) {
    if (err) throw err
    else if (result.affectedRows > 0) {
      console.log(result);
      const Message = {
        message: "Alert Deleted",
        status: true
      }
      res.json(Message);
    } else {
      console.log(result);
      const Message = {
        message: "Alert Not Deleted",
        status: false
      }
      res.json(Message);
    }


  });
});


// Get Single Alert File

router.get('/getCurrentAdmin', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ admin_name: req.session.user });
  } else {
    res.status(401).json({ Message: 'Not Authorized' });
  }


});


router.post("/UpdateAlert", (req, res) => {
  const Title = req.body.Title;
  const AlertDate = req.body.AlertDate;
  const FileContent = req.body.FileContent;
  const AlertID = req.body.AlertID;
  const query = 'SELECT * FROM tbl_alerts WHERE id = ?';  // get the filepath using alert id
  dbConfig.query(query, [AlertID], function (err, rows, fields) {
    if (err) {
      const message = {
        message: 'Invalid Alert ID',
        Help: 'Contact Admin',
        error: err.message,
        status: false
      };
      throw err
      res.status(404).json(message); // Alert id Not Found 
    }
    else if (rows.length > 0) {  // if filepath found
      var getFilePath = rows[0].alert_file_path;
      var filename = getFilePath.split('/').pop().split('#')[0].split('?')[0];  // Remove the base url and Fetch Filename
      console.log(filename);
      fs.readFile('./Files/' + filename, 'utf-8', function (err, data) {  // find file in given directory`
        if (err) {
          const message = {
            message: 'File Not Found In Our Database',
            Help: 'Contact Admin',
            status: false
          };
          throw err;
          res.status(404).json(message);  // Throw - Not Found error
        }
        var newValue = FileContent;  // Replace with New Content
        fs.writeFile('./Files/' + filename, newValue, 'utf-8', function (err, data) {  // Write the New Content into existing file 
          if (err) {
            const message = {
              message: 'File Found But Failed To Modify Content',
              Help: 'Contact Admin',
              error: err.message,
              status: false
            };
            throw err;
            res.status(500).json(message); // File Not Found 
          }
          const query2 = 'UPDATE `tbl_alerts` SET `alert_title` = ? , alert_Date = ? where id = ?';
          dbConfig.query(query2, [Title, AlertDate, AlertID], function (err, result, fields) {
            if (err) {
              const message = {
                error: err.message,
                status: false
              };
              throw err
              res.status(500).json(message); // Query Error
            }
            else if (result.affectedRows > 0) {  // if data gets updated
              const message = {
                message: "Alert Details Updated Successfully",
                status: true
              }
              console.log('Done!');
              res.status(201).json(message);  // Updated successfully : 201 - The request has succeeded and a new resource has been created as a result. 
            }
          })
        })
      })
    }
  });

});





module.exports = router;