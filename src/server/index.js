var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    databaseURL = 'mongodb://localhost:27017/fs-app-database',
    path = require('path'),
    database;

require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));


MongoClient.connect(databaseURL, (err, db)=>{
    if (err) {
        console.log(err);
        return;
    }

    console.log('connected to database');

    app.listen(3000, ()=>{
        database = db;
        console.log('server listening on port 3000');
    });
});


app.get('/api/contacts', (req, res)=>{
    var contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs)=>{
        if (err) {
            console.log(err);
            return;
        }
        return res.json(docs);
    });
});

app.post('/api/contacts', (req, res)=>{
    var user = req.body,
        contactsCollection = database.collection('contacts');

        contactsCollection.insertOne(user, (err, result)=>{
            if (err) {
                return res.sendStatus(500);
            }

            var newRecord = result.ops[0];
            return res.status(201).json(newRecord);
        });
});

app.get('*', (req, res)=>{
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});
