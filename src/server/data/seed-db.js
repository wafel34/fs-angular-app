require('dotenv').config();

var users = require('./users.json'),
    contacts = require('./contacts.json'),
    MongoClient = require('mongodb').MongoClient,
    bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_CONN, (err, db)=>{
        console.log('connected to mongodb');

        const collection = db.collection(collectionName);

        collection.remove();

        initialRecords.forEach((item)=>{
            if (item.password) {
                item.password = bcrypt.hashSync(item.password, 10);
            }

            collection.insertMany(initialRecords, (err, result) => {
                console.log(`records inserted`);
                console.log('closing connection...');
                db.close();
                console.log('done');
            });
        });
    });
}


seedCollection('users', users);
seedCollection('contacts', contacts);
