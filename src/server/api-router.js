var express = require('express'),
    jwt = require('jsonwebtoken'),
    bodyParse = require('body-parser'),
    bcrypt = require('bcrypt');

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

    router.post('/authenticate', (req, res)=>{
        const user = req.body,
        usersCollection = database.collection('users');
        usersCollection.findOne(
            {username: user.username},(err, result) => {

                if (!result) {
                    return res.status(404).json({error: 'User not found'});
                }

                if (!bcrypt.compareSync(user.password, result.password)) {
                    return res.status(401).json({error: 'Invalid password'});
                }

                const payload = {
                    user: user.username,
                    admin: result.admin
                };


                const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '4h'});

                return res.json({
                    message: 'Succesfuly logged in',
                    token: token
                });
            });
    });

    return router;
}

module.exports = apiRouter;
