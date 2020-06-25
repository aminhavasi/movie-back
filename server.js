const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./app/routes/index');
app.use('/', routes);
httpServer.listen(process.env.PORT, () => {
    console.log(`server is runnig on port ${process.env.PORT}`);
});
