const express = require('express');
const router = express.Router();
var mysql = require('mysql')
const dbConfig = require('../Db/dbConfig');


router.get('/api/test',(req, res)=>{
    dbConfig.query('SELECT * FROM tbl_admin', function (err, rows, fields) {
    if (err) throw err
   res.json(rows);
  });

});


router.get('/api/test2',(req, res)=>{
    console.log('api test2');
});


module.exports = router;