require('dotenv').config();

var users = require('./users'),
    contacts = require('./contacts'),
    MongoClient = require('mongodb').MongoClient,
    bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_CONN, (err, db)=>{
        console.log('connected to mongodb');

    });
}


seedCollection();
