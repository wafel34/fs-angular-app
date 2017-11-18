var express = require('express');

function apiRouter (database) {
    const router = express.Router();


    router.get('/contacts', (req, res)=>{
        var contactsCollection = database.collection('contacts');

        contactsCollection.find({}).toArray((err, docs)=>{
            if (err) {
                console.log(err);
                return;
            }
            return res.json(docs);
        });
    });

    router.post('/contacts', (req, res)=>{
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

    return router;
}

module.exports = apiRouter;
