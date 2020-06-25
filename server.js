const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./app/routes/index');
app.use('/', routes);
httpServer.listen(process.env.PORT, () => {
    console.log(`server is runnig on port ${process.env.PORT}`);
});
