const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');
app.use(upload());
const corsOptions = {
    exposedHeaders: 'x-auth , x-access',
};
app.use(cors(corsOptions));
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
