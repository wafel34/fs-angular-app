var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    apiRouter = require('./api-router');

    function createExpressApp(database) {
        const app = express();

        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
        app.use('/api', apiRouter(database));

        app.use('*', (req, res)=>{
            return res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        return app;
    }

    module.exports = createExpressApp;
