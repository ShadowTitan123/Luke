const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000 ; 
const routeHandler = require('./routes/api');
app.use(express.static(path.join(__dirname,'public')));

//Database Connection
const dbConfig = require('./Db/dbConfig');



//Api Routes 
app.get('/api/test',routeHandler);
app.get('/api/test2',routeHandler);


app.listen(PORT,()=>{
    console.log(`App Running in Port ${PORT}`);
});