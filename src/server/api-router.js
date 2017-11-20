var express = require('express'),
    jwt = require('jsonwebtoken'),
    bodyParse = require('body-parser'),
    bcrypt = require('bcrypt'),
    checkJwt = require('express-jwt');

function apiRouter (database) {
    const router = express.Router();

    router.use(
        checkJwt({ secret: process.env.JWT_SECRET })
        .unless({path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if (err.name == 'UnauthorizedError') {
            // user is unauthorized
            res.status(401).send({error: err.message});
        }
    });

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

    router.get('/contacts/:name', (req, res)=>{
        var contactsCollection = database.collection('contacts'),
            name = req.params.name;

            contactsCollection.findOne({name: name}, (err, result)=>{
                if (err) {
                    return res.sendStatus(500);
                }
                if (!result) {
                    return res.sendStatus(404);
                }

                return res.json(result);
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
