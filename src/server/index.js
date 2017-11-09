var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    database;

require('dotenv').config();


MongoClient.connect(process.env.DB_CONN, (err, db)=>{
    console.log('connected to database');

    app.listen(3000, ()=>{
        database = db;
        console.log('server listening on port 3000');
    });
});


app.use('/api/contacts', (req, res)=>{
    var contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs)=>{
        console.log(docs);
        return res.json(docs);
    })
});
