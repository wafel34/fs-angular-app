var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    databaseURL = 'mongodb://localhost:27017/fs-app-database',
    path = require('path'),
    createExpressApp = require('./create-express-app');

MongoClient.connect(databaseURL, (err, db)=>{
    if (err) {
        console.log(err);
        return;
    }

    console.log('connected to database');

    createExpressApp(db)
        .listen(3000, ()=>{
            console.log('server listening on port 3000');
        });
});
