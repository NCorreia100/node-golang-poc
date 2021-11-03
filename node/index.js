//utils
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
// const mockUsers = require('./usersMock.json');
const request = require('request');
const bodyParser = require('body-parser')
//env vars
const PORT = process.env.PORT || 3000;
const GO_API = process.env.GO_API || 'http://localhost:2000';

//instantiate processes
const app = express();

app.use(compression()); //gzip compression
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'), { etag: true, maxAge: '5000' }));


app.get('/users', function (req, res) {
    request.get(`${GO_API}/v1/users`, (err, data) => {
        if (err) res.send(err);
        else res.send({ users: data.body });
    })
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/bundle.js'));
});

app.listen(PORT, () => {
    console.log("server listening")
});